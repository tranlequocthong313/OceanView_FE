import { AntDesign } from '@expo/vector-icons';
import { Image, Modal, StyleSheet, View } from 'react-native'; // WARN: Don't use Modal from react-native-paper 💀💀💀
import CheckBox from 'react-native-check-box';
import { ActivityIndicator } from 'react-native-paper';
import { Button, TextInput } from '~/components';
import theme from '~/core/theme';
import handleUploadImage from '~/utils/image';

const styles = StyleSheet.create({
    checkbox: {
        margin: 12,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    itemContainer: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemText: {
        fontSize: 16,
        marginBottom: 5,
    },
    modalContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
    },
    button: {
        width: '45%',
        marginHorizontal: 8,
    },
    upload: {
        minWidth: 100,
        color: theme.colors.primary,
        fontWeight: 'bold',
        marginRight: 16,
    },
});

// TODO: CSS for this component looks better
function ModalItem({ visible, onCancel, onSubmit, item, setItem, submitText, loading = false }) {
    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.modalContainer}>
                <TextInput
                    placeholder="Tên món hàng"
                    onChangeText={(text) => setItem({ ...item, name: text })}
                    value={item?.name}
                />
                <TextInput
                    placeholder="Số lượng"
                    onChangeText={(text) => setItem({ ...item, quantity: text })}
                    value={String(item?.quantity)}
                    keyboardType="numeric"
                />

                <View>
                    <Button
                        mode="contained-tonal"
                        icon="file-upload-outline"
                        style={styles.upload}
                        onPress={() => handleUploadImage((image) => setItem({ ...item, image }))}
                    >
                        Ảnh món hàng
                    </Button>
                </View>

                {item?.image && (
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={{ uri: item.image?.uri ?? item.image }}
                            style={{ width: 60, height: 60, borderColor: 'black', borderWidth: 1 }}
                        />
                        <AntDesign name="closecircleo" size={22} color="black" onPress={() => setItem({ ...item, image: null })} />
                    </View>
                )}

                <CheckBox
                    onClick={() =>
                        setItem((prev) => ({
                            ...prev,
                            status: prev.status === 'RECEIVED' ? 'NOT_RECEIVED' : 'RECEIVED',
                        }))
                    }
                    isChecked={item?.status === 'RECEIVED'}
                    leftText="Đã nhận hàng"
                    style={styles.checkbox}
                />

                <View style={styles.buttons}>
                    <Button
                        style={{ ...styles.button, backgroundColor: theme.colors.secondary }}
                        mode="contained"
                        onPress={onCancel}
                    >
                        Hủy
                    </Button>
                    <Button style={styles.button} mode="contained" onPress={onSubmit}>
                        {loading ? <ActivityIndicator color={theme.colors.surface} /> : submitText}
                    </Button>
                </View>
            </View>
        </Modal>
    );
}
export default ModalItem;
