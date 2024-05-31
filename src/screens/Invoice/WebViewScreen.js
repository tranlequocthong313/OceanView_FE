import React from 'react';
import { WebView } from 'react-native-webview';
import { View, ActivityIndicator } from 'react-native';

export default function WebViewScreen({ route }) {
    const { dataPayment } = route.params;
    console.log(dataPayment);
    return (
        <WebView
            style={{ marginTop: 28 }}
            source={{
                uri: dataPayment.payment_url ? dataPayment.payment_url : dataPayment.pay_url,
            }}
            startInLoadingState
            renderLoading={() => (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#000" />
                </View>
            )}
        />
    );
}
