import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { FontAwesome6, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEEDEC',
        flex: 1,
    },
    wrapper: {
        marginHorizontal: 14,
    },
    text: {
        marginHorizontal: 12,
        marginVertical: 16,
        fontSize: 14,
        fontWeight: '500',
    },
    registerCard: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    wrapCard: {
        borderRadius: 4,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    nameService: {
        marginTop: 4,
    },
    registerAccount: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        margin: 10,
        borderRadius: 4,
    },
});

export default function ServiceScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.text}>Danh sách dịch vụ</Text>

                <View>
                    <View style={styles.registerCard}>
                        <TouchableOpacity onPress={() => navigation.navigate('RegisterParkingCard')}>
                            <View style={styles.wrapCard}>
                                <FontAwesome6 name="square-parking" size={24} color="black" />
                                <Text style={styles.nameService}>Đăng ký thẻ giữ xe</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('RegisterAccessCard')}>
                            <View style={styles.wrapCard}>
                                <MaterialCommunityIcons name="credit-card-sync-outline" size={24} color="black" />
                                <Text style={styles.nameService}>Đăng ký thẻ ra vào</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('RegisterRelativeAccount')}>
                            <View style={styles.registerAccount}>
                                <MaterialIcons name="account-circle" size={24} color="black" />
                                <Text style={styles.nameService}>Đăng ký cấp phát tài khoản cho người thân</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}
