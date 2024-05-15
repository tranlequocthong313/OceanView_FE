import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreateFeedbackScreen, EditFeedbackScreen, HistoryFeedbackScreen } from '~/screens';

const FeedbackStack = createNativeStackNavigator();

export default function FeedbackStackNav() {
    return (
        <FeedbackStack.Navigator initialRouteName="Feedback" screenOptions={{ headerShown: false }}>
            <FeedbackStack.Screen
                name="Feedback"
                component={HistoryFeedbackScreen}
                options={{
                    title: 'Danh sách phản ánh',
                }}
            />

            <FeedbackStack.Screen
                name="CreateFeedback"
                component={CreateFeedbackScreen}
                options={{
                    title: 'Tạo phản ánh mới',
                }}
            />
            <FeedbackStack.Screen
                name="EditFeedback"
                component={EditFeedbackScreen}
                options={{
                    title: 'Chỉnh sửa phản ánh',
                }}
            />
        </FeedbackStack.Navigator>
    );
}
