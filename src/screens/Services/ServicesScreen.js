import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome6, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { ServiceNavButton } from '~/components';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEEDEC',
    },
    wrapper: {
        marginHorizontal: 12,
    },
    text: {
        marginHorizontal: 20,
        marginVertical: 16,
        fontSize: 14,
        fontWeight: '500',
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    wrapCard: {
        borderRadius: 4,
        backgroundColor: '#fff',
        justifyContent: 'center',
        margin: 10,
        alignItems: 'center',
        padding: 16,
        borderWidth: 1,
        borderColor: '#000',
    },
    nameService: {
        marginTop: 4,
    },
    residentCard: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        margin: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#000',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default function ServiceScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Danh sách dịch vụ</Text>
            <View style={styles.wrapper}>
                <View style={styles.cardContainer}>
                    <ServiceNavButton
                        navigation={navigation}
                        icon={<FontAwesome6 name="square-parking" size={24} color="black" />}
                        title="Thẻ giữ xe"
                        destination="ParkingCardMain"
                    />
                    <ServiceNavButton
                        navigation={navigation}
                        icon={<MaterialCommunityIcons name="credit-card-sync-outline" size={24} color="black" />}
                        title="Thẻ ra vào"
                        destination="AccessCardMain"
                    />
                </View>

                <ServiceNavButton
                    navigation={navigation}
                    icon={<MaterialIcons name="account-circle" size={24} color="black" />}
                    title="Thẻ cư dân"
                    destination="ResidentCardMain"
                    row
                />
            </View>
        </View>
    );
}
