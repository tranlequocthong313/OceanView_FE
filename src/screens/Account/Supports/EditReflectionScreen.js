import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    ActivityIndicator,
    Alert,
    ToastAndroid,
    Image,
} from 'react-native';
import { authAPI, userApis } from '~/utils/api';
import { AntDesign } from '@expo/vector-icons';
import Button from '~/components/Button';
import { Button as ButtonPaper } from 'react-native-paper';
import formValidator from '~/helpers/formValidator';
import TextInput from '~/components/TextInput';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import theme from '~/core/theme';

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
    upload: {
        minWidth: 100,
        color: theme.colors.surface,
        fontWeight: 'bold',
        marginRight: 16,
    },
    submit: {
        margin: 8,
    },
});

export default function EditReflectionScreen({ navigation, route }) {
    const [title, setTitle] = useState({ value: '', error: '' });
    const [desc, setDesc] = useState({ value: '', error: '' });

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Thắc mắc', value: 'QUESTION' },
        { label: 'Yêu cầu hỗ trợ', value: 'SUPPORT' },
        { label: 'Phàn nàn', value: 'COMPLAIN' },
        { label: 'Khác', value: 'OTHER' },
    ]);

    const { id } = route.params;
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUploadImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permissions denied!');
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                quality: 1,
            });
            if (!result.canceled) setImage(result.assets[0]);
        }
    };

    const fetchReflectionData = useCallback(async () => {
        try {
            const response = await (await authAPI()).get(`${userApis.feedback}${id}/`);
            console.log(response.data);
            setTitle((prevState) => ({ ...prevState, value: response.data.title, error: '' }));
            setDesc((prevState) => ({ ...prevState, value: response.data.content, error: '' }));
            setImage({ uri: response.data.image });
            setValue(response.data.type);
        } catch (error) {
            console.log(error);
        }
    }, [id, setTitle, setDesc, setImage, setValue]);

    useEffect(() => {
        fetchReflectionData();
    }, [fetchReflectionData]);

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
            setLoading(true);

            const formData = new FormData();
            // The image may not have a name, the server requires the image to have enough information to be decoded
            formData.append('image', {
                uri: image.uri,
                name: image.filename ?? `avatar.${image.mimeType.split('/')[1]}`,
                type: image.mimeType,
            });
            formData.append('title', title.value);
            formData.append('content', desc.value);
            formData.append('type', value);

            const response = await (
                await authAPI()
            ).patch(
                `${userApis.feedback}${id}/`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
                //     {
                //     title: title.value,
                //     content: desc.value,
                //     type: value,
                // }
            );
            console.log(response.status);
            if (response.status === 200) {
                ToastAndroid.showWithGravity('Cập nhật phản ánh thành công', ToastAndroid.LONG, ToastAndroid.CENTER);
                navigation.navigate('Reflection');
            } else {
                ToastAndroid.showWithGravity('Vui lòng kiểm tra lại!', ToastAndroid.LONG, ToastAndroid.CENTER);
            }
            console.log('Response success:', response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
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
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: 16,
                            }}
                        >
                            <ButtonPaper
                                mode="contained-tonal"
                                icon="file-upload-outline"
                                style={styles.upload}
                                onPress={handleUploadImage}
                            >
                                Ảnh minh chứng
                            </ButtonPaper>
                            {image ? (
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Image
                                        source={{ uri: image.uri }}
                                        style={{
                                            width: 40,
                                            height: 40,
                                            borderColor: 'black',
                                            borderWidth: 1,
                                            marginRight: 16,
                                        }}
                                    />
                                    <AntDesign name="closecircleo" size={22} color="black" onPress={() => setImage()} />
                                </View>
                            ) : (
                                ''
                            )}
                        </View>
                        <Button mode="contained" onPress={handleSubmit}>
                            {loading ? <ActivityIndicator color={theme.colors.surface} /> : 'Cập nhật'}
                        </Button>
                    </SafeAreaView>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}
