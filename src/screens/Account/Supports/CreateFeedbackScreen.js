import { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import Button from '~/components/Button';
import formValidator from '~/helpers/formValidator';
import TextInput from '~/components/TextInput';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI, feedbackApis } from '~/utils/api';

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

// TODO: Add image field
export default function CreateFeedbackScreen() {
    const [title, setTitle] = useState({ value: '', error: '' });
    const [content, setContent] = useState({ value: '', error: '' });

    const [open, setOpen] = useState(false);
    const [type, setType] = useState(null);
    const [types, setTypes] = useState([
        { label: 'Thắc mắc', value: 'QUESTION' },
        { label: 'Yêu cầu hỗ trợ', value: 'SUPPORT' },
        { label: 'Phàn nàn', value: 'COMPLAIN' },
        { label: 'Khác', value: 'OTHER' },
    ]);

    const handleSubmit = async () => {
        const titleError = formValidator(title.value, 'Title');
        const descError = formValidator(content.value, 'Description');

        if (type === null) {
            Alert.alert('Lỗi', 'Vui lòng chọn một mục trong nhóm phản ánh trước khi tạo!');
            return;
        }

        if (titleError || descError) {
            setTitle({ ...title, error: titleError });
            setContent({ ...content, error: descError });

            return;
        }
        try {
            // TODO: Can we send the access token in just one place? Keep it simple and Don't repeat yourself
            const token = await AsyncStorage.getItem('accessToken');
            console.log(token);

            const headers = {
                Authorization: `Bearer ${token}`,
            };

            // TODO: Add image
            const response = await (
                await authAPI()
            ).post(
                feedbackApis.feedbackPost,
                {
                    type,
                    title: title.value,
                    content: content.value,
                },
                headers,
            );

            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <KeyboardAvoidingView>
            <View style={styles.container}>
                <Text style={styles.titleName}>Loại phản ánh </Text>
                <DropDownPicker
                    open={open}
                    value={type}
                    items={types}
                    setOpen={setOpen}
                    setValue={setType}
                    setItems={setTypes}
                    placeholder="-----Chọn-----"
                />

                <ScrollView>
                    <SafeAreaView style={styles.wrapper}>
                        <Text style={styles.titleName}>Nhập tiêu đề </Text>

                        <TextInput
                            style={styles.input}
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
                            value={content.value}
                            onChangeText={(text) => {
                                setContent({ ...content, value: text });
                            }}
                            error={!!content.error}
                            errorText={content.error}
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
