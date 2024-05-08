import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 12,
        padding: 18,
        backgroundColor: '#EFC787',
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 4,
    },
    row: {
        flexDirection: 'row',
    },
});

export default function Invoice({ month, year, amount, actived, onPress }) {
    return (
        <TouchableOpacity style={styles.listItem} onPress={onPress}>
            <Text>
                Hoá đơn tháng {month}/{year}
            </Text>
            <View style={styles.row}>
                <Text style={{ marginRight: 2 }}>{amount}đ</Text>
                {!actived ? (
                    <AntDesign name="caretright" size={18} color="black" />
                ) : (
                    <AntDesign name="caretdown" size={18} color="black" />
                )}
            </View>
        </TouchableOpacity>
    );
}
