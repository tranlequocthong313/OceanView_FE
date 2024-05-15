import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
    Modal,
    FlatList,
    Image,
    RefreshControl,
    Alert,
} from 'react-native';
import { authAPI, invoiceApis } from '~/utils/api';
import { Invoice, SubmitButton } from '~/components';
import { AntDesign } from '@expo/vector-icons';
import momo from '~/assets/momo.png';
import vnpay from '~/assets/vnpay.png';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        margin: 12,
    },
    wrapHeader: {
        marginVertical: 12,
    },
    title: {
        fontWeight: '500',
        fontSize: 16,
        marginRight: 8,
    },
    id: {
        fontWeight: '500',
        fontSize: 16,
    },
    wrapInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
    },
    wrapPayment: {
        marginTop: 12,
    },
    textPayment: {
        marginBottom: 8,
        fontWeight: '500',
        fontSize: 16,
    },
    total: {
        marginVertical: 8,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 12,
        alignItems: 'center',
    },
    money: {
        color: '#D3552F',
        fontWeight: '500',
        fontSize: 20,
    },
    dropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    placeholderText: {
        flex: 1,
        color: '#999',
    },
    selectedMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    methodText: {
        marginLeft: 10,
        fontSize: 16,
    },
    icon: {
        width: 24,
        height: 24,
    },
    modalContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền semi-transparent
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
    },
    methodOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

const paymentMethods = [
    { id: 'momo', title: 'Momo', icon: momo },
    { id: 'vnpay', title: 'VNPAY', icon: vnpay },
];

export default function DetailsInvoiceScreen({ navigation, route }) {
    const { id } = route.params;
    const [isLoading, setIsLoading] = useState(true);
    const [detailInvoices, setDetailInvoices] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [dataPayment, setDataPayment] = useState({});

    const selectMethod = (method) => {
        setSelectedMethod(method);
        setModalVisible(false);
    };

    const fetchInvoiceData = useCallback(async () => {
        try {
            const response = await (await authAPI()).get(`${invoiceApis.invoice}${id}/`);
            setDetailInvoices(response.data);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    }, [id]);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchInvoiceData();
        setRefreshing(false);
    };

    useEffect(() => {
        fetchInvoiceData();
    }, [fetchInvoiceData]);

    // const dataPaymentHandler = () => {
    //     if (dataPayment && selectedMethod) {
    //         navigation.navigate('WebViewScreen', {
    //             dataPayment,
    //             selectedMethodId: selectedMethod.id,
    //         });
    //     }
    // };
    // useEffect(() => {
    //     dataPaymentHandler();
    // }, [dataPayment]);

    

    const handlePayment = async () => {
        if (!selectedMethod) {
            Alert.alert('Thông báo', 'Vui lòng chọn hình thức thanh toán trước khi tiến hành thanh toán.');
            return;
        }

        try {
            const response = await (await authAPI()).post(`${invoiceApis.invoice}${id}/payment/${selectedMethod.id}/`);
            setDataPayment(response.data);
            
                
        } catch (err) {
            console.log(err);
        }
        if (Object.keys(dataPayment).length > 0) {
            navigation.navigate('WebViewScreen', {
                dataPayment,
            });
        }
    };

    const handleSelectMethod = (item) => {
        selectMethod(item);
    };
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    if (!detailInvoices) {
        return (
            <View style={styles.container}>
                <Text>Không có dữ liệu chi tiết hoá đơn</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.wrapper}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View style={styles.wrapHeader}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text style={styles.title}>Thông tin hoá đơn</Text>
                        <Text style={styles.id}>{detailInvoices.id}</Text>
                    </View>

                    <View style={styles.wrapInfo}>
                        <Text style={styles.title}>Ngày tạo:</Text>
                        <Text>{new Date(detailInvoices.created_date).toLocaleString()}</Text>
                    </View>
                </View>
                {Array.isArray(detailInvoices.invoicedetail_set) && detailInvoices.invoicedetail_set.length > 0 ? (
                    detailInvoices.invoicedetail_set.map((item) => (
                        <Invoice
                            key={item.service_name}
                            name={item.service_name}
                            status={detailInvoices.status}
                            amount={item.amount}
                        />
                    ))
                ) : (
                    <Text>Không có chi tiết dịch vụ.</Text>
                )}
                {detailInvoices.status !== 'PAID' ? (
                    <View style={styles.wrapPayment}>
                        <Text style={styles.textPayment}>Hình thức thanh toán</Text>
                        <TouchableOpacity style={styles.dropdown} onPress={() => setModalVisible(true)}>
                            {selectedMethod ? (
                                <View style={styles.selectedMethod}>
                                    <Image source={selectedMethod.icon} style={styles.icon} />
                                    <Text style={styles.methodText}>{selectedMethod.title}</Text>
                                </View>
                            ) : (
                                <Text style={styles.placeholderText}>Chọn hình thức thanh toán</Text>
                            )}
                            {modalVisible ? (
                                <AntDesign name="caretdown" size={18} color="black" />
                            ) : (
                                <AntDesign name="caretright" size={18} color="black" />
                            )}
                        </TouchableOpacity>

                        <Modal
                            transparent
                            animationType="slide"
                            visible={modalVisible}
                            onRequestClose={() => setModalVisible(false)}
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <FlatList
                                        data={paymentMethods}
                                        keyExtractor={(item) => item.id}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                style={styles.methodOption}
                                                onPress={() => handleSelectMethod(item)}
                                            >
                                                <Image source={item.icon} style={styles.icon} />
                                                <Text style={styles.methodText}>{item.title}</Text>
                                            </TouchableOpacity>
                                        )}
                                    />
                                    <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                                        <Text style={styles.closeButtonText}>Đóng</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>
                ) : null}
            </ScrollView>
            {detailInvoices.status !== 'PAID' ? (
                <View style={styles.footer}>
                    <View style={styles.total}>
                        <Text style={styles.title}>Tổng tiền:</Text>
                        <Text style={styles.money}>{detailInvoices.total_amount}đ</Text>
                    </View>
                    <SubmitButton title="Thanh toán" onPress={handlePayment} />
                </View>
            ) : null}
        </View>
    );
}
