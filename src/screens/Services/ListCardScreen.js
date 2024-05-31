import { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl,
    Alert,
    ActivityIndicator,
    TouchableOpacity,
    ToastAndroid,
} from 'react-native';
import theme from '~/core/theme';
import { authAPI, serviceApis } from '~/utils/api';

const styles = StyleSheet.create({
    container: {
        margin: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
    },
    wrapper: {
        width: '100%',
    },
    contentWrapper: {
        marginVertical: 8,
    },
    heading: {
        alignItems: 'flex-end',
        width: '100%',
        backgroundColor: '#D9C657',
        padding: 8,
        borderWidth: 2,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    name: {
        fontSize: 26,
    },
    content: {
        alignItems: 'flex-end',
        width: '100%',
        height: 110,
        padding: 8,
        backgroundColor: theme.colors.primary,
    },
    id: {
        color: '#D9C657',
        marginVertical: 8,
        fontSize: 16,
    },
    statusWrap: {
        flex: 1,
        marginVertical: 8,
        justifyContent: 'flex-end',
    },
    status: {
        color: '#D9C657',
    },
    footer: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 4,
        paddingVertical: 2,
    },
    emptyMessage: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
});

export default function ListCardScreen({ navigation, route }) {
    const { title, type, _status, action } = route.params || {};
    console.log(route.params);

    useEffect(() => {
        if (title) {
            navigation.setOptions({ title });
        }
    }, [title, navigation]);

    const [listCardData, setListCardData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchListCardData = useCallback(async () => {
        try {
            const apiUrl = `${serviceApis.listCard}?category=${type?.toLowerCase()}`;
            const response = await (await authAPI()).get(_status ? `${apiUrl}&_status=${_status}` : apiUrl);
            console.log(response.data);
            setListCardData(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, [type, _status]);

    useEffect(() => {
        fetchListCardData();
    }, [fetchListCardData]);

    const onRefresh = () => {
        setRefreshing(true);
        fetchListCardData().finally(() => setRefreshing(false));
    };

    const handleDelete = async (id) => {
        try {
            await (await authAPI()).delete(`${serviceApis.deleteCard}${id}/`);
            ToastAndroid.showWithGravity('Xoá thẻ thành công', ToastAndroid.LONG, ToastAndroid.CENTER);
            fetchListCardData(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting card:', error);
            Alert.alert('Error', 'Không thể xoá thẻ. Vui lòng thử lại.');
        }
    };

    const handleReissue = async (id) => {
        try {
            await (await authAPI()).post(`${serviceApis.reissueCard}${id}/reissue/`);
            ToastAndroid.showWithGravity('Yêu cầu cấp lại thẻ thành công', ToastAndroid.LONG, ToastAndroid.CENTER);
            fetchListCardData(); // Refresh the list after reissue
        } catch (error) {
            console.error('Error reissuing card:', error);
            Alert.alert('Error', 'Không thể cấp lại thẻ. Vui lòng thử lại.');
        }
    };

    const handleClick = (id) => {
        console.log(`${serviceApis.reissueCard}${id}/reissue/`);
        const alertTitle = action === 'delete' ? 'Xoá thẻ' : 'Cấp lại thẻ';
        const alertMessage = action === 'delete'
            ? `Bạn có chắc chắn muốn huỷ thẻ có id là 00000${id} không?`
            : `Bạn có chắc chắn muốn cấp lại thẻ có id là 00000${id} không?`;
        const onPressAction = action === 'delete' ? () => handleDelete(id) : () => handleReissue(id);

        Alert.alert(alertTitle, alertMessage, [
            { text: 'Không', style: 'cancel' },
            { text: 'Có', onPress: onPressAction },
        ], { cancelable: true });
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Danh sách các thẻ</Text>
            {isLoading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#000" />
                </View>
            ) : (
                <ScrollView
                    style={styles.wrapper}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                    {listCardData?.results?.length > 0 ? (
                        listCardData.results.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.contentWrapper}
                                onPress={() => handleClick(item.id)}
                            >
                                <View style={styles.heading}>
                                    <Text style={styles.name}>{item.service.name}</Text>
                                    <Text>{item.service.id}</Text>
                                </View>
                                <View style={styles.content}>
                                    <Text style={styles.id}>00000{item.id}</Text>
                                    <View style={styles.statusWrap}>
                                        <Text style={styles.status}>Trạng thái: {item.status}</Text>
                                    </View>
                                </View>
                                <View style={styles.footer}>
                                    <Text>OceanView</Text>
                                    <Text>{new Date(item.created_date).toLocaleString()}</Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View style={styles.emptyMessage}>
                            <Text>Bạn chưa đăng ký thẻ nào.</Text>
                        </View>
                    )}
                </ScrollView>
            )}
        </ScrollView>
    );
}
