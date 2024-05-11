import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api, { userApis } from '~/utils/api';
import { useUserDispatch } from '~/hooks/useUser';

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
        resizeMode: 'contain',
    },
});

export default function DetailsProfileScreen() {
    const [profileData, setProfileData] = useState(null);
    const userDispatch = useUserDispatch();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = await AsyncStorage.getItem('accessToken');
                console.log(token);

                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                const response = await api.get(userApis.currentUser, {
                    headers,
                });
                userDispatch({ type: 'current', payload: response.data });
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
                        <Text>Mã cư dân</Text>
                        <Text>{profileData.resident_id}</Text>
                    </View>
                    <View style={styles.viewWrapper}>
                        <Text>Họ và tên</Text>
                        <Text>{profileData.personal_information.full_name}</Text>
                    </View>
                    <View style={styles.viewWrapper}>
                        <Text>Giới tính</Text>
                        <Text>{profileData.personal_information.gender}</Text>
                    </View>
                    <View style={styles.viewWrapper}>
                        <Text>Ngày sinh</Text>
                        <Text>{profileData.personal_information.date_of_birth}</Text>
                    </View>
                    <View style={styles.viewWrapper}>
                        <Text>Quê quán</Text>
                        <Text>{profileData.personal_information.hometown}</Text>
                    </View>
                    <View style={styles.viewWrapper}>
                        <Text>CCCD</Text>
                        <Text>{profileData.personal_information.citizen_id}</Text>
                    </View>
                    <View style={styles.viewWrapper}>
                        <Text>Email</Text>
                        <Text>{profileData.personal_information.email}</Text>
                    </View>
                    <View style={styles.viewWrapper}>
                        <Text>Số điện thoại</Text>
                        <Text>{profileData.personal_information.phone_number}</Text>
                    </View>
                </>
            )}
        </View>
    );
}
