import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { FontAwesome6, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEEDEC',
        flex: 1,
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
        flex: 1,
        borderRadius: 4,
        backgroundColor: '#fff',
        justifyContent: 'center',
        margin: 10,
        alignItems: 'center',
        padding: 16,
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
                    <TouchableOpacity style={styles.wrapCard} onPress={() => navigation.navigate('ParkingCardMain')}>
                        <View style={styles.center}>
                            <FontAwesome6 name="square-parking" size={24} color="black" />
                            <Text style={styles.nameService}>Thẻ giữ xe</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.wrapCard} onPress={() => navigation.navigate('AccessCardMain')}>
                        <View style={styles.center}>
                            <MaterialCommunityIcons name="credit-card-sync-outline" size={24} color="black" />
                            <Text style={styles.nameService}>Thẻ ra vào</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('ResidentCardMain')}>
                    <View style={styles.residentCard}>
                        <MaterialIcons name="account-circle" size={24} color="black" />
                        <Text style={styles.nameService}>Thẻ cư dân</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}
