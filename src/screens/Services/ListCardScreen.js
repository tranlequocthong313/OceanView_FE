import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, ActivityIndicator, TouchableOpacity } from 'react-native';
import theme from '~/core/theme';
import { authAPI, serviceApis } from '~/utils/api';

const styles = StyleSheet.create({
    container: {
        margin: 12,
    },
    tittle: {
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
});

export default function ListCardScreen() {
    const [listCardData, setListCardData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [refreshing, setRefreshing] = useState(false);

    const fetchListCardData = async () => {
        try {
            const response = await (await authAPI()).get(serviceApis.listCard);
            setIsLoading(false);
            setListCardData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchListCardData();
    }, []);
    const onRefresh = () => {
        setRefreshing(true);
        fetchListCardData();
        setRefreshing(false);
    };

    console.log(listCardData);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.tittle}>Danh sách các thẻ</Text>
            {isLoading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#000" />
                </View>
            ) : (
                <ScrollView
                    style={styles.wrapper}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                    {listCardData !== null ? (
                        listCardData.results.map((item) => (
                            <TouchableOpacity key={item.id} style={styles.contentWrapper}>
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
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                            <Text>Bạn chưa đăng ký thẻ nào.</Text>
                        </View>
                    )}
                </ScrollView>
            )}
        </ScrollView>
    );
}
