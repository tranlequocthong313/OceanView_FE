import { View, Text, Button, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    // text: '#000000',
    // primary: '#560CCE',
    // secondary: '#414757',
    // error: '#f13a59',
    container: {
        width: 400,
        height: 400,
        color: '#000000',
        backgroundColor: '#f13a59',
    }
});

export default function SettingsScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Settings Screen</Text>
        </View>
    );
}
