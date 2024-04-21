import { View, Text, Button } from 'react-native';

export default function SettingsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings screen</Text>
            <Button title="Go to Details" onPress={() => navigation.navigate('DetailsSettings')} />
        </View>
    );
}
