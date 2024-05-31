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

const utilityButtonsData = [
    {
        id: 1,
        icon: <MaterialIcons name="pool" size={24} color="black" />,
        title: 'Hồ bơi',
        destination: 'UtilityScreen',
    },
    {
        id: 2,
        icon: <MaterialIcons name="outdoor-grill" size={24} color="black" />,
        title: 'Nướng',
        destination: 'UtilityScreen',
    },
    {
        id: 3,
        icon: <FontAwesome name="soccer-ball-o" size={24} color="black" />,
        title: 'Bóng đá',
        destination: 'UtilityScreen',
    },
    {
        id: 4,
        icon: <FontAwesome6 name="table-tennis-paddle-ball" size={24} color="black" />,
        title: 'Bóng bàn',
        destination: 'UtilityScreen',
    },
    {
        id: 5,
        icon: <MaterialCommunityIcons name="dance-ballroom" size={24} color="black" />,
        title: 'Dance',
        destination: 'UtilityScreen',
    },
    {
        id: 6,
        icon: <MaterialIcons name="local-movies" size={24} color="black" />,
        title: 'Cinema',
        destination: 'UtilityScreen',
    },
];

// Lặp qua mảng utilityButtonsData để render các UtilityButton

export default function UtilityScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Danh sách tiện ích</Text>
            <View style={styles.wrapper}>
                {utilityButtonsData.map((button) => (
                    <UtilityButton
                        key={button.id} // Chú ý cung cấp key unique cho mỗi phần tử trong mảng
                        icon={button.icon}
                        title={button.title}
                        destination={button.destination}
                        navigation={navigation}
                    />
                ))}
            </View>
        </View>
    );
}
