import { View, StyleSheet } from 'react-native';
import { UtilityButton } from '~/components';
import { MaterialCommunityIcons, FontAwesome, FontAwesome6, MaterialIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
});

export default function UtilityScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <UtilityButton
                icon={<MaterialIcons name="pool" size={24} color="black" />}
                tittle="Hồ bơi"
                navigation={navigation}
                destination="UtilityScreen"
            />
            <UtilityButton
                icon={<MaterialIcons name="outdoor-grill" size={24} color="black" />}
                tittle="Nướng"
                navigation={navigation}
                destination="UtilityScreen"
            />
            <UtilityButton
                icon={<FontAwesome name="soccer-ball-o" size={24} color="black" />}
                tittle="Bóng đá"
                navigation={navigation}
                destination="UtilityScreen"
            />
            <UtilityButton
                icon={<FontAwesome6 name="table-tennis-paddle-ball" size={24} color="black" />}
                tittle="Bóng đá"
                navigation={navigation}
                destination="UtilityScreen"
            />
            <UtilityButton
                icon={<MaterialCommunityIcons name="dance-ballroom" size={24} color="black" />}
                tittle="Dance"
                navigation={navigation}
                destination="UtilityScreen"
            />
            <UtilityButton
                icon={<MaterialIcons name="local-movies" size={24} color="black" />}
                tittle="Cinema"
                navigation={navigation}
                destination="UtilityScreen"
            />
        </View>
    );
}
