import { StyleSheet, View, Modal } from 'react-native'; // WARN: Don't use Modal from react-native-paper 💀💀💀
import { Button, TextInput } from '~/components';
import theme from '~/core/theme';
import CheckBox from 'react-native-check-box';
// import handleUploadImage from '~/utils/image';

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
function ModalItem({ visible, onCancel, onSubmit, item, setItem, submitText }) {
    // TODO: Add image edit field
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

                <View style={{ flexDirection: 'row', justifyContent: 'start', alignItems: 'center' }}>
                    <Button
                        mode="contained-tonal"
                        icon="file-upload-outline"
                        style={styles.upload}
                        // onPress={() => handleUploadImage(setItemImage)} TODO: Handle pick image from here
                    >
                        Thay đổi ảnh món hàng
                    </Button>
                </View>

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
                        {submitText}
                    </Button>
                </View>
            </View>
        </Modal>
    );
}
export default ModalItem;
