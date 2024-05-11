import { View, Text, Button } from 'react-native';

export default function ReissueAccessCardScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>ReissueParkingCardScreen</Text>
            <Button title="Go to Details" onPress={() => navigation.navigate('DetailsSettings')} />
        </View>
    );
}
