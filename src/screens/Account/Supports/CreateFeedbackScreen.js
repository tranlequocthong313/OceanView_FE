import { useState } from 'react';
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
import { authAPI, feedbackApis } from '~/utils/api';
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

export default function CreateFeedbackScreen({ navigation }) {
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
            if (!result.canceled) {
                setImage(result.assets[0]);
            }
        }
    };

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

            // Kiểm tra nếu image không null thì thêm vào form data
            if (image !== null) {
                formData.append('image', {
                    uri: image.uri,
                    name: image.filename ?? `avatar.${image.mimeType.split('/')[1]}`,
                    type: image.mimeType,
                });
            } else {
                // Nếu image là null, thêm null vào form data
                formData.append('image', null);
            }

            formData.append('title', title.value);
            formData.append('content', desc.value);
            formData.append('type', value);

            const response = await (
                await authAPI()
            ).post(feedbackApis.feedbackPost, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                ToastAndroid.showWithGravity('Đã tạo phản ánh thành công', ToastAndroid.LONG, ToastAndroid.CENTER);
                navigation.navigate('Feedback');
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
                                        source={{ uri: image ? image.uri : null }}
                                        style={{
                                            width: 40,
                                            height: 40,
                                            borderColor: 'black',
                                            borderWidth: 1,
                                            marginRight: 16,
                                        }}
                                    />
                                    <AntDesign
                                        name="closecircleo"
                                        size={22}
                                        color="black"
                                        onPress={() => setImage(null)}
                                    />
                                </View>
                            ) : (
                                ''
                            )}
                        </View>
                        <Button mode="contained" onPress={handleSubmit}>
                            {loading ? <ActivityIndicator color={theme.colors.surface} /> : 'Hoàn tất'}
                        </Button>
                    </SafeAreaView>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}
