import { View, Text, StyleSheet } from 'react-native';
import { Entypo, Ionicons, Feather } from '@expo/vector-icons';

const styles = StyleSheet.create({
    container: {
        marginTop: 4,
    },
    viewWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        borderStyle: 'solid',
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    contentWrapper: {
        marginLeft: 8,
    },
});

function ContactScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.viewWrapper}>
                <Entypo name="facebook" size={24} color="black" />
                <View style={styles.contentWrapper}>
                    <Text>Facebook</Text>
                    <Text>oceanviewvn</Text>
                </View>
            </View>

            <View style={styles.viewWrapper}>
                <Ionicons name="earth" size={24} color="black" />
                <View style={styles.contentWrapper}>
                    <Text>Website</Text>
                    <Text>https://www.oceanview.vn</Text>
                </View>
            </View>

            <View style={styles.viewWrapper}>
                <Feather name="mail" size={24} color="black" />
                <View style={styles.contentWrapper}>
                    <Text>Email</Text>
                    <Text>info@oceanview.vn</Text>
                </View>
            </View>

            <View style={styles.viewWrapper}>
                <Feather name="phone" size={24} color="black" />
                <View style={styles.contentWrapper}>
                    <Text>Sản phẩm khác</Text>
                    <Text>039 839 7591</Text>
                </View>
            </View>
        </View>
    );
}

export default ContactScreen;
