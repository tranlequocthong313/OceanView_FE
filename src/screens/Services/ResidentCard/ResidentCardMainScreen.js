import { View, StyleSheet } from 'react-native';
import { FormActionBtn } from '~/components';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEEDEC',
        flex: 1,
    },
});

export default function ResidentCardMainScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <FormActionBtn navigation={navigation} type="Resident" />
        </View>
    );
}
