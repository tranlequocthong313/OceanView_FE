import { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    utilityWrap: {
        alignItems: 'center',
        paddingHorizontal: 12,
        marginBottom: 8,
    },
    utilityIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#EEEDEC',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
        borderWidth: 1,
        borderColor: '#000',
    },
    utilityText: {
        fontSize: 13,
    },
});

function UtilityButton({ navigation, icon, tittle, destination }) {
    console.log('UtilityButton render')
    return (
        <View style={styles.utilityWrap}>
            <TouchableOpacity onPress={() => navigation.navigate(destination)}>
                <View style={styles.utilityIcon}>{icon}</View>
            </TouchableOpacity>
            <Text style={styles.utilityText}>{tittle}</Text>
        </View>
    );
}

export default memo(UtilityButton)
