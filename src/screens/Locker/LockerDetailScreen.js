import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { Button, TextInput } from '~/components';
import theme from '~/core/theme';
import useDebounce from '~/hooks/useDebounce';
import { authAPI, lockerApis } from '~/utils/api';
import getQuerys from '~/utils/url';
import ModalItem from './ModalItem';

const styles = StyleSheet.create({
    image: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        marginRight: 10,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    itemContainer: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    },
    itemText: {
        fontSize: 16,
        marginBottom: 5,
    },
    modalContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
    },
    button: {
        width: '45%',
        marginHorizontal: 8,
    },
});

// TODO: CSS for this component looks better
function LockerDetailScreen({ route }) {
    const { lockerId, forAdmin = true } = route.params;
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm);
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const [item, setItem] = useState({ name: '', quantity: '', status: 'NOT_RECEIVED' });
    const [editedItem, setEditedItem] = useState({ name: '', quantity: 'NOT_RECEIVED' });

    const fetchItems = async ({ url, callback }) => {
        try {
            setLoading(true);
            const response = await (await authAPI()).get(url);
            callback(response.data.results);
            setNextPageUrl(response.data.next);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setSearchLoading(false);
        }
    };

    useEffect(() => {
        fetchItems({
            url: `${lockerApis.lockerDetail(lockerId)}?q=${debouncedSearchTerm}`,
            callback: setItems,
        });
    }, [debouncedSearchTerm, lockerId]);

    const onEditItem = (_item) => {
        setEditedItem(_item);
        setIsEditModalVisible(true);
    };

    const renderItem = ({ item: _item }) => (
        <TouchableOpacity style={styles.itemContainer} onPress={() => onEditItem(_item)}>
            <Image
                style={styles.image}
                source={{ uri: _item?.image || 'https://thudaumot.binhduong.gov.vn/Portals/0/images/default.jpg' }}
            />
            <View>
                <Text style={styles.itemText}>Tên: {_item?.name}</Text>
                <Text style={styles.itemText}>Số lượng: {_item?.quantity}</Text>
                <Text style={styles.itemText}>Trạng thái: {_item?.status}</Text>
            </View>
        </TouchableOpacity>
    );

    const handleEndReached = async () => {
        if (nextPageUrl && !loading) {
            const queries = getQuerys(nextPageUrl);
            fetchItems({
                url: `${lockerApis.lockerDetail(lockerId)}?limit=${queries.limit}&offset=${queries.offset}&q=${debouncedSearchTerm}`,
                callback: (data) => setItems((prev) => [...prev, ...data]),
            });
        }
    };

    const onChangeSearch = (text) => {
        setSearchLoading(true);
        setSearchTerm(text);
    };

    const onClearText = () => {
        setSearchTerm('');
    };

    const handleAddItem = async () => {
        try {
            const { name, quantity, status } = item;
            if (!name || !quantity) {
                // TODO: popping error up right here
                return;
            }
            // TODO: add image, created date
            const response = await (
                await authAPI()
            ).post(lockerApis.itemPost(lockerId), {
                name,
                quantity,
                status,
            });
            const newItem = response.data;
            setItems([newItem, ...items]);
            setIsAddModalVisible(false);
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    const handleEditItem = async () => {
        try {
            const { name, quantity, status, id } = editedItem;
            if (!name || !quantity || !id || !status) {
                // TODO: popping error up right here
                return;
            }
            const res = await (await authAPI()).patch(lockerApis.itemEdit(lockerId, id), editedItem);
            setItems((prev) =>
                prev.map((_item) => {
                    if (_item.id === res.data.id) {
                        return {
                            ..._item,
                            ...res.data,
                        };
                    }
                    return _item;
                }),
            );
            setIsEditModalVisible(false);
        } catch (error) {
            console.error(error);
        }
    };
    // TODO: Add images for items if they don't have one, then use a default one
    return (
        <View style={styles.container}>
            <TextInput
                label="Từ khóa"
                value={searchTerm}
                onChangeText={onChangeSearch}
                loading={searchLoading}
                onClearText={onClearText}
                clearText={searchTerm && !searchLoading}
            />
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(_item) => _item.id.toString()}
                ListEmptyComponent={!loading && <Text style={{ textAlign: 'center' }}>Tủ đồ trống</Text>}
                onEndReached={handleEndReached}
                ListFooterComponent={loading && <ActivityIndicator color={theme.colors.primary} />}
            />
            {forAdmin && (
                <>
                    <Button mode="contained" onPress={() => setIsAddModalVisible(true)}>
                        Thêm món hàng
                    </Button>
                    <ModalItem
                        visible={isAddModalVisible}
                        onCancel={() => setIsAddModalVisible(false)}
                        onSubmit={handleAddItem}
                        item={item}
                        setItem={setItem}
                        submitText="Thêm"
                    />
                    <ModalItem
                        visible={isEditModalVisible}
                        onCancel={() => setIsEditModalVisible(false)}
                        onSubmit={handleEditItem}
                        item={editedItem}
                        setItem={setEditedItem}
                        submitText="Sửa"
                    />
                </>
            )}
        </View>
    );
}

export default LockerDetailScreen;
