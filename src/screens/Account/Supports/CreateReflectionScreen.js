import { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import Button from '~/components/Button';
import formValidator from '~/helpers/formValidator';
import TextInput from '~/components/TextInput';
import DropDownPicker from 'react-native-dropdown-picker';
import API, { endpoints } from '../../../configs/API';

const styles = StyleSheet.create({
    container: {
        margin: 12,
    },
    wrapper: {
        marginTop: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    titleName: {
        fontWeight: '500',
        fontSize: 16,
        marginVertical: 8,
    },
    input: {
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 8,
    },
    inputDesc: {
        borderWidth: 1,
        borderRadius: 4,
        paddingTop: 16,
    },

    submit: {
        margin: 8,
    },
});

export default function CreateReflectionScreen({ navigation }) {
    const [title, setTitle] = useState({ value: '', error: '' });
    const [desc, setDesc] = useState({ value: '', error: '' });

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Thắc mắc', value: 'question' },
        { label: 'Yêu cầu hỗ trợ', value: 'support' },
        { label: 'Phàn nàn', value: 'complaint' },
    ]);

    const handleSubmit = async () => {
        const titleError = formValidator(title.value, 'Title');
        const descError = formValidator(desc.value, 'Description');

        if (value === null) {
            Alert.alert('Lỗi', 'Vui lòng chọn một mục trong nhóm phản ánh trước khi tạo!');
            return;
        }

        if (titleError || descError) {
            setTitle({ ...title, error: titleError });
            setDesc({ ...desc, error: descError });

            return;
        }
        try {
            const token = await AsyncStorage.getItem('accessToken');
            console.log(token);

            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const response = await API.post(endpoints.reflection, {
                type: items.value,
                title: title.value,
                desc: desc.value,
                headers
            });

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <KeyboardAvoidingView>
            <View style={styles.container}>
                <Text style={styles.titleName}>Nhóm phản ánh </Text>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder="-----Chọn-----"
                />

                <ScrollView>
                    <SafeAreaView style={styles.wrapper}>
                        <Text style={styles.titleName}>Nhập tiêu đề </Text>

                        <TextInput
                            style={styles.input}
                            autoCapitalize="words"
                            value={title.value}
                            onChangeText={(text) => {
                                setTitle({ ...title, value: text });
                            }}
                            error={!!title.error}
                            errorText={title.error}
                        />

                        <Text style={styles.titleName}>Nhập nội dung của bạn </Text>

                        <TextInput
                            multiline
                            numberOfLines={6}
                            style={styles.inputDesc}
                            autoCapitalize="words"
                            value={desc.value}
                            onChangeText={(text) => {
                                setDesc({ ...desc, value: text });
                            }}
                            error={!!desc.error}
                            errorText={desc.error}
                        />
                        <Button icon="arrow-right-circle" mode="contained" onPress={handleSubmit}>
                            Tạo
                        </Button>
                    </SafeAreaView>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}
