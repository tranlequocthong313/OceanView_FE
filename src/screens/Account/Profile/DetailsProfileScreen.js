import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { authAPI, userApis } from '~/utils/api';

import { useUserDispatch } from '~/hooks/useUser';
import { USER_ACTION_TYPE } from '~/reducers/userReducer';
import { AntDesign, FontAwesome, MaterialCommunityIcons, Fontisto } from '@expo/vector-icons';

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    viewWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        borderStyle: 'solid',
    },
    imageWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        resizeMode: 'cover',
        borderWidth: 1,
        borderColor: '#000',
        marginBottom: 20,
    },
    titleWrap: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        marginLeft: 6,
    },
});

export default function DetailsProfileScreen() {
    const [profileData, setProfileData] = useState(null);

    const userDispatch = useUserDispatch();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await (await authAPI()).get(userApis.currentUser);
                userDispatch({ type: USER_ACTION_TYPE.CURRENT, payload: response.data });
                setProfileData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProfileData();
    }, [userDispatch]);

    return (
        <View style={styles.container}>
            {profileData && (
                <>
                    {profileData.avatar ? (
                        <View style={styles.imageWrapper}>
                            <Image style={styles.image} source={{ uri: profileData.avatar }} />
                        </View>
                    ) : (
                        ''
                    )}
                    <View style={styles.viewWrapper}>
                        <View style={styles.titleWrap}>
                            <MaterialCommunityIcons name="identifier" size={20} color="black" />
                            <Text style={styles.text}>Mã cư dân</Text>
                        </View>
                        <Text>{profileData.resident_id}</Text>
                    </View>
                    <View style={styles.viewWrapper}>
                        <View style={styles.titleWrap}>
                            <AntDesign name="user" size={20} color="black" />
                            <Text style={styles.text}>Họ và tên</Text>
                        </View>
                        <Text>{profileData.personal_information.full_name}</Text>
                    </View>
                    <View style={styles.viewWrapper}>
                        <View style={styles.titleWrap}>
                            <FontAwesome name="transgender" size={20} color="black" />
                            <Text style={styles.text}>Giới tính</Text>
                        </View>
                        <Text>{profileData.personal_information.gender}</Text>
                    </View>
                    <View style={styles.viewWrapper}>
                        <View style={styles.titleWrap}>
                            <AntDesign name="calendar" size={20} color="black" />
                            <Text style={styles.text}>Ngày sinh</Text>
                        </View>
                        <Text>{profileData.personal_information.date_of_birth}</Text>
                    </View>
                    <View style={styles.viewWrapper}>
                        <View style={styles.titleWrap}>
                            <AntDesign name="home" size={20} color="black" />
                            <Text style={styles.text}>Quê quán</Text>
                        </View>
                        <Text>{profileData.personal_information.hometown}</Text>
                    </View>
                    <View style={styles.viewWrapper}>
                        <View style={styles.titleWrap}>
                            <AntDesign name="idcard" size={20} color="black" />
                            <Text style={styles.text}>CCCD</Text>
                        </View>
                        <Text>{profileData.personal_information.citizen_id}</Text>
                    </View>
                    <View style={styles.viewWrapper}>
                        <View style={styles.titleWrap}>
                            <Fontisto name="email" size={20} color="black" />
                            <Text style={styles.text}>Email</Text>
                        </View>
                        <Text>{profileData.personal_information.email}</Text>
                    </View>
                    <View style={styles.viewWrapper}>
                        <View style={styles.titleWrap}>
                            <FontAwesome name="phone" size={20} color="black" />
                            <Text style={styles.text}>Số điện thoại</Text>
                        </View>
                        <Text>{profileData.personal_information.phone_number}</Text>
                    </View>
                </>
            )}
        </View>
    );
}
