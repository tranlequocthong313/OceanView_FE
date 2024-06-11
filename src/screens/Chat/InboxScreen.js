import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Avatar, Text } from 'react-native-paper';
import { TextInput } from '~/components';
import theme from '~/core/theme';
import useDebounce from '~/hooks/useDebounce';
import { authAPI, chatApis, userApis } from '~/utils/api';
import getQuerys from '~/utils/url';
import firestore from '@react-native-firebase/firestore';
import { useUser } from '~/hooks/useUser';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    searchBar: {
        marginBottom: 16,
    },
    inboxItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    avatarContainer: {
        position: 'relative',
    },
    statusIndicator: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 12,
        height: 12,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#fff',
    },
    offline: {
        backgroundColor: 'gray',
    },
    inboxDetails: {
        marginLeft: 16,
    },
    inboxName: {
        fontWeight: 'bold',
    },
    inboxLastMessage: {
        color: 'gray',
    },
});

export default function InboxScreen({ navigation }) {
    const user = useUser();
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery);
    const [users, setUsers] = useState([]);
    const [nextUserUrl, setNextUserUrl] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [inboxes, setInboxes] = useState([]);
    const [inboxUrl, setInboxUrl] = useState(chatApis.inboxes);
    const [isNextInbox, setIsNextInbox] = useState(false);
    const [nextInboxUrl, setNextInboxUrl] = useState(null);
    const [inboxLimit, setInboxLimit] = useState(10);
    const [inboxOffset, setInboxOffset] = useState(0);

    const DEFAULT_AVATAR = 'https://res.cloudinary.com/diojasks1/image/upload/v1716957585/meixxgjdbq6igiasccyx.jpg';

    useEffect(() => {
        const fetchInboxes = async () => {
            try {
                setLoading(true);
                const { data } = await (await authAPI()).get(inboxUrl);
                if (isNextInbox) {
                    setInboxes((prev) => [...prev, ...data.results]);
                } else {
                    setInboxes(data.results);
                }
                if (data.next) {
                    const { limit, offset } = getQuerys(data.next);
                    if (limit && offset) {
                        setInboxLimit(Number(limit));
                        setInboxOffset(Number(offset));
                    }
                }
                setNextInboxUrl(data.next);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchInboxes();
    }, [isNextInbox, inboxUrl]);

    useEffect(() => {
        const onError = (error) => {
            console.error(error);
        };
        const subscriber = firestore()
            .collection('inboxes')
            .where(
                firestore.Filter.or(
                    firestore.Filter('user_1_id', '==', user.resident_id),
                    firestore.Filter('user_2_id', '==', user.resident_id),
                ),
            )
            .onSnapshot((snap) => {
                let count = 0;
                const newInboxes = snap.docChanges().map((documentSnapshot) => {
                    if (documentSnapshot.type === 'added') {
                        count += 1;
                    } else if (documentSnapshot.type === 'removed') {
                        count -= 1;
                    }
                    const data = documentSnapshot.doc.data();
                    return {
                        id: data.id,
                        last_message: data.last_message,
                        user: user.resident_id === data.user_1.resident_id ? data.user_2 : data.user_1,
                    };
                });
                setInboxes((prevInboxes) => {
                    const oldLength = prevInboxes.length;
                    const updatedInboxes = [...newInboxes, ...prevInboxes];
                    const final = Array.from(new Set(updatedInboxes.map((a) => a.id))).map((id) =>
                        updatedInboxes.find((a) => a.id === id),
                    );
                    if (oldLength < final.length) {
                        setInboxOffset((prev) => prev + count);
                    } else if (oldLength > final.length) {
                        setInboxOffset((prev) => prev - count);
                    }
                    return final;
                });
            }, onError);
        return () => {
            subscriber();
        };
    }, [user.resident_id]);

    const fetchUsers = async ({ url, callback }) => {
        try {
            const { data } = await (await authAPI()).get(url);
            callback(data.results);
            setNextUserUrl(data.next);
        } catch (error) {
            console.error(error);
        } finally {
            setSearchLoading(false);
        }
    };

    useEffect(() => {
        if (isSearching) {
            fetchUsers({
                url: `${userApis.users}?q=${debouncedSearchQuery}`,
                callback: setUsers,
            });
        }
    }, [debouncedSearchQuery, isSearching]);

    const onSearchChange = async (query) => {
        setSearchQuery(query);
        setSearchLoading(true);
    };

    const onClearText = () => {
        setSearchQuery('');
        setUsers([]);
        setIsSearching(false);
    };

    const loadMoreInboxes = () => {
        if (nextInboxUrl && !loading) {
            setIsNextInbox(true);
            setInboxUrl(`${chatApis.inboxes}?limit=${inboxLimit}&offset=${inboxOffset}`);
        }
    };

    const loadMoreUsers = () => {
        if (nextUserUrl && !loading) {
            const queries = getQuerys(nextUserUrl);
            fetchUsers({
                url: `${userApis.users}?limit=${queries.limit}&offset=${queries.offset}&q=${debouncedSearchQuery}`,
                callback: (data) => setUsers((prev) => [...prev, ...data]),
            });
        }
    };

    const onPressInbox = (item) => {
        navigation.navigate('Chat', { id: item?.id });
    };

    const onPressUser = async (item) => {
        try {
            const { data } = await (
                await authAPI()
            ).post(chatApis.createInbox, {
                user_1: user.resident_id,
                user_2: item.resident_id,
            });
            navigation.navigate('Chat', { id: data.id });
        } catch (error) {
            console.error(error);
        }
    };

    const renderInboxItem = ({ item }) => (
        <TouchableOpacity style={styles.inboxItem} onPress={() => onPressInbox(item)}>
            <View style={styles.avatarContainer}>
                <Avatar.Image size={48} source={{ uri: item.user.avatar || DEFAULT_AVATAR }} />
            </View>
            <View style={styles.inboxDetails}>
                <Text style={styles.inboxName}>{item.user.full_name}</Text>
                <Text style={styles.inboxLastMessage} numberOfLines={1} ellipsizeMode="tail">
                    {item.last_message}
                </Text>
            </View>
        </TouchableOpacity>
    );

    const renderUserItem = ({ item }) => (
        <TouchableOpacity style={styles.inboxItem} onPress={() => onPressUser(item)}>
            <View style={styles.avatarContainer}>
                <Avatar.Image size={48} source={{ uri: item.avatar || DEFAULT_AVATAR }} />
            </View>
            <View style={styles.inboxDetails}>
                <Text style={styles.inboxName}>{item.personal_information.full_name}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TextInput
                label="Từ khóa"
                value={searchQuery}
                onChangeText={onSearchChange}
                loading={searchLoading}
                onClearText={onClearText}
                clearText={isSearching && !searchLoading}
                onPress={() => setIsSearching(true)}
            />
            {isSearching ? (
                <FlatList
                    data={users}
                    renderItem={renderUserItem}
                    keyExtractor={(item) => item.resident_id.toString()}
                    onEndReached={loadMoreUsers}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={
                        searchLoading ? <ActivityIndicator color={theme.colors.primary} animating /> : null
                    }
                    ListEmptyComponent={
                        !loading && <Text style={{ textAlign: 'center' }}>Không có người dùng nào</Text>
                    }
                />
            ) : (
                <FlatList
                    data={inboxes}
                    renderItem={renderInboxItem}
                    keyExtractor={(item) => item.id.toString()}
                    onEndReached={loadMoreInboxes}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={loading ? <ActivityIndicator color={theme.colors.primary} animating /> : null}
                    ListEmptyComponent={
                        !loading && <Text style={{ textAlign: 'center' }}>Không có hộp thư đến nào</Text>
                    }
                />
            )}
        </View>
    );
}
