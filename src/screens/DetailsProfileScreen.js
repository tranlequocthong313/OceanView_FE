// import { StyleSheet, Text, View, Image } from 'react-native';
// import authAPI, { endpoints } from '../utils/authAPI';

// const styles = StyleSheet.create({
//     container: {
//         marginTop: 20,
//     },
//     viewWrapper: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         paddingVertical: 10,
//         paddingHorizontal: 12,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',
//         borderStyle: 'solid',
//     },
//     imageWrapper: {
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     image: {
//         width: 150,
//         height: 150,
//         borderRadius: 75,
//         resizeMode: 'contain',
//     },
// });
// export default function DetailsProfileScreen() {
//     return (
//         <View style={styles.container}>
//             <View style={styles.imageWrapper}>
//                 <Image style={styles.image} source={{ uri: 'https://randomuser.me/api/portraits/women/40.jpg' }} />
//             </View>
//             <View style={styles.viewWrapper}>
//                 <Text>Mã cư dân</Text>
//                 <Text>240001</Text>
//             </View>
//             <View style={styles.viewWrapper}>
//                 <Text>Họ và tên</Text>
//                 <Text>Huỳnh Minh Hà</Text>
//             </View>

//             <View style={styles.viewWrapper}>
//                 <Text>Giới tính</Text>
//                 <Text>Nam</Text>
//             </View>

//             <View style={styles.viewWrapper}>
//                 <Text>Ngày sinh</Text>
//                 <Text>01-07-2003</Text>
//             </View>

//             <View style={styles.viewWrapper}>
//                 <Text>Quê Quán</Text>
//                 <Text>Quảng Ngãi</Text>
//             </View>

//             <View style={styles.viewWrapper}>
//                 <Text>CCCD</Text>
//                 <Text>051203001093</Text>
//             </View>

//             <View style={styles.viewWrapper}>
//                 <Text>Email</Text>
//                 <Text>hadep7a@gmail.com</Text>
//             </View>

//             <View style={styles.viewWrapper}>
//                 <Text>SDT</Text>
//                 <Text>0398397591</Text>
//             </View>
//         </View>
//     );
// }

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import api, { userApis } from '../utils/api';

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

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await api.get(userApis['/currentUser']);
                // Lấy dữ liệu từ phản hồi API và cập nhật state
                setProfileData(response.data);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfileData();
    }, []);

    return (
        <View style={styles.container}>
            {profileData && (
                <>
                    <View style={styles.imageWrapper}>
                        <Image style={styles.image} source={{ uri: profileData.avatar }} />
                    </View>
                    <View style={styles.viewWrapper}>
                        <Text>Mã cư dân</Text>
                        <Text>{profileData.personal_information.resident_id}</Text>
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
