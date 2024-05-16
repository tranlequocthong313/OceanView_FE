import { View, StyleSheet, Text } from 'react-native';
import UtilityScreen from './UtilityScreen';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default function SeeMoreScreen() {
    return (
        <View style={styles.container}>
            <Text>SeeMore Screen</Text>
            <UtilityScreen />
        </View>
    );
}
