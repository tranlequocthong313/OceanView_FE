import { View, StyleSheet } from 'react-native';
import UtilityScreen from './UtilityScreen';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default function SeeMoreScreen() {
    return (
        <View style={styles.container}>
            <UtilityScreen />
        </View>
    );
}
