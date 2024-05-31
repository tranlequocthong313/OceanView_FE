import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { authAPI, userApis } from '~/utils/api';
import { useUserDispatch } from '~/hooks/useUser';
import { USER_ACTION_TYPE } from '~/reducers/userReducer';
import { AntDesign, FontAwesome, MaterialCommunityIcons, Fontisto } from '@expo/vector-icons';
import { InfoView } from '~/components';

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
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
});

const userDataConfig = [
    {
        id: 1,
        icon: <MaterialCommunityIcons name="identifier" size={20} color="black" />,
        label: 'Mã cư dân',
        field: 'resident_id',
    },
    {
        id: 2,
        icon: <AntDesign name="user" size={20} color="black" />,
        label: 'Họ và tên',
        field: 'personal_information.full_name',
    },
    {
        id: 3,
        icon: <FontAwesome name="transgender" size={20} color="black" />,
        label: 'Giới tính',
        field: 'personal_information.gender',
    },
    {
        id: 4,
        icon: <AntDesign name="calendar" size={20} color="black" />,
        label: 'Ngày sinh',
        field: 'personal_information.date_of_birth',
    },
    {
        id: 5,
        icon: <AntDesign name="home" size={20} color="black" />,
        label: 'Quê quán',
        field: 'personal_information.hometown',
    },
    {
        id: 6,
        icon: <AntDesign name="idcard" size={20} color="black" />,
        label: 'CCCD',
        field: 'personal_information.citizen_id',
    },
    {
        id: 7,
        icon: <Fontisto name="email" size={20} color="black" />,
        label: 'Email',
        field: 'personal_information.email',
    },
    {
        id: 8,
        icon: <FontAwesome name="phone" size={20} color="black" />,
        label: 'Số điện thoại',
        field: 'personal_information.phone_number',
    },
];

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
                console.error(error);
            }
        };
        fetchProfileData();
    }, [userDispatch]);

    return (
        <View style={styles.container}>
            {profileData && (
                <>
                    {profileData.avatar && (
                        <View style={styles.imageWrapper}>
                            <Image
                                style={styles.image}
                                source={{ uri: profileData.avatar ? profileData.avatar : '' }}
                            />
                        </View>
                    )}
                    <InfoView
                        icon={<AntDesign name="user" size={20} color="black" />}
                        title="Họ và tên"
                        content={profileData.personal_information.full_name}
                    />
                    {userDataConfig.map(({ id, icon, label, field }) => {
                        const content = field.split('.').reduce((acc, part) => acc?.[part], profileData);
                        return <InfoView key={id} icon={icon} title={label} content={content} />;
                    })}
                </>
            )}
        </View>
    );
}
