import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { MaterialIcons, AntDesign, Feather, Entypo } from '@expo/vector-icons';
import { StackView } from '~/components';

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
    wrapWithIcon: {
        flexDirection: 'row',
    },
    title: {
        fontSize: 16,
        fontWeight: '400',
        marginLeft: 8,
        alignContent: 'center',
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

export default function AccountScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.classify}>Chung</Text>
                <StackView
                    navigation={navigation}
                    icon={<Feather name="user" size={20} color="black" />}
                    title="Thông tin cá nhân"
                    destination="DetailsProfile"
                />

                <StackView
                    navigation={navigation}
                    icon={<AntDesign name="setting" size={22} color="black" />}
                    title="Cài đặt"
                    destination="Settings"
                />
                <StackView
                    navigation={navigation}
                    icon={<Feather name="phone" size={20} color="black" />}
                    title="Liên hệ với chúng tôi"
                    destination="Contact"
                />

                <StackView
                    navigation={navigation}
                    icon={<Entypo name="new-message" size={24} color="black" />}
                    title="Danh sách phản ánh đã tạo"
                    destination="HistoryReflection"
                />

                <StackView
                    navigation={navigation}
                    icon={<AntDesign name="message1" size={22} color="black" />}
                    title="Chat với ban quản trị"
                    destination="Chat"
                />

                <StackView
                    navigation={navigation}
                    icon={<AntDesign name="infocirlce" size={20} color="black" />}
                    title="Về chúng tôi"
                    destination="AboutUs"
                />

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
