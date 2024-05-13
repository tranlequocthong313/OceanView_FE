import Toast from 'react-native-toast-message';
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
    const [submitLoading, setSubmitLoading] = useState(false);
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

    const defaultItemImage = 'https://thudaumot.binhduong.gov.vn/Portals/0/images/default.jpg';
    const renderItem = ({ item: _item }) => (
        <TouchableOpacity style={styles.itemContainer} onPress={() => onEditItem(_item)}>
            <Image
                style={styles.image}
                source={{ uri: _item?.image || defaultItemImage }}
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
            setSubmitLoading(true)
            const { name, quantity, status, image } = item;
            if (!name || !quantity) {
                // TODO: popping error up right here
                return;
            }
            const formData = new FormData();
            if (image) {
                formData.append('image', {
                    uri: image.uri,
                    name: image.filename ?? `image.${image.mimeType.split('/')[1]}`,
                    type: image.mimeType,
                });
            }
            formData.append('name', name);
            formData.append('quantity', quantity);
            formData.append('status', status);

            const response = await (
                await authAPI()
            ).post(lockerApis.itemPost(lockerId), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            const newItem = response.data;
            setItems([newItem, ...items]);
            setIsAddModalVisible(false);
            Toast.show({
                type: 'success',
                text1: 'Thêm món hàng thành công'
            });
        } catch (error) {
            console.error('Error adding item:', error);
            Toast.show({
                type: 'error',
                text1: 'Thêm món hàng thất bại'
            });
        } finally {
            setSubmitLoading(false)
        }
    };

    const handleEditItem = async () => {
        try {
            setSubmitLoading(true)
            const { name, quantity, status, image, id } = editedItem;
            if (!name || !quantity || !status || !id) {
                // TODO: popping error up right here
                return;
            }
            const formData = new FormData();
            if (image) {
                formData.append('image', {
                    uri: image.uri,
                    name: image.filename ?? `image.${image.mimeType.split('/')[1]}`,
                    type: image.mimeType,
                });
            }
            formData.append('name', name);
            formData.append('quantity', quantity);
            formData.append('status', status);
            const res = await (await authAPI()).patch(lockerApis.itemEdit(lockerId, id), formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
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
            Toast.show({
                type: 'success',
                text1: 'Chỉnh sửa món hàng thành công'
            });
        } catch (error) {
            console.error(error);
            Toast.show({
                type: 'error',
                text1: 'Chỉnh sửa món hàng thất bại'
            });
        } finally {
            setSubmitLoading(false)
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
                        loading={submitLoading}
                    />
                    <ModalItem
                        visible={isEditModalVisible}
                        onCancel={() => setIsEditModalVisible(false)}
                        onSubmit={handleEditItem}
                        item={editedItem}
                        setItem={setEditedItem}
                        submitText="Sửa"
                        loading={submitLoading}
                    />
                </>
            )}
        </View>
    );
}

export default LockerDetailScreen;
