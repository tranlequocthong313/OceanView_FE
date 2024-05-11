import { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '~/core/theme';

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 12,
        paddingVertical: 14,
        paddingHorizontal: 10,
        backgroundColor: theme.colors.light,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        borderRadius: 4,
        borderStyle: 'dotted',
    },
    row: {
        flexDirection: 'row',
    },
});

function DetailsInvoice({ month, year, amount }) {
    console.log("DetailsInvoice render")
    return (
        <View style={styles.listItem}>
            <Text>
                Hoá đơn tháng {month}/{year}
            </Text>
            <View style={styles.row}>
                <Text style={{ marginRight: 2 }}>{amount}đ</Text>
            </View>
        </View>
    );
}

export default memo(DetailsInvoice)
