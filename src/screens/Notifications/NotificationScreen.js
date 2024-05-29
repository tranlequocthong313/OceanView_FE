import { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import theme from '~/core/theme';
import { authAPI, notificationApis } from '~/utils/api';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
        marginVertical: 4,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        resizeMode: 'contain',
        margin: 8,
    },
    contentWrapper: {
        flex: 1,
        margin: 8,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    desc: {
        fontSize: 14,
        flexWrap: 'wrap',
    },
});
export default function NotificationScreen({navigation}) {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const [url, setUrl] = useState(notificationApis.notifications);

    const SCREEN_MAPPINGS = {
        "INVOICE_CREATE": "DetailsInvoice",
        "SERVICE_APPROVED": "ListCard",
        "SERVICE_REJECTED": "ListCard",
        "REISSUE_APPROVED": "ListCard",
        "REISSUE_REJECTED": "ListCard",
        "LOCKER_ITEM_ADD": "LockerDetailScreen",
        // "NEWS_POST": "invoice", # TODO: Implement for news
    }

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                setLoading(true);
                const res = await (await authAPI()).get(url);
                setNotifications((prev) => [...prev, ...res.data.results]);
                setNextPageUrl(res.data.next);
            } catch (error) {
                console.error(error);
                Toast.show({
                    type: 'success',
                    text1: 'Lấy thông báo thất bại',
                });
            } finally {
                setLoading(false);
            }
        };
        fetchNotifications();
    }, [url]);

    const onPressNotificationItem = (item) => {
        navigation.navigate(SCREEN_MAPPINGS[item?.content?.entity_type], { id: item?.content?.entity_id });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity key={item.id} style={styles.container} onPress={() => onPressNotificationItem(item)}>
            <Image style={styles.image} source={{ uri: item?.content?.image }} />
            <View style={styles.contentWrapper}>
                <Text style={styles.title}>{item?.message}</Text>
                <Text style={styles.desc} numberOfLines={2} ellipsizeMode="tail">
                    {item?.created_date}
                </Text>
            </View>
        </TouchableOpacity>
    );

    const handleEndReached = async () => {
        if (nextPageUrl && !loading) {
            setUrl(nextPageUrl);
        }
    };

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <FlatList
                data={notifications}
                renderItem={renderItem}
                keyExtractor={(_item) => _item.id.toString()}
                ListEmptyComponent={!loading && <Text style={{ textAlign: 'center' }}>Không có thông báo nào</Text>}
                onEndReached={handleEndReached}
                ListFooterComponent={loading && <ActivityIndicator color={theme.colors.primary} />}
            />
        </View>
    );
}
