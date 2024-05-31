import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    TouchableHighlight,
    ToastAndroid,
} from 'react-native';
import { TextInput, Button, RadioButton } from 'react-native-paper';
import React, { useState } from 'react';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { authAPI, serviceApis } from '~/utils/api';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEEDEC',
        flex: 1,
    },
    wrapper: {
        margin: 12,
    },
    text: {
        color: '#fff',
    },
    note: {
        flex: 1,
        backgroundColor: '#573E26',
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 26,
        marginBottom: 12,
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
    RadioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
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

export default function RegisterParkingCardScreen({ navigation }) {
    const [vehicleType, setVehicleType] = useState('BICYCLE');
    const [licensePlates, setLicensePlates] = useState('AB28228');

    const [name, setName] = useState('Huỳnh Minh');
    const [CCCD, setCCCD] = useState('051204319194');
    const [homeTown, setHomeTown] = useState('Quảng Ninh');
    const [SDT, setSDT] = useState('0335198056');
    const [selectedButton, setSelectedButton] = useState(null);
    const [relationship, setRelationShip] = useState('Bạn');

    const [roomNumber, setRoomNumber] = useState('A-202');
    const [gender, setGender] = useState('MALE');
    const genders = ['MALE', 'FEMALE'];

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
            const numericValue = Number(text);
            const monthValue = Number(month);
            if (!Number.isNaN(numericValue) && numericValue >= 1) {
                if (monthValue === 2) {
                    const yearValue = Number(year);
                    const isLeapYear = (yearValue % 4 === 0 && yearValue % 100 !== 0) || yearValue % 400 === 0;

                    if (isLeapYear) {
                        if (numericValue >= 1 && numericValue <= 29) {
                            newValue = numericValue.toString();
                        } else {
                            return;
                        }
                    } else if (numericValue >= 1 && numericValue <= 28) {
                        newValue = numericValue.toString();
                    } else {
                        return;
                    }
                } else if ([4, 6, 9, 11].includes(monthValue)) {
                    if (numericValue >= 1 && numericValue <= 30) {
                        newValue = numericValue.toString();
                    } else {
                        return;
                    }
                } else if (numericValue >= 1 && numericValue <= 31) {
                    newValue = numericValue.toString();
                } else {
                    return;
                }
            } else {
                return;
            }
        } else if (field === 'month') {
            const numericValue = Number(text);
            if (!Number.isNaN(numericValue) && numericValue >= 1 && numericValue <= 12) {
                newValue = numericValue.toString();
            } else {
                return;
            }
        } else if (field === 'year') {
            const numericValue = Number(text);
            if (!Number.isNaN(numericValue)) {
                newValue = numericValue.toString();
            } else {
                return;
            }
        }

        if (field === 'day') {
            setDay(newValue);
        } else if (field === 'month') {
            setMonth(newValue);
        } else if (field === 'year') {
            setYear(newValue);
        }
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setDay(date.getDate().toString());
        setMonth((date.getMonth() + 1).toString());
        setYear(date.getFullYear().toString());
        hideDatePicker();
    };

    const handlePress = (buttonName) => {
        setSelectedButton(buttonName);
        setVehicleType(buttonName);
    };

    const validateFields = () => {
        if (
            !vehicleType ||
            !licensePlates ||
            !name ||
            !CCCD ||
            !homeTown ||
            !SDT ||
            !relationship ||
            !roomNumber ||
            !day ||
            !month ||
            !year
        ) {
            ToastAndroid.showWithGravity(
                'Please fill in all the required fields',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
            );
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        console.log('Submit successfully');
        console.log('relationship:', relationship);
        console.log('CCCD:', CCCD);
        console.log('SDT:', SDT);
        console.log('name:', name);
        console.log('date_of_birth:', `${year}-${month}-${day}`);
        console.log('homeTown:', homeTown);
        console.log('gender:', gender);
        console.log('room_number:', roomNumber);
        console.log('license_plate:', licensePlates);
        console.log('vehicle_type:', vehicleType);

        if (!validateFields()) {
            return;
        }

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
            vehicle: {
                license_plate: licensePlates,
                vehicle_type: vehicleType,
            },
            room_number: roomNumber,
        };

        try {
            const response = await (
                await authAPI()
            ).post(serviceApis.parkingCard, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                ToastAndroid.showWithGravity('Đăng ký thẻ ra vào thành công', ToastAndroid.LONG, ToastAndroid.CENTER);
                navigation.navigate('ListCard', { title: 'Danh sách thẻ đăng ký' });
            } else {
                ToastAndroid.showWithGravity('Đăng ký thẻ ra vào thất bại', ToastAndroid.LONG, ToastAndroid.CENTER);
            }
        } catch (error) {
            console.log(error);
            ToastAndroid.showWithGravity('Đã xảy ra lỗi, vui lòng thử lại', ToastAndroid.LONG, ToastAndroid.CENTER);
        }
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
                                        onPress={() => handlePress('CAR')}
                                        style={[styles.wrapType, selectedButton === 'CAR' && styles.selectedButton]}
                                        underlayColor="lightblue"
                                    >
                                        <View style={styles.viewWrap}>
                                            <Text style={styles.type}>Xe ô tô</Text>
                                            {selectedButton === 'CAR' && (
                                                <AntDesign name="check" size={20} color="green" />
                                            )}
                                        </View>
                                    </TouchableHighlight>

                                    <TouchableHighlight
                                        onPress={() => handlePress('MOTORBIKE')}
                                        style={[
                                            styles.wrapType,
                                            selectedButton === 'MOTORBIKE' && styles.selectedButton,
                                        ]}
                                        underlayColor="lightblue"
                                    >
                                        <View style={styles.viewWrap}>
                                            <Text style={styles.type}>Xe máy/ Xe máy điện</Text>
                                            {selectedButton === 'MOTORBIKE' && (
                                                <AntDesign name="check" size={20} color="green" />
                                            )}
                                        </View>
                                    </TouchableHighlight>
                                </View>
                                <TouchableHighlight
                                    onPress={() => handlePress('BICYCLE')}
                                    style={[styles.wrapType, selectedButton === 'BICYCLE' && styles.selectedButton]}
                                    underlayColor="lightblue"
                                >
                                    <View style={styles.viewWrap}>
                                        <Text style={styles.type}>Xe đạp/ Xe đạp điện</Text>
                                        {selectedButton === 'BICYCLE' && (
                                            <AntDesign name="check" size={20} color="green" />
                                        )}
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
                            <Text style={styles.title}>Số phòng</Text>

                            <TextInput
                                style={styles.input}
                                label="Số phòng"
                                value={roomNumber}
                                onChangeText={(text) => {
                                    setRoomNumber(text);
                                }}
                            />
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
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text>Giới tính: </Text>

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
                                label="Số điện thoại"
                                keyboardType="numeric"
                                maxLength={11}
                                value={SDT}
                                onChangeText={(text) => {
                                    setSDT(text);
                                }}
                            />
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
                            label="Mối quan hệ với chủ sở hữu"
                            value={relationship}
                            onChangeText={(text) => {
                                setRelationShip(text);
                            }}
                        />
                    </SafeAreaView>
                    <Button style={styles.submit} icon="arrow-right-circle" mode="contained" onPress={handleSubmit}>
                        Đăng ký
                    </Button>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
