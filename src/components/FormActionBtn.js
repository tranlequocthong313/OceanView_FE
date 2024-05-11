import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
        borderWidth: 1,
        borderColor: '#000',
    },
    residentCard: {
        borderRadius: 4,
        backgroundColor: '#fff',
        justifyContent: 'center',
        margin: 10,
        alignItems: 'center',
        padding: 16,
        borderWidth: 1,
        borderColor: '#000',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default function FormActionBtn({ navigation, type }) {
    return (
        <View style={styles.wrapper}>
            <View style={styles.cardContainer}>
                <TouchableOpacity style={styles.wrapCard} onPress={() => navigation.navigate(`Register${type}Card`)}>
                    <View style={styles.center}>
                        <Ionicons name="add-circle" size={24} color="black" />
                        <Text>Đăng ký thẻ</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.wrapCard} onPress={() => navigation.navigate(`Cancel${type}Card`)}>
                    <View style={styles.center}>
                        <MaterialIcons name="cancel" size={24} color="red" />
                        <Text>Huỷ thẻ</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.residentCard} onPress={() => navigation.navigate(`Reissue${type}Card`)}>
                <View style={styles.center}>
                    <Ionicons name="refresh-circle" size={24} color="green" />
                    <Text>Cấp lại thẻ</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
