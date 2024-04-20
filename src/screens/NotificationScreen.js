import { Text, View, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        resizeMode: 'contain',
        margin: 8,
    },
    contentWrapper: {
        flex: 1,
        margin: 8,
    },
    title: {
        fontSize: 16,
    },
    desc: {
        fontSize: 14,
        flexGrow: 1,
    },
});
export default function NotificationScreen() {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: 'https://randomuser.me/api/portraits/women/40.jpg' }} />
            <View style={styles.contentWrapper}>
                <Text style={styles.title}>Udate CCCD!</Text>
                <Text style={styles.desc} numberOfLines={2} ellipsizeMode="tail">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                    and scrambled it to make a type specimen book.
                </Text>
            </View>
        </View>
    );
}
