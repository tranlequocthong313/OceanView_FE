import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
    viewWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        borderStyle: 'solid',
    },
    wrapWithIcon: {
        flexDirection: 'row',
    },
    title: {
        fontSize: 16,
        fontWeight: '400',
        marginLeft: 8,
        alignContent: 'center',
    },
});

function StackView({ navigation, icon, title, destination }) {
    console.log('StackView render');
    return (
        <TouchableOpacity onPress={() => navigation.navigate(destination)}>
            <View style={styles.viewWrapper}>
                <View style={styles.wrapWithIcon}>
                    {icon}
                    <Text style={styles.title}>{title}</Text>
                </View>
                <MaterialIcons name="navigate-next" size={24} color="black" />
            </View>
        </TouchableOpacity>
    );
}

export default StackView;
