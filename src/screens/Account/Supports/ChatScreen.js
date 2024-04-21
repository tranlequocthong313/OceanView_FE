import { View, Text, Button, TextInput } from 'react-native';

export default function ChatScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Chat with admin</Text>
            <TextInput label="Mật khẩu" secureTextEntry />
            <Button title="Go to Details" onPress={() => navigation.navigate('DetailsSettings')} />
        </View>
    );
}
