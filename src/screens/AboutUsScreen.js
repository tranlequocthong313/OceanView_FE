import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    title: {
        paddingTop: 16,
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: '500',
        paddingBottom: 8,
    },
    text: {
        paddingBottom: 20,
    },
    version: {
        fontWeight: '500',
        fontSize: 18,
        marginBottom: 4,
    },
    textVersion: {
        fontStyle: 'italic',
    },
});
function AboutUsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Về chung cư OceanView</Text>
            <Text style={styles.text}>
                {/* {'\u2003'} */}
                Chung cư OceanView nằm bên bờ biển, là biểu tượng của sự hiện đại và đẳng cấp. Với hơn 20 năm kinh
                nghiệm trong ngành xây dựng, dự án được hình thành từ sứ mệnh mang lại không gian sống lý tưởng cho cư
                dân, kết hợp với vẻ đẹp tự nhiên của biển cả. OceanView là sự lựa chọn hàng đầu cho những ai tìm kiếm
                cuộc sống đích thực bên bờ biển.
            </Text>
            <Text style={styles.version}>Version</Text>
            <Text>3.108.3 (24040200)</Text>
            <Text style={styles.textVersion}>2e2cd8f7-fa52-40c1-aeb2-ffab54750bc4</Text>
        </View>
    );
}

export default AboutUsScreen;
