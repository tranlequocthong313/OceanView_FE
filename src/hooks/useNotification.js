import { useContext } from 'react';
import {
    NotificationAPIContext,
    NotificationContext,
    NotificationDispatchContext,
} from '~/contexts/NotificationContext';

export function useNotification() {
    return useContext(NotificationContext);
}

export function useNotificationDispatch() {
    return useContext(NotificationDispatchContext);
}

export function useNotificationAPI() {
    return useContext(NotificationAPIContext);
}
