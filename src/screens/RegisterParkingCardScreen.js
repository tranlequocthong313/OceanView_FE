import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    TouchableHighlight,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import React, { useState } from 'react';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEEDEC',
        flex: 1,
    },
    wrapper: {
        margin: 12,
    },
    note: {
        flex: 1,
        backgroundColor: '#573E26',
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },
    text: {
        color: '#fff',
    },
    title: {
        fontWeight: '500',
        marginTop: 12,
        marginBottom: 26,
    },
    containerType: {
        flexDirection: 'row',
    },

    wrapType: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#573E26',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        margin: 4,
        width: 'calc(50% - 8px)',
        flex: 1,
    },
    type: {
        color: '#000',
    },
    selectedButton: {
        backgroundColor: 'lightblue',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dmy: {
        borderWidth: 1,
        borderRadius: 4,
        flexGrow: 1,
        margin: 12,
        height: 40,
    },
    input: {
        marginVertical: 12,
        borderWidth: 1,
        borderRadius: 4,
        flexGrow: 1,
    },
    viewWrap: {
        flexDirection: 'row',
    },
    submit: {
        margin: 8,
    },
});

export default function RegisterParkingCarScreen() {
    const [vehicleType, setVehicleType] = useState('');
    const [licensePlates, setLicensePlates] = useState('');

    const [name, setName] = useState('');

    // const [CCCD, setCCCD] = useState('');
    const [SDT, setSDT] = useState('');
    const [selectedButton, setSelectedButton] = useState(null);

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const handleInputChange = (text, field) => {
        let newValue = text;

        if (!text || text === '') {
            if (field === 'day') {
                setDay('');
            }
            if (field === 'month') {
                setMonth('');
            }
            if (field === 'year') {
                setYear('');
            }
            return;
        }
        // Xử lý ngày
        if (field === 'day') {
            // Kiểm tra xem giá trị nhập vào có phải là số từ 1 đến 31 không
            const numericValue = Number.Number(text);
            const monthValue = Number.Number(month);
            if (!Number.isNaN(numericValue) && numericValue >= 1) {
                if (monthValue === 2) {
                    // Kiểm tra năm nhuận
                    const yearValue = Number.Number(year);
                    const isLeapYear = (yearValue % 4 === 0 && yearValue % 100 !== 0) || yearValue % 400 === 0;

                    if (isLeapYear) {
                        // Tháng 2 có 29 ngày trong năm nhuận
                        if (numericValue >= 1 && numericValue <= 29) {
                            newValue = numericValue.toString();
                        } else {
                            return;
                        }
                    } else if (numericValue >= 1 && numericValue <= 28) {
                        // Tháng 2 có 28 ngày trong năm không nhuận

                        newValue = numericValue.toString();
                    } else {
                        return;
                    }
                } else if ([4, 6, 9, 11].includes(monthValue)) {
                    // Tháng có 30 ngày
                    if (numericValue >= 1 && numericValue <= 30) {
                        newValue = numericValue.toString();
                    } else {
                        return;
                    }
                }
                // Các tháng còn lại có 31 ngày
                else if (numericValue >= 1 && numericValue <= 31) {
                    newValue = numericValue.toString();
                } else {
                    return;
                }
            } else {
                return;
            }
        }
        // Xử lý tháng
        else if (field === 'month') {
            // Kiểm tra xem giá trị nhập vào có phải là số từ 1 đến 12 không
            const numericValue = Number.Number(text);
            if (!Number.isNaN(numericValue) && numericValue >= 1 && numericValue <= 12) {
                newValue = numericValue.toString();
            } else {
                return;
            }
        }
        // Xử lý năm
        else if (field === 'year') {
            // Tương tự, kiểm tra xem giá trị nhập vào có phải là số không
            // Trong ví dụ này, tôi không thêm ràng buộc về giới hạn của năm
            const numericValue = Number(text);
            if (!Number.isNaN(numericValue)) {
                newValue = numericValue.toString();
            } else {
                return;
            }
        }

        // Nếu giá trị hợp lệ, cập nhật state tương ứng
        if (field === 'day') {
            setDay(newValue);
            console.log(text);
        } else if (field === 'month') {
            setMonth(newValue);
            console.log(text);
        } else if (field === 'year') {
            setYear(newValue);
            console.log(text);
        }
    };
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.log(date);
        setDay(date.getDate().toString());
        setMonth((date.getMonth() + 1).toString());
        setYear(date.getFullYear().toString());
        hideDatePicker();
    };

    const handlePress = (buttonName) => {
        setSelectedButton(buttonName);
        setVehicleType(buttonName);
        console.log(buttonName);
    };

    const handleSubmit = () => {
        fetch('https://example.com/api/registerParkingCar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                vehicleType,
                licensePlates,
                name,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Response:', data);
                // Xử lý dữ liệu phản hồi từ máy chủ nếu cần
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    return (
        <KeyboardAvoidingView>
            <ScrollView>
                <View style={styles.container}>
                    <SafeAreaView style={styles.wrapper}>
                        <View style={styles.note}>
                            <Text style={styles.text}>Thông tin này sẽ được sử dụng khi đăng ký</Text>
                        </View>

                        <View style={styles.viewInfoVehicle}>
                            <View style={styles.viewTypeVehicle}>
                                <Text style={styles.title}>Thông tin phương tiện</Text>

                                <View style={styles.containerType}>
                                    <TouchableHighlight
                                        onPress={() => handlePress('c')}
                                        style={[styles.wrapType, selectedButton === 'c' && styles.selectedButton]}
                                        underlayColor="lightblue"
                                    >
                                        <View style={styles.viewWrap}>
                                            <Text style={styles.type}>Xe ô tô</Text>
                                            {selectedButton === 'c' && (
                                                <AntDesign name="check" size={20} color="green" />
                                            )}
                                        </View>
                                    </TouchableHighlight>

                                    <TouchableHighlight
                                        onPress={() => handlePress('m')}
                                        style={[styles.wrapType, selectedButton === 'm' && styles.selectedButton]}
                                        underlayColor="lightblue"
                                    >
                                        <View style={styles.viewWrap}>
                                            <Text style={styles.type}>Xe máy/ Xe máy điện</Text>
                                            {selectedButton === 'm' && (
                                                <AntDesign name="check" size={20} color="green" />
                                            )}
                                        </View>
                                    </TouchableHighlight>
                                </View>
                                <TouchableHighlight
                                    onPress={() => handlePress('b')}
                                    style={[styles.wrapType, selectedButton === 'b' && styles.selectedButton]}
                                    underlayColor="lightblue"
                                >
                                    <View style={styles.viewWrap}>
                                        <Text style={styles.type}>Xe đạp/ Xe đạp điện</Text>
                                        {selectedButton === 'b' && <AntDesign name="check" size={20} color="green" />}
                                    </View>
                                </TouchableHighlight>
                            </View>

                            <TextInput
                                style={styles.input}
                                label="Biển số xe"
                                value={licensePlates}
                                onChangeText={(lp) => {
                                    setLicensePlates(lp);
                                }}
                            />
                        </View>

                        <View style={styles.viewInfoOwner}>
                            <Text style={styles.title}>Thông tin chủ xe</Text>
                            <TextInput
                                style={styles.input}
                                label="Họ và tên"
                                value={name}
                                onChangeText={(text) => {
                                    setName(text);
                                }}
                            />

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.dmy}
                                    placeholder="dd"
                                    value={day}
                                    onChangeText={(text) => handleInputChange(text, 'day')}
                                    keyboardType="numeric"
                                    maxLength={2}
                                />
                                <Text>/</Text>
                                <TextInput
                                    style={styles.dmy}
                                    placeholder="mm"
                                    value={month}
                                    onChangeText={(text) => handleInputChange(text, 'month')}
                                    keyboardType="numeric"
                                    maxLength={2}
                                />
                                <Text>/</Text>
                                <TextInput
                                    style={styles.dmy}
                                    placeholder="yyyy"
                                    value={year}
                                    onChangeText={(text) => handleInputChange(text, 'year')}
                                    keyboardType="numeric"
                                    maxLength={4}
                                />
                                <FontAwesome
                                    name="calendar-o"
                                    size={28}
                                    color="black"
                                    onPress={showDatePicker}
                                    style={{ paddingHorizontal: 10 }}
                                />
                            </View>
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                            />

                            <TextInput
                                style={styles.input}
                                label="Số điện thoại"
                                keyboardType="numeric"
                                maxLength={11}
                                value={SDT}
                                onChangeText={(text) => {
                                    setSDT(text);
                                }}
                            />
                        </View>
                    </SafeAreaView>
                    <Button style={styles.submit} icon="arrow-right-circle" mode="contained" onPress={handleSubmit}>
                        Đăng ký
                    </Button>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
