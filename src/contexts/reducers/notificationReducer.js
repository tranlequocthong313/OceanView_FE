export const NOTIFICATION_ACTION_TYPE = {
    ON_CLICK: 0,
    ADD: 1,
    READ: 2,
};

export const SCREEN_MAPPINGS = {
    INVOICE_CREATE: 'DetailsInvoice',
    SERVICE_APPROVED: 'ListCard',
    SERVICE_REJECTED: 'ListCard',
    REISSUE_APPROVED: 'ListCard',
    REISSUE_REJECTED: 'ListCard',
    LOCKER_ITEM_ADD: 'LockerDetailScreen',
    // "NEWS_POST": "invoice", # TODO: Implement for news
};

function notificationReducer(state, action) {
    switch (action.type) {
        case NOTIFICATION_ACTION_TYPE.ON_CLICK:
            return action.payload;
        case NOTIFICATION_ACTION_TYPE.ADD:
            return action.payload;
        case NOTIFICATION_ACTION_TYPE.READ:
            return null;
        default:
            return state;
    }
}

export default notificationReducer;
