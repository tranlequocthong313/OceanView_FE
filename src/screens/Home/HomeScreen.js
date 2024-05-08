import { AntDesign, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
    container: {},
    wrapHeader: {
        paddingTop: 40,
        backgroundColor: '#F7BD62',
        height: 130,
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative',
    },
    header: {
        flexDirection: 'row',
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        resizeMode: 'contain',
        margin: 8,
    },
    contentWrapper: {
        margin: 8,
    },
    greeting: {
        fontSize: 14,
        color: '#6E4D21',
        marginBottom: 8,
    },
    resident: {
        fontSize: 18,
        fontWeight: '500',
    },
    iconsHeader: {
        flexDirection: 'row',
        margin: 4,
    },
    iconsWrap: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4,
    },
    contentWrap: {
        backgroundColor: '#EEEDEC',
    },
    utilityContainer: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 6,
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    utilityWrap: {
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    utilityIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#EEEDEC',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
    },
    utilityText: {
        fontSize: 13,
    },
});

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            {/* header */}
            <View style={styles.wrapHeader}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.navigate('ProfileTab')}>
                        <Image
                            style={styles.image}
                            source={{ uri: 'https://randomuser.me/api/portraits/women/40.jpg' }}
                        />
                    </TouchableOpacity>
                    <View style={styles.contentWrapper}>
                        <Text style={styles.greeting}>Xin chào,</Text>
                        <Text style={styles.resident}>Cư dân OceanView</Text>
                    </View>
                </View>
                <View style={styles.iconsHeader}>
                    <View>
                        <TouchableOpacity>
                            <View style={styles.iconsWrap}>
                                <AntDesign name="shoppingcart" size={24} color="black" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <View style={styles.iconsWrap}>
                                <AntDesign name="message1" size={24} color="black" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {/* content */}
            <View style={styles.contentWrap}>
                {/* utility */}
                <View style={styles.utilityContainer}>
                    <View style={styles.utilityWrap}>
                        <TouchableOpacity>
                            <View style={styles.utilityIcon}>
                                <MaterialCommunityIcons name="beach" size={24} color="black" />
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.utilityText}>Tiện ích</Text>
                    </View>

                    <View style={styles.utilityWrap}>
                        <TouchableOpacity onPress={() => navigation.navigate('ServiceScreen')}>
                            <View style={styles.utilityIcon}>
                                <FontAwesome6 name="servicestack" size={24} color="black" />
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.utilityText}>Dịch vụ</Text>
                    </View>

                    <View style={styles.utilityWrap}>
                        <TouchableOpacity>
                            <View style={styles.utilityIcon}>
                                <FontAwesome6 name="file-invoice-dollar" size={22} color="black" />
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.utilityText}>Hoá đơn</Text>
                    </View>

                    <View style={styles.utilityWrap}>
                        <TouchableOpacity>
                            <View style={styles.utilityIcon}>
                                <AntDesign name="appstore-o" size={22} color="black" />
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.utilityText}>Xem thêm</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
