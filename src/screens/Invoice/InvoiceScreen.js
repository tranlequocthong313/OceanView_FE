import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
    RefreshControl,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { authAPI, invoiceApis } from '~/utils/api';
import theme from '~/core/theme';
import { Invoice } from '~/components';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    headerNav: {
        flexDirection: 'row',
        paddingTop: 8,
        backgroundColor: theme.colors.surface,
        zIndex: 1,
    },
    wrapNav: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 4,
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        flex: 1,
        paddingVertical: 8,
    },
    wrapNavActived: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        paddingVertical: 8,
        backgroundColor: theme.colors.primary,
        borderBottomWidth: 2,
        borderBottomColor: 'yellow',
    },
    titleNav: {
        fontSize: 16,
    },
    titleNavActived: {
        color: '#fff',
        fontSize: 16,
    },
    invoiceWrap: {
        marginTop: 28,
        marginHorizontal: 12,
    },
    wrapGuild: {
        marginTop: 100,
        marginTop: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    guild: {
        backgroundColor: theme.colors.surface,
        padding: 16,
        borderWidth: 1,
        borderRadius: 14,
        borderColor: '#ccc',
        fontSize: 16,
        color: 'red',
        fontWeight: '500',
    },
});

export default function InvoiceScreen({ navigation }) {
    const [activedInvoice, setActivedInvoice] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [invoices, setInvoices] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const handleInvoiceChange = () => {
        setActivedInvoice(true);
        console.log('handleInvoiceChange');
    };

    const handleUnInvoiceChange = () => {
        setActivedInvoice(false);
        console.log('handleUnInvoiceChange');
    };

    const fetchInvoiceData = async () => {
        try {
            const response = await (await authAPI()).get(invoiceApis.invoice);
            setIsLoading(false);
            setInvoices(response.data['2024']);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchInvoiceData();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchInvoiceData();
        setRefreshing(false);
    };

    const filteredInvoices = invoices
        ? invoices.filter((invoice) => (activedInvoice ? invoice.status !== 'PAID' : invoice.status === 'PAID'))
        : [];

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.wrapper}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View style={styles.headerNav}>
                    <TouchableOpacity
                        style={activedInvoice ? styles.wrapNavActived : styles.wrapNav}
                        onPress={handleInvoiceChange}
                    >
                        <Text style={activedInvoice ? styles.titleNavActived : styles.titleNav}>Chưa thanh toán</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={!activedInvoice ? styles.wrapNavActived : styles.wrapNav}
                        onPress={handleUnInvoiceChange}
                    >
                        <Text style={!activedInvoice ? styles.titleNavActived : styles.titleNav}>Đã thanh toán</Text>
                    </TouchableOpacity>
                </View>

                {isLoading ? (
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
                        <ActivityIndicator size="large" color="#000" />
                    </View>
                ) : (
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
                        {filteredInvoices.length === 0 ? (
                            <View style={styles.wrapGuild}>
                                <Text style={styles.guild}>
                                    {activedInvoice
                                        ? 'Bấm chọn hoá đơn để thanh toán'
                                        : 'Chưa có hoá đơn đã thanh toán'}
                                </Text>
                            </View>
                        ) : (
                            <FlatList
                                data={filteredInvoices}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('DetailsInvoice', { id: item.id })}
                                    >
                                        <Invoice status={item.status} id={item.id} amount={item.total_amount} icon />
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item) => item.id.toString()}
                                scrollEnabled={false}
                                style={{ margin: 8 }}
                            />
                        )}
                    </View>
                )}
            </ScrollView>
        </View>
    );
}
