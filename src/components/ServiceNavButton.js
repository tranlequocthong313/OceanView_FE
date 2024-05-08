import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    wrapCard: {
        flex: 1,
        borderRadius: 4,
        backgroundColor: '#fff',
        justifyContent: 'center',
        margin: 10,
        alignItems: 'center',
        padding: 16,
        borderWidth: 1,
        borderColor: '#000',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    residentCard: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        margin: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#000',
    },
});

export default function ServiceNavButton({ navigation, icon, title, destination, row }) {
    return (
        <TouchableOpacity
            style={row ? styles.residentCard : styles.wrapCard}
            onPress={() => navigation.navigate(destination)}
        >
            <View style={styles.center}>
                {icon}
                <Text style={styles.nameService}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}
