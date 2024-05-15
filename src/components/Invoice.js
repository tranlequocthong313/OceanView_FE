import { View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const styles = StyleSheet.create({
    listItem: {
        padding: 18,
        backgroundColor: '#EFC787',
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 4,
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
    },
    wrapContent: {
        marginVertical: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    pending: {
        color: '#D3552F',
        fontWeight: '500',
    },
    paid: {
        color: 'green',
        fontWeight: '500',
    },
});

function Invoice({ id, amount, status, name }) {
    return (
        <View style={styles.listItem}>
            <View style={styles.wrapContent}>
                <Text style={styles.text}>{name || 'Hoá đơn dịch vụ'}</Text>
                <View style={styles.row}>
                    <Text style={{ marginRight: 2 }}>{amount}đ</Text>
                    {id? <AntDesign name="caretright" size={16} color="black" /> : ""}
                </View>
            </View>
            <View style={styles.wrapContent}>
                <Text>{id}</Text>
                {status !== 'PENDING' ? (
                    <Text style={styles.paid}>Đã thanh toán</Text>
                ) : (
                    <Text style={styles.pending}>Đang chờ</Text>
                )}
            </View>
        </View>
    );
}

export default Invoice;
