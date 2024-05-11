import { View, Text, Button } from 'react-native';

export default function ReissueResidentCardScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>ReissueResidentCardScreen</Text>
            <Button title="Go to Details" onPress={() => navigation.navigate('DetailsSettings')} />
        </View>
    );
}
