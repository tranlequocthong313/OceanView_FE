import { SafeAreaView, Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import { TextInput, RadioButton, Button } from 'react-native-paper';
import { authAPI, serviceApis } from '~/utils/api';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEEDEC',
        flex: 1,
    },
    wrapper: {
        marginHorizontal: 12,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: '500',
        fontSize: 16,
    },
    note: {
        marginVertical: 12,
        flex: 1,
        backgroundColor: '#573E26',
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },
    textNote: {
        color: '#fff',
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

    RadioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    viewWrap: {
        flexDirection: 'row',
    },
    submit: {
        margin: 8,
    },
});

export default function RegisterAccessCardScreen({ navigation }) {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('MALE');
    const genders = ['MALE', 'FEMALE'];
    const [relationship, setRelationShip] = useState('');

    const [CCCD, setCCCD] = useState('');
    const [homeTown, setHomeTown] = useState('');
    const [SDT, setSDT] = useState('');

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
            const numericValue = Number(text);
            const monthValue = Number(month);
            if (!Number.isNaN(numericValue) && numericValue >= 1) {
                if (monthValue === 2) {
                    // Kiểm tra năm nhuận
                    const yearValue = Number(year);
                    const isLeapYear = (yearValue % 4 === 0 && yearValue % 100 !== 0) || yearValue % 400 === 0;

                    if (isLeapYear) {
                        // Tháng 2 có 29 ngày trong năm nhuận
                        if (numericValue >= 1 && numericValue <= 29) {
                            newValue = numericValue.toString();
                        } else {
                            return;
                        }
                    }
                    // Tháng 2 có 28 ngày trong năm không nhuận
                    else if (numericValue >= 1 && numericValue <= 28) {
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
            const numericValue = Number(text);
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

    const handleSubmit = async () => {
        try {
            const requestData = {
                relative: {
                    relationship,
                    personal_information: {
                        citizen_id: CCCD,
                        phone_number: SDT,
                        full_name: name,
                        date_of_birth: `${year}-${month}-${day}`,
                        hometown: homeTown,
                        gender,
                    },
                },
            };

            const response = await (
                await authAPI()
            ).post(serviceApis.accessCard, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            ToastAndroid.showWithGravity('Đăng ký thẻ ra vào thành công', ToastAndroid.LONG, ToastAndroid.CENTER);
            navigation.navigate('ListCard');
            console.log('Response success:', response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <KeyboardAvoidingView>
            <ScrollView>
                <View style={styles.container}>
                    <SafeAreaView style={styles.wrapper}>
                        <View style={styles.note}>
                            <Text style={styles.textNote}>Thông tin người được đăng ký</Text>
                        </View>
                        <Text style={styles.title}>Đăng ký cấp phát tài khoản cho người thân </Text>

                        <TextInput
                            style={styles.input}
                            label="Họ và tên"
                            autoCapitalize="words"
                            value={name}
                            onChangeText={(text) => {
                                setName(text);
                            }}
                        />

                        <View>
                            <Text>Ngày sinh: </Text>
                            <View>
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
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.text}>Giới tính: </Text>

                            {/* Nút Radio */}
                            {genders.map((g) => (
                                <View key={g} style={styles.RadioButton}>
                                    <RadioButton
                                        value={g}
                                        status={gender === g ? 'checked' : 'unchecked'}
                                        onPress={() => setGender(g)}
                                    />
                                    <Text>{g}</Text>
                                </View>
                            ))}
                        </View>
                        <TextInput
                            style={styles.input}
                            label="Số CCCD"
                            keyboardType="numeric"
                            maxLength={12}
                            value={CCCD}
                            onChangeText={(text) => {
                                setCCCD(text);
                            }}
                        />
                        <TextInput
                            style={styles.input}
                            label="Quê quán"
                            value={homeTown}
                            onChangeText={(text) => {
                                setHomeTown(text);
                            }}
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

                        <TextInput
                            style={styles.input}
                            label="Mối quan hệ với chủ sở hữu"
                            value={relationship}
                            onChangeText={(text) => {
                                setRelationShip(text);
                            }}
                        />
                    </SafeAreaView>
                </View>
                <Button style={styles.submit} icon="arrow-right-circle" mode="contained" onPress={handleSubmit}>
                    Đăng ký
                </Button>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
