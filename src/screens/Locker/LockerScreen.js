import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from '~/components';
import theme from '~/core/theme';
import useDebounce from '~/hooks/useDebounce';
import { authAPI, lockerApis } from '~/utils/api';
import { ActivityIndicator } from 'react-native-paper';
import getQuerys from '~/utils/url';

// TODO: CSS for this component looks better

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    text: {
        fontWeight: '500',
    },
});

export default function LockerScreen({ navigation }) {
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
        <TouchableOpacity
            style={{
                padding: 20,
                backgroundColor: '#CBAC7D',
                marginVertical: 8,
                borderWidth: 1,
                borderRadius: 8,
            }}
            onPress={() => handleLockerClick(item)}
        >
            <View>
                <View style={styles.row}>
                    <Text style={styles.text}>Mã cư dân: </Text>
                    <Text>00000{item.id}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>Chủ sở hữu: </Text>
                    <Text>{`${item.owner.resident_id} - ${item.owner.personal_information.full_name}`}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>Trạng thái: </Text>
                    <Text>{item.status}</Text>
                </View>
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
