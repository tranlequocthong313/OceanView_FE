import { useMemo, useReducer } from 'react';
import {
    NotificationContext,
    NotificationDispatchContext,
    NotificationAPIContext,
} from '~/contexts/NotificationContext';
import notificationReducer, {
    NOTIFICATION_ACTION_TYPE,
    initialNotificationState,
} from '~/reducers/notificationReducer';
import { authAPI, notificationApis } from '~/utils/api';
import { SCREEN_MAPPINGS } from '~/utils/constants';

export default function NotificationProvider({ children }) {
    const [notifications, dispatch] = useReducer(notificationReducer, initialNotificationState);

    const readNotification = async ({ notification, navigation }) => {
        if (!notification || !navigation) {
            console.error('params missing');
            return;
        }
        try {
            const r = await (
                await authAPI()
            ).post(notificationApis.readNotification, {
                content_id: notification.content.id,
            });
            if (r.status === 201) {
                dispatch({
                    type: NOTIFICATION_ACTION_TYPE.READ,
                    payload: { id: notification.id },
                });
                navigation.navigate(SCREEN_MAPPINGS[notification?.content?.entity_type], {
                    id: notification?.content?.entity_id,
                });
            }
            // TODO: handle case fail
        } catch (error) {
            console.error('READ Notification Failed:::', error);
        }
    };

    const apis = useMemo(() => ({ readNotification }), []);

    return (
        <NotificationContext.Provider value={notifications}>
            <NotificationDispatchContext.Provider value={dispatch}>
                <NotificationAPIContext.Provider value={apis}>{children}</NotificationAPIContext.Provider>
            </NotificationDispatchContext.Provider>
        </NotificationContext.Provider>
    );
}
