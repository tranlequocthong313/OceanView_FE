import React, { useState, useEffect } from 'react';
import {
    PermissionsAndroid,
    Image,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
} from 'react-native';
import { AntDesign, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import messaging from '@react-native-firebase/messaging';
import DropDownPicker from 'react-native-dropdown-picker';
import * as Notifications from 'expo-notifications';
import { useUser } from '~/hooks/useUser';
import { useNotificationAPI, useNotificationDispatch } from '~/hooks/useNotification';
import { NOTIFICATION_ACTION_TYPE } from '~/reducers/notificationReducer';
import saveTokenToDatabase from '~/firebase';
import theme from '~/core/theme';
import { authAPI, newApis } from '~/utils/api';
import { UtilityButton } from '~/components';

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
    newContainer: {
        marginHorizontal: 12,
    },
    textWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        display: 'block',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
        marginBottom: 8,
        zIndex: 10, // Ensure this view has higher zIndex
    },
    picker: {
        maxWidth: 180,
        zIndex: 11, // Ensure the DropDownPicker has a higher zIndex
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 40,
    },
    wrapNews: {
        flexDirection: 'row',
    },
    titleImage: {
        alignSelf: 'center',
        marginVertical: 4,
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

const screenWidth = Dimensions.get('window').width - 24;

export default function HomeScreen({ navigation }) {
    const user = useUser();
    const notificationDispatch = useNotificationDispatch();
    const apis = useNotificationAPI();

    const [newCategories, setNewCategories] = useState(null);
    const [news, setNews] = useState(null);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(1);
    const [items, setItems] = useState([]);

    const fetchCategoryData = async (categoryId) => {
        console.log(`${newApis.getNew}${categoryId}`);
        try {
            const response = await (await authAPI()).get(`${newApis.getAllNewsByCategory}${categoryId}/news/`);
            setNews(response.data.results);
        } catch (error) {
            console.error('Failed to fetch category data:', error);
        }
    };

    useEffect(() => {
        const fetchNewCategories = async () => {
            try {
                const response = await (await authAPI()).get(newApis.getNewCategories);
                const categories = response.data.results.map((category) => ({
                    label: category.name,
                    value: category.id,
                }));
                setNewCategories(response.data);
                setItems(categories);
            } catch (error) {
                console.error(error);
            }
        };

        const requestPermissionsAndFetchToken = async () => {
            const permissionStatus = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            );
            console.log('PERMISSION:::', permissionStatus);

            if (permissionStatus !== 'denied') {
                const deviceToken = await messaging().getToken();
                saveTokenToDatabase(deviceToken);
            }
        };

        Promise.all([fetchNewCategories(), requestPermissionsAndFetchToken()])
            .then(() => {
                console.log('All promises resolved');
            })
            .catch((error) => {
                console.error(error);
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

            await Notifications.scheduleNotificationAsync({
                content: notification,
                trigger: null,
            });
        };

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

                <View style={styles.newContainer}>
                    <View style={styles.textWrapper}>
                        <Text style={styles.titleText}>Danh mục</Text>
                        {newCategories && newCategories.results && (
                            <DropDownPicker
                                style={styles.picker}
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setItems}
                                placeholder="--All--"
                                dropDownContainerStyle={{
                                    backgroundColor: '#dfdfdf',
                                    maxWidth: 180,
                                    zIndex: 1000, // Ensure the dropdown container has the highest zIndex
                                }}
                                selectedItemContainerStyle={{
                                    backgroundColor: 'grey',
                                }}
                                onChangeValue={(id) => {
                                    console.log('Selected categoryId:', id);
                                    fetchCategoryData(id);
                                }}
                            />
                        )}
                    </View>

                    <ScrollView horizontal style={{ zIndex: 1 }}>
                        {news &&
                            news.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    onPress={() =>
                                        navigation.navigate('DetailsNewScreen', { id: item.id, category: item.category })
                                    }
                                >
                                    <Image
                                        source={{ uri: item.thumbnail }}
                                        style={{
                                            width: screenWidth,
                                            height: 200,
                                            resizeMode: 'cover',
                                            borderRadius: 4,
                                        }}
                                    />
                                    <Text style={styles.titleImage}>{item.title}</Text>
                                </TouchableOpacity>
                            ))}
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}
