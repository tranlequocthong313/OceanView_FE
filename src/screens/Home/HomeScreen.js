import { AntDesign, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { UtilityButton } from '~/components';
import theme from '~/core/theme';
import { useUser } from '~/hooks/useUser';

const styles = StyleSheet.create({
    container: {},
    wrapHeader: {
        // marginTop: 40,
        paddingTop: 50,
        marginHorizontal: 2,
        backgroundColor: theme.colors.primary,
        height: 130,
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative',
        borderRadius: 4,
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
        borderWidth: 1,
        borderColor: '#fff',
    },
    contentWrapper: {
        marginHorizontal: 4,
        marginVertical: 8,
    },
    greeting: {
        fontSize: 12,
        color: '#fff',
        marginBottom: 8,
    },
    resident: {
        color: '#fff',
        fontSize: 16,
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
        paddingTop: 16,
        paddingBottom: 12,
        backgroundColor: '#fff',
        borderRadius: 6,
        marginHorizontal: 12,
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
});

export default function HomeScreen({ navigation }) {
    const user = useUser();
    console.log(user);

    return (
        <View style={styles.container}>
            {/* header */}
            <View style={styles.wrapHeader}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.navigate('DetailsProfile')}>
                        <Image style={styles.image} source={{ uri: user.avatar }} />
                    </TouchableOpacity>
                    <View style={styles.contentWrapper}>
                        <Text style={styles.greeting}>Xin chào,</Text>
                        <Text style={styles.resident}>Cư dân OceanView</Text>
                    </View>
                </View>
                <View style={styles.iconsHeader}>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('LockerDetailScreen')}>
                            <View style={styles.iconsWrap}>
                                <MaterialCommunityIcons name="locker" size={24} color="black" />
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
                    <UtilityButton
                        icon={<MaterialCommunityIcons name="beach" size={24} color="black" />}
                        tittle="Tiện ích"
                        navigation={navigation}
                        destination="UtilityScreen"
                    />

                    <UtilityButton
                        icon={<FontAwesome6 name="servicestack" size={24} color="black" />}
                        tittle="Dịch vụ"
                        navigation={navigation}
                        destination="ServiceScreen"
                    />

                    <UtilityButton
                        icon={<FontAwesome6 name="file-invoice-dollar" size={22} color="black" />}
                        tittle="Hoá đơn"
                        navigation={navigation}
                        destination="InvoiceScreen"
                    />

                    <UtilityButton
                        icon={<AntDesign name="appstore-o" size={22} color="black" />}
                        tittle="Xem thêm"
                        navigation={navigation}
                        destination="SeeMore"
                    />
                </View>
            </View>
        </View>
    );
}
