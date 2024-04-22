import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEEDEC',
        flex: 1,
    },
    wrapper: {
        marginHorizontal: 12,
        marginTop: 8,
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    wrapCard: {
        borderRadius: 4,
        backgroundColor: '#fff',
        justifyContent: 'center',
        margin: 10,
        alignItems: 'center',
        padding: 16,
        flex: 1,
    },
    residentCard: {
        borderRadius: 4,
        backgroundColor: '#fff',
        justifyContent: 'center',
        margin: 10,
        alignItems: 'center',
        padding: 16,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default function ParkingCardMainScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.cardContainer}>
                    <TouchableOpacity
                        style={styles.wrapCard}
                        onPress={() => navigation.navigate('RegisterParkingCard')}
                    >
                        <View style={styles.center}>
                            <Ionicons name="add-circle" size={24} color="black" />
                            <Text>Đăng ký thẻ</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.wrapCard} onPress={() => navigation.navigate('CancelParkingCard')}>
                        <View style={styles.center}>
                            <MaterialIcons name="cancel" size={24} color="red" />
                            <Text>Huỷ thẻ</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.residentCard} onPress={() => navigation.navigate('ReissueParkingCard')}>
                    <View style={styles.center}>
                        <Ionicons name="refresh-circle" size={24} color="green" />
                        <Text>Cấp lại thẻ</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}
