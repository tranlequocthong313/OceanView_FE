import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    viewWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        borderStyle: 'solid',
    },
    titleWrap: {
        flexDirection: 'row',
    },
    text: {
        marginLeft: 6,
    },
});

export default function InfoView({ title, content, icon }) {
    return (
        <View style={styles.viewWrapper}>
            <View style={styles.titleWrap}>
                {icon}
                <Text style={styles.text}>{title}</Text>
            </View>
            <Text>{content}</Text>
        </View>
    );
}
