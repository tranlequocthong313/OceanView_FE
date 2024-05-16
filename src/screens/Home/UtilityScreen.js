import { View, StyleSheet, Text } from 'react-native';
import { UtilityButton } from '~/components';
import { MaterialCommunityIcons, FontAwesome, FontAwesome6, MaterialIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
    },
    title: {
        fontWeight: '500',
        fontSize: 16,
        margin: 12,
    },
    wrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

export default function UtilityScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Danh sách tiện ích</Text>
            <View style={styles.wrapper}>
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
        </View>
    );
}
