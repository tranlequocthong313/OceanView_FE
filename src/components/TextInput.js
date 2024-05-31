import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ActivityIndicator, TextInput as Input } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import theme from '../core/theme';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: theme.colors.surface,
    },
    description: {
        fontSize: 13,
        color: theme.colors.secondary,
        paddingTop: 8,
    },
    error: {
        fontSize: 13,
        color: theme.colors.error,
        paddingTop: 8,
    },
    icon: {
        paddingHorizontal: 10,
    },
});

// TODO: Fix this clear text button
function TextInput({ errorText, description, loading, clearText, onClearText, ...props }) {
    return (
        <View style={styles.container}>
            <Input
                style={styles.input}
                selectionColor={theme.colors.primary}
                underlineColor="transparent"
                mode="outlined"
                {...props}
            />
            {loading && <ActivityIndicator style={styles.icon} />}
            {clearText && (
                <TouchableOpacity style={styles.icon} onPress={() => onClearText && onClearText()}>
                    <Ionicons name="close-circle-outline" size={24} color="gray" />
                </TouchableOpacity>
            )}
            {description && !errorText ? <Text style={styles.description}>{description}</Text> : null}
            {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
        </View>
    );
}

export default TextInput;
