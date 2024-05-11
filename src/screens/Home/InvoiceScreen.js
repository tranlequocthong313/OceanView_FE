import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import theme from '~/core/theme';
import DropDownPicker from 'react-native-dropdown-picker';
import { Invoice, DetailsInvoice, Button } from '~/components';

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
    wrapContent: {
        margin: 8,
    },
    headingContent: {
        marginVertical: 8,
    },
    invoiceWrap: {
        margin: 10,
        marginBottom: 150,
    },
    payment: {
        backgroundColor: theme.colors.primary,
    },
});

export default function InvoiceScreen() {
    const [activedInvoice, setActivedInvoice] = useState(true);
    const [activedUnInvoice, setActivedUnInvoice] = useState(false);

    const [activedInvoices, setActivedInvoices] = useState({});

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'A.101', value: 'A.101' },
        { label: 'A.102', value: 'A.102' },
        { label: 'A.302', value: 'B.302' },
    ]);

    const [invoices, setInvoices] = useState([]);
    const [detailInvoices, setDetailInvoices] = useState([]);

    const handleInvoiceChange = () => {
        setActivedInvoice(true);
        setActivedUnInvoice(false);
        console.log('handleInvoiceChange');
    };

    const handleUnInvoiceChange = () => {
        setActivedUnInvoice(true);
        setActivedInvoice(false);
        console.log('handleUnInvoiceChange');
    };

    const generateSampleData = () => {
        const data = [];
        for (let i = 1; i <= 3; i += 1) {
            const amount = Math.floor(Math.random() * 10000000);

            const formattedAmount = amount.toLocaleString();
            const invoice = {
                id: i,
                amount: formattedAmount, // Số tiền ngẫu nhiên từ 0 đến 1.000.000
                createdAt: new Date(2024, i - 1, Math.floor(Math.random() * 28) + 1), // Ngày tạo ngẫu nhiên trong tháng
            };
            data.push(invoice);
        }
        return data;
    };

    useEffect(() => {
        // Gọi hàm tạo dữ liệu mẫu và gán vào state invoices

        const sampleData = generateSampleData();
        setInvoices(sampleData);

        const sampleDetailsData = generateSampleData();
        setDetailInvoices(sampleDetailsData);

        // Set giá trị mặc định cho DropDownPicker là giá trị đầu tiên của mảng items
        if (items.length > 0) {
            setValue(items[0].value);
        }
    }, [items]);

    const selectedYear = 2024;

    const handlePress = (itemId) => {
        setActivedInvoices((prevState) => ({
            ...prevState,
            [itemId]: !prevState[itemId],
        }));
    }

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.headerNav}>
                    <TouchableOpacity
                        style={activedInvoice ? styles.wrapNavActived : styles.wrapNav}
                        onPress={handleInvoiceChange}
                    >
                        <Text style={activedInvoice ? styles.titleNavActived : styles.titleNav}>Chưa thanh toán</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={activedUnInvoice ? styles.wrapNavActived : styles.wrapNav}
                        onPress={handleUnInvoiceChange}
                    >
                        <Text style={activedUnInvoice ? styles.titleNavActived : styles.titleNav}>Đã thanh toán</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.wrapContent}>
                    <Text style={styles.headingContent}>Căn hộ được thanh toán</Text>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                    />
                </View>

                <ScrollView style={styles.invoiceWrap}>
                    <View>
                        <FlatList
                            data={invoices}
                            renderItem={({ item }) => (
                                <View>
                                    <Invoice
                                        month={item.id}
                                        year={selectedYear}
                                        amount={item.amount}
                                        actived={activedInvoices[item.id]}
                                        onPress={() => handlePress(item.id)}
                                        icon
                                    />
                                    {activedInvoices[item.id] ? (
                                        detailInvoices.map((di) => (
                                            <DetailsInvoice month={di.id} year={selectedYear} amount={di.amount} />
                                        ))
                                    ) : (
                                        <View />
                                    )}
                                </View>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                            scrollEnabled={false}
                        />
                    </View>
                    {activedInvoice ? (
                        <Button mode="contained" onPress={() => console.log('Thanh toan ')}>
                            Thanh toán
                        </Button>
                    ) : (
                        <View />
                    )}
                </ScrollView>
            </View>
        </View>
    );
}
