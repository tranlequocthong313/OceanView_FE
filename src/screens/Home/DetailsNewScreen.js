import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { authAPI, newApis } from '~/utils/api';

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 12,
        flex: 1,
    },
    text: {
        fontSize: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        marginVertical: 12,
    },
    image: {
        width: Dimensions.get('window').width - 24,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 4,
        marginBottom: 12,
    },
});

const screenWidth = Dimensions.get('window').width - 24;

export default function DetailsNewScreen({ route }) {
    const { id, category } = route.params;
    const [news, setNews] = useState(null);

    const fetchNewData = useCallback(async () => {
        try {
            const response = await (
                await authAPI()
            ).get(category ? newApis.getNewsByCategory(category, id) : newApis.getANews(id));
            console.log('response: ', response.data);
            setNews(response.data);
        } catch (error) {
            console.error('Failed to fetch category data:', error);
        }
    }, [category, id]);

    useEffect(() => {
        fetchNewData();
    }, [fetchNewData]);

    const tagsStyles = {
        p: {
            display: 'block',
            fontSize: 16,
            color: 'black',
            marginBottom: 10,
            backgroundColor: '#fff',
            padding: 8,
        },
    };

    const renderersProps = {
        root: {
            style: {
                backgroundColor: 'white',
                paddingHorizontal: 12,
            },
        },
    };

    return (
        <ScrollView style={styles.container}>
            {news ? (
                <View>
                    <Text style={styles.title}>{news.title}</Text>
                    <Image source={{ uri: news.thumbnail }} style={styles.image} />
                    <RenderHtml
                        contentWidth={screenWidth}
                        source={{ html: news.content }}
                        tagsStyles={tagsStyles}
                        renderersProps={renderersProps}
                    />
                </View>
            ) : (
                <Text style={styles.text}>Loading...</Text>
            )}
        </ScrollView>
    );
}
