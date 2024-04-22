import { View, Text, Button } from 'react-native';

export default function CancelResidentCardScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>CancelResidentCardScreen</Text>
            <Button title="Go to Details" onPress={() => navigation.navigate('DetailsSettings')} />
        </View>
    );
}
