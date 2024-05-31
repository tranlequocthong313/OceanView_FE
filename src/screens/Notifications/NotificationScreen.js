import { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import theme from '~/core/theme';
import { useNotification, useNotificationAPI, useNotificationDispatch } from '~/hooks/useNotification';
import { NOTIFICATION_ACTION_TYPE } from '~/reducers/notificationReducer';
import { authAPI, notificationApis } from '~/utils/api';
import getQuerys from '~/utils/url';

// TODO: This looks terrible pls upgrade it
const styles = StyleSheet.create({
    not_read_container: {
        backgroundColor: theme.colors.primary,
        opacity: 0.9,
    },
    not_read_text: {
        color: 'white',
    },
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
export default function NotificationScreen({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const [url, setUrl] = useState(notificationApis.notifications);
    const [isNext, setIsNext] = useState(false);

    const notificationDispatch = useNotificationDispatch();
    const { data: notifications, limit, offset } = useNotification();
    const apis = useNotificationAPI();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                setLoading(true);
                const res = await (await authAPI()).get(url);
                const { limit: _limit, offset: _offset } = getQuerys(res.data.next);
                notificationDispatch({
                    type: isNext ? NOTIFICATION_ACTION_TYPE.INFINITE_SCROLL : NOTIFICATION_ACTION_TYPE.LOAD,
                    payload: {
                        badge: res.data.badge,
                        data: res.data.results,
                        limit: Number(_limit),
                        offset: Number(_offset),
                    },
                });
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
    }, [notificationDispatch, url, isNext]);

    // TODO: Fix bug stack navigations not ready to navigate
    const onPressNotificationItem = async (item) => {
        await apis.readNotification({ navigation, notification: item });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            key={item.id}
            style={[styles.container, !item.has_been_read && styles.not_read_container]}
            onPress={() => onPressNotificationItem(item)}
        >
            <Image style={styles.image} source={{ uri: item?.content?.image }} />
            <View style={styles.contentWrapper}>
                <Text style={[styles.title, !item.has_been_read && styles.not_read_text]}>{item?.message}</Text>
                <Text
                    style={[styles.desc, !item.has_been_read && styles.not_read_text]}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                >
                    {item?.created_date}
                </Text>
            </View>
        </TouchableOpacity>
    );

    const handleEndReached = async () => {
        if (nextPageUrl && !loading) {
            setIsNext(true);
            console.log(`LIMIT::::${limit}::::OFFSET::::${offset}`);
            setUrl(`${notificationApis.notifications}?limit=${String(limit)}&offset=${String(offset)}`);
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
