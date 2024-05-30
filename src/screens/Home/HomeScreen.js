import { AntDesign, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { UtilityButton } from '~/components';
import theme from '~/core/theme';
import { useUser } from '~/hooks/useUser';
import messaging from '@react-native-firebase/messaging';
import saveTokenToDatabase from '~/firebase';
import { useEffect } from 'react';

const styles = StyleSheet.create({
    container: {},
    wrapHeader: {
        paddingTop: 50,
        // marginHorizontal: 2,
        backgroundColor: theme.colors.primary,
        height: 130,
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative',
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
    },
    header: {
        flexDirection: 'row',
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        resizeMode: 'cover',
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

const utilityButtons = [
    {
        id: 1,
        icon: <MaterialCommunityIcons name="beach" size={24} color="black" />,
        title: 'Tiện ích',
        destination: 'UtilityScreen',
    },
    {
        id: 2,
        icon: <FontAwesome6 name="servicestack" size={24} color="black" />,
        title: 'Dịch vụ',
        destination: 'ServiceScreen',
    },
    {
        id: 3,
        icon: <FontAwesome6 name="file-invoice-dollar" size={22} color="black" />,
        title: 'Hoá đơn',
        destination: 'InvoiceScreen',
    },
    {
        id: 4,
        icon: <AntDesign name="appstore-o" size={22} color="black" />,
        title: 'Xem thêm',
        destination: 'SeeMore',
    },
];

export default function HomeScreen({ navigation }) {
    const user = useUser();
    console.log(user);

    useEffect(() => {
        messaging()
            .getToken()
            .then(token => saveTokenToDatabase(token));

        return messaging().onTokenRefresh(token => {
            saveTokenToDatabase(token);
        });
    }, []);

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
                    {utilityButtons.map((button) => (
                        <UtilityButton
                            key={button.id}
                            icon={button.icon}
                            title={button.title}
                            destination={button.destination}
                            navigation={navigation}
                        />
                    ))}
                </View>
            </View>
        </View>
    );
}
