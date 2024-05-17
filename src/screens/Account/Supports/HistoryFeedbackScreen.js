import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    RefreshControl,
    Alert,
    ToastAndroid,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { authAPI, feedbackApis } from '~/utils/api';
import { Button } from 'react-native-paper';
import theme from '~/core/theme';

const styles = StyleSheet.create({
    container: {
        margin: 12,
    },
    wrapper: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 4,
        marginTop: 12,
        marginVertical: 4,
        borderRadius: 4,
        backgroundColor: '#D9C657',
    },
    contentWrapper: {
        marginVertical: 6,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
    },
    desc: {
        fontSize: 14,
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    actionWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 2,
        padding: 4,
    },
    actionDel: {
        marginHorizontal: 4,
        fontWeight: '500',
        fontSize: 16,
        color: 'red',
    },
    actionEdit: {
        marginHorizontal: 4,
        fontWeight: '500',
        fontSize: 16,
        color: 'blue',
    },
    currentPageButton: {
        backgroundColor: theme.colors.outline, // Màu nổi bật cho trang hiện tại
        margin: 4,
    },
    pageButton: {
        margin: 4,
    },
});

export default function HistoryReflectionScreen({ navigation }) {
    const [reflectionData, setReflectionData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const LIMIT = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);

    const fetchReflectionData = useCallback(async () => {
        try {
            const response = await (
                await authAPI()
            ).get(feedbackApis.feedbacks, {
                params: {
                    offset,
                    limit: LIMIT,
                },
            });
            setIsLoading(false);
            setReflectionData(response.data);
        } catch (error) {
            console.log(error);
        }
    }, [offset]);

    useEffect(() => {
        setIsLoading(true);
        fetchReflectionData();
    }, [fetchReflectionData]);

    const onRefresh = () => {
        setRefreshing(true);
        fetchReflectionData();
        setRefreshing(false);
    };

    const getTotalPages = () => {
        if (!reflectionData || !reflectionData.count) return 1;
        return Math.ceil(reflectionData.count / LIMIT);
    };

    const totalPages = getTotalPages();
    const maxPageButtons = Math.min(totalPages, 5);
    const pageNumbers = Array.from({ length: maxPageButtons }, (_, index) => index + 1);

    console.log(totalPages);
    console.log(pageNumbers);
    console.log(maxPageButtons);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        const newOffset = (pageNumber - 1) * LIMIT;
        setOffset(newOffset);
    };
    const navigateToEdit = (id) => {
        navigation.navigate('EditFeedback', { id });
    };

    const handleEdit = (id) => {
        navigateToEdit(id);
    };

    const handleDelete = (id, title) => {
        Alert.alert(
            'Xác nhận xóa',
            `Bạn có muốn xóa phản ánh có tiêu đề "${title}" không?`,
            [
                {
                    text: 'Hủy',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Đồng ý',
                    onPress: async () => {
                        try {
                            // Gửi yêu cầu xóa phản ánh với id tương ứng
                            await (await authAPI()).delete(`${feedbackApis.feedbackDel}${id}/`);
                            ToastAndroid.showWithGravity(
                                'Đã xoá phản ánh thành công',
                                ToastAndroid.LONG,
                                ToastAndroid.CENTER,
                            );
                            // Refresh lại dữ liệu sau khi xóa
                            fetchReflectionData();
                        } catch (error) {
                            console.log('Error deleting reflection:', error);
                        }
                    },
                },
            ],
            { cancelable: false },
        );
    };

    return (
        <ScrollView
            style={styles.container}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            <Button
                mode="contained"
                onPress={() => {
                    navigation.navigate('CreateFeedback');
                }}
            >
                Tạo phản ánh mới
            </Button>

            <Text style={{ fontSize: 16, marginTop: 18 }}>Danh sách phản ánh</Text>

            {isLoading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#000" />
                </View>
            ) : (
                <ScrollView>
                    {reflectionData !== null ? (
                        reflectionData.results.map((item) => (
                            <TouchableOpacity key={item.id} style={styles.wrapper}>
                                <View style={styles.contentWrapper}>
                                    <Text style={styles.title}>{item.title} </Text>
                                    <Text style={styles.desc} numberOfLines={1} ellipsizeMode="tail">
                                        {item.content}
                                    </Text>
                                    <Text>Ngày tạo: {new Date(item.created_date).toLocaleString()}</Text>
                                    <Text>Lần cuối cập nhật: {new Date(item.updated_date).toLocaleString()}</Text>
                                </View>
                                <View style={styles.actionContainer}>
                                    <Text>
                                        Type: <Text style={styles.title}>{item.type}</Text>
                                    </Text>

                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                console.log('Edit button pressed');
                                                handleEdit(item.id);
                                            }}
                                        >
                                            <View style={styles.actionWrapper}>
                                                <AntDesign name="edit" size={20} color="black" />
                                                <Text style={styles.actionEdit}>Chỉnh sửa</Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => handleDelete(item.id, item.title)}>
                                            <View style={styles.actionWrapper}>
                                                <AntDesign name="delete" size={20} color="black" />
                                                <Text style={styles.actionDel}>Xoá</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                            <Text>Không có phản ánh nào.</Text>
                        </View>
                    )}
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                        {pageNumbers.map((pageNumber) => (
                            <Button
                                key={pageNumber}
                                onPress={() => handlePageChange(pageNumber)}
                                style={currentPage === pageNumber ? styles.currentPageButton : styles.pageButton}
                                mode="contained"
                            >
                                {pageNumber}
                            </Button>
                        ))}
                    </View>
                </ScrollView>
            )}
        </ScrollView>
    );
}
