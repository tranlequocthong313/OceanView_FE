import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons, AntDesign, Feather, Entypo } from '@expo/vector-icons';

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        marginTop: 10,
    },
    classify: {
        fontWeight: '500',
        textTransform: 'uppercase',
        fontSize: 18,
        color: 'red',
        padding: 4,
    },
    viewWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        borderStyle: 'solid',
    },
    title: {
        fontSize: 16,
        fontWeight: '400',
        marginLeft: 8,
        alignContent: 'center',
    },
    wrapWithIcon: {
        flexDirection: 'row',
    },
    wrapLogout: {
        marginTop: 8,
    },
    viewWrapLogout: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        borderStyle: 'solid',
    },
    logout: {
        fontSize: 16,
        fontWeight: '400',
        marginLeft: 8,
        alignContent: 'center',
        color: 'red',
    },
});

export default function ProfileScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.classify}>Chung</Text>
                <TouchableOpacity onPress={() => navigation.navigate('DetailsProfile')}>
                    <View style={styles.viewWrapper}>
                        <View style={styles.wrapWithIcon}>
                            <Feather name="user" size={20} color="black" />
                            <Text style={styles.title}>Thông tin cá nhân</Text>
                        </View>
                        <MaterialIcons name="navigate-next" size={24} color="black" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                    <View style={styles.viewWrapper}>
                        <View style={styles.wrapWithIcon}>
                            <AntDesign name="setting" size={22} color="black" />
                            <Text style={styles.title}>Cài đặt</Text>
                        </View>
                        <MaterialIcons name="navigate-next" size={24} color="black" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
                    <View style={styles.viewWrapper}>
                        <View style={styles.wrapWithIcon}>
                            <Feather name="phone" size={20} color="black" />
                            <Text style={styles.title}>Liên hệ với chúng tôi</Text>
                        </View>
                        <MaterialIcons name="navigate-next" size={24} color="black" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
                    <View style={styles.viewWrapper}>
                        <View style={styles.wrapWithIcon}>
                            <Feather name="phone" size={20} color="black" />
                            <Text style={styles.title}>Tạo phản ánh mới</Text>
                        </View>
                        <MaterialIcons name="navigate-next" size={24} color="black" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
                    <View style={styles.viewWrapper}>
                        <View style={styles.wrapWithIcon}>
                            <AntDesign name="message1" size={22} color="black" />
                            <Text style={styles.title}>Chat với ban quản trị</Text>
                        </View>
                        <MaterialIcons name="navigate-next" size={24} color="black" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('AboutUs')}>
                    <View style={styles.viewWrapper}>
                        <View style={styles.wrapWithIcon}>
                            <AntDesign name="infocirlce" size={20} color="black" />
                            <Text style={styles.title}>Về chúng tôi</Text>
                        </View>
                        <MaterialIcons name="navigate-next" size={24} color="black" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.wrapLogout}
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'LoginScreen' }],
                        });
                    }}
                >
                    <View style={styles.viewWrapLogout}>
                        <View style={styles.wrapWithIcon}>
                            <Entypo name="log-out" size={24} color="red" />
                            <Text style={styles.logout}>Đăng xuất</Text>
                        </View>
                        <MaterialIcons name="navigate-next" size={24} color="red" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}
