import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { TextInput } from '~/components';
import theme from '~/core/theme';
import useDebounce from '~/hooks/useDebounce';
import { authAPI, lockerApis } from '~/utils/api';
import { ActivityIndicator } from 'react-native-paper';
import getQuerys from '~/utils/url';

// TODO: CSS for this component looks better
function LockerScreen({ navigation }) {
    const [lockers, setLockers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm);
    const [nextPageUrl, setNextPageUrl] = useState('');
    const [searchLoading, setSearchLoading] = useState(false);

    const fetchLockers = async ({ url, callback }) => {
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
        fetchLockers({
            url: `${lockerApis.lockers}?q=${debouncedSearchTerm}`,
            callback: setLockers,
        });
    }, [debouncedSearchTerm]);

    const handleLockerClick = (locker) => {
        navigation.navigate('LockerDetailScreen', { locker, lockerId: locker.id, forAdmin: true });
    };

    const renderLockerItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleLockerClick(item)}>
            <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                <Text>Mã: {item.id}</Text>
                <Text>Chủ sở hữu: {`${item.owner.resident_id} - ${item.owner.personal_information.full_name}`}</Text>
                <Text>Trạng thái: {item.status}</Text>
            </View>
        </TouchableOpacity>
    );

    const handleEndReached = () => {
        if (nextPageUrl && !loading) {
            const queries = getQuerys(nextPageUrl);
            fetchLockers({
                url: `${lockerApis.lockers}?limit=${queries.limit}&offset=${queries.offset}&q=${debouncedSearchTerm}`,
                callback: (data) => setLockers((prev) => [...prev, ...data]),
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

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <TextInput
                label="Từ khóa"
                value={searchTerm}
                onChangeText={onChangeSearch}
                loading={searchLoading}
                onClearText={onClearText}
                clearText={searchTerm && !searchLoading}
            />
            <FlatList
                data={lockers}
                renderItem={renderLockerItem}
                keyExtractor={(item) => item.id.toString()}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.1}
                ListFooterComponent={loading && <ActivityIndicator color={theme.colors.primary} />}
                ListEmptyComponent={!loading && <Text style={{ textAlign: 'center' }}>Không có tủ đồ nào</Text>}
            />
        </View>
    );
}

export default LockerScreen;
