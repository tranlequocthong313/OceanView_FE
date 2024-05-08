import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: 400,
        height: 400,
        color: '#000000',
        backgroundColor: '#f13a59',
    },
});

export default function SettingsScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Settings Screen</Text>
        </View>
    );
}
