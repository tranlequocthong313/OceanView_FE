import { AntDesign, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { PermissionsAndroid, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { UtilityButton } from '~/components';
import { useUser } from '~/hooks/useUser';
import messaging from '@react-native-firebase/messaging';
import * as Notifications from 'expo-notifications';
import { useNotificationAPI, useNotificationDispatch } from '~/hooks/useNotification';
import { NOTIFICATION_ACTION_TYPE } from '~/reducers/notificationReducer';
import saveTokenToDatabase from '~/firebase';
import theme from '~/core/theme';
import { useEffect } from 'react';

const styles = StyleSheet.create({
    container: {},
    wrapHeader: {
        marginTop: 28,
        paddingTop: 50,
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
    const notificationDispatch = useNotificationDispatch();
    const apis = useNotificationAPI();

    useEffect(() => {
        // NOTE: On Android API level 32 and below, you do not need to request user permission. This method can still
        // be called on Android devices; however, and will always resolve successfully. For API level 33+ you will need
        // to request the permission manually using either the built-in react-native PermissionsAndroid APIs or a related
        // module such as react-native-permissions
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS).then((permissionStatus) => {
            console.log('PERMISSION:::', permissionStatus);

            if (permissionStatus !== 'denied') {
                messaging()
                    .getToken()
                    .then((deviceToken) => {
                        saveTokenToDatabase(deviceToken);
                    });
            }
        });

        return messaging().onTokenRefresh((token) => {
            saveTokenToDatabase(token);
        });
    }, []);

    useEffect(() => {
        const setupNotificationHandler = () => {
            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                    shouldShowAlert: true,
                    shouldPlaySound: true,
                    shouldSetBadge: false,
                }),
            });
        };
        setupNotificationHandler();

        const handleNotificationClick = async (response) => {
            console.log('onclick foreground notification', response);
            console.log(response?.notification?.request?.content?.data);
            await apis.readNotification({ navigation, notification: response?.notification?.request?.content?.data });
        };

        // Listen for user clicking on a notification
        const notificationClickSubscription =
            Notifications.addNotificationResponseReceivedListener(handleNotificationClick);

        const getNotification = (remoteMessage) => ({
            id: remoteMessage.messageId,
            has_been_read: false,
            message: remoteMessage.notification.title,
            content: JSON.parse(remoteMessage.data.content),
            created_date: new Date().toISOString(),
            updated_date: new Date().toISOString(),
        });

        const openAppFromBackgroundNotification = () => {
            messaging().onNotificationOpenedApp((remoteMessage) => {
                if (!remoteMessage) {
                    return;
                }
                console.log('Open app from background state', remoteMessage);
                const data = getNotification(remoteMessage);
                apis.readNotification({ navigation, notification: data });
            });
        };
        openAppFromBackgroundNotification();

        // NOTE: Can't test this in development build?
        const openAppFromQuitNotification = () => {
            messaging()
                .getInitialNotification()
                .then((remoteMessage) => {
                    if (remoteMessage) {
                        console.log('Open app from quit state', remoteMessage);
                        const data = getNotification(remoteMessage.data);
                        apis.readNotification({ navigation, notification: data });
                    }
                });
        };
        openAppFromQuitNotification();

        const dispatchNotification = (data) => {
            notificationDispatch({
                type: NOTIFICATION_ACTION_TYPE.PUSH,
                payload: {
                    data,
                },
            });
        };

        const handleBackgroundNotification = () => {
            messaging().setBackgroundMessageHandler(async (remoteMessage) => {
                console.log('BACKGROUND:::', remoteMessage);
                const data = getNotification(remoteMessage);
                dispatchNotification(data);
            });
        };
        handleBackgroundNotification();

        const handleForegroundNotification = async (remoteMessage) => {
            if (!remoteMessage) {
                return;
            }
            console.log('FOREGROUND:::', remoteMessage);
            const data = getNotification(remoteMessage);
            const notification = {
                title: remoteMessage.notification.title,
                body: remoteMessage.notification.body,
                data,
            };

            dispatchNotification(data);

            // Schedule the notification with a null trigger to show immediately
            await Notifications.scheduleNotificationAsync({
                content: notification,
                trigger: null,
            });
        };

        // Listen for push notifications when the app is in the foreground
        const unsubscribe = messaging().onMessage(handleForegroundNotification);

        return () => {
            unsubscribe();
            notificationClickSubscription.remove();
        };
    }, [navigation, notificationDispatch, apis]);

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
