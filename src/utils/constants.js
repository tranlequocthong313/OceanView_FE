const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const FCM_TOKEN_KEY = 'fcmToken';

const SCREEN_MAPPINGS = {
    INVOICE_CREATE: 'DetailsInvoice',
    SERVICE_APPROVED: 'ListCard',
    SERVICE_REJECTED: 'ListCard',
    REISSUE_APPROVED: 'ListCard',
    REISSUE_REJECTED: 'ListCard',
    LOCKER_ITEM_ADD: 'LockerDetailScreen',
    NEWS_POST: 'DetailsNewScreen',
    CHAT_SEND_MESSAGE: 'Chat',
};

export { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, FCM_TOKEN_KEY, SCREEN_MAPPINGS };
