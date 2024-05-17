import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, ToastAndroid } from 'react-native';
import { Button as ButtonPaper } from 'react-native-paper';
import theme from '~/core/theme';
import handleUploadImage from '~/utils/image';
import { AntDesign } from '@expo/vector-icons';
import { authAPI, invoiceApis } from '~/utils/api';
import { MessageInvalid } from '~/components';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    amountWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
    },
    amount: {
        fontSize: 16,
        color: 'orange',
    },
    copy: {
        fontSize: 14,
        color: 'green',
        marginLeft: 10,
    },
    accountWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    account: {
        fontSize: 16,
        color: 'orange',
    },
    instructions: {
        marginBottom: 20,
    },
    subHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    step: {
        fontSize: 14,
        marginBottom: 10,
    },
    details: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    detailLabel: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    detailValue: {
        fontSize: 14,
        marginLeft: 10,
    },
    note: {
        fontSize: 14,
        marginTop: 10,
    },
    button: {
        backgroundColor: 'orange',
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    upload: {
        minWidth: 100,
        color: theme.colors.surface,
        fontWeight: 'bold',
        marginRight: 16,
    },
});

function FixedBankScreen({ navigation, route }) {
    const { totalAmount, id } = route.params;
    const [image, setImage] = useState(null);
    const [showInvalidUploadMessage, setShowInvalidUploadMessage] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleCloseInvalidUploadMessage = () => {
        setShowInvalidUploadMessage(false);
    };

    const handleSubmit = async () => {
        if (image == null) {
            setShowInvalidUploadMessage(true);
            return;
        }
        try {
            setLoading(true);
            const formData = new FormData();
            // The image may not have a name, the server requires the image to have enough information to be decoded
            formData.append('image', {
                uri: image.uri,
                name: image.filename ?? `avatar.${image.mimeType.split('/')[1]}`,
                type: image.mimeType,
            });

            const response = await (
                await authAPI()
            ).post(`${invoiceApis.invoice}${id}/payment/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 201) {
                ToastAndroid.showWithGravity('Thông tin đã gửi thành công', ToastAndroid.LONG, ToastAndroid.CENTER);
                navigation.navigate('InvoiceScreen');
            }

            console.log(response.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    console.log(route.params);
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Thông tin thanh toán</Text>
            <View style={styles.amountWrapper}>
                <Text style={styles.label}>Tổng Thanh Toán</Text>
                <Text style={styles.amount}>{totalAmount}đ</Text>
            </View>
            <View style={styles.accountWrapper}>
                <Text style={styles.label}>Số tài khoản định danh</Text>
                <Text style={styles.account}>OCA011055242229</Text>
            </View>
            <View style={styles.instructions}>
                <Text style={styles.subHeader}>Internet Banking</Text>
                <Text style={styles.step}>1. Mở ứng dụng Momo của bạn để tiến hành chuyển tiền.</Text>
                <Text style={styles.step}>2. Nhập chính xác các thông tin chuyển khoản:</Text>
                <View style={styles.details}>
                    <Text style={styles.detailLabel}>Số tài khoản:</Text>
                    <Text style={styles.detailValue}>SPE011055242229</Text>
                </View>
                <View style={styles.details}>
                    <Text style={styles.detailLabel}>Tên tài khoản:</Text>
                    <Text style={styles.detailValue}>OCEANVIEW</Text>
                </View>
                <View style={styles.details}>
                    <Text style={styles.detailLabel}>Ví điện tử:</Text>
                    <Text style={styles.detailValue}>MOMO</Text>
                </View>
                <Text style={styles.step}>3. Tiến hành Chuyển khoản.</Text>
                <Text style={styles.note}>
                    Sau khi thanh toán thành công, bạn vui lòng Upload ảnh uỷ nhiệm chi. Bạn sẽ nhận được Xác nhận đã
                    thanh toán tại mục Thông báo. Cập nhật thanh toán sau 2 phút, tối đa là 72 giờ.
                </Text>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 8,
                    marginBottom: 16,
                    flex: 1,
                }}
            >
                <ButtonPaper
                    mode="contained-tonal"
                    icon="file-upload-outline"
                    style={styles.upload}
                    onPress={() => handleUploadImage(setImage)}
                >
                    Ảnh uỷ nhiệm chi
                </ButtonPaper>
                {image ? (
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={{ uri: image.uri }}
                            style={{ width: 40, height: 40, borderColor: 'black', borderWidth: 1, marginRight: 16 }}
                        />
                        <AntDesign name="closecircleo" size={22} color="black" onPress={() => setImage()} />
                    </View>
                ) : (
                    ''
                )}
                {showInvalidUploadMessage && (
                    <MessageInvalid
                        message="Vui lòng tải ảnh đại diện để sử dụng hệ thống!"
                        onClose={handleCloseInvalidUploadMessage}
                    />
                )}
            </View>
            <ButtonPaper mode="contained" onPress={handleSubmit}>
                {loading ? <ActivityIndicator color={theme.colors.surface} /> : 'Xác nhận'}
            </ButtonPaper>
        </ScrollView>
    );
}

export default FixedBankScreen;
