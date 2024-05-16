export const NOTIFICATION_ENTITY_TYPE = {
    SERVICE_APPROVED: 'SERVICE_APPROVED',
    SERVICE_REJECTED: 'SERVICE_REJECTED',
    REISSUE_APPROVED: 'REISSUE_APPROVED',
    REISSUE_REJECTED: 'REISSUE_REJECTED',
    NEWS_POST: 'NEWS_POST',
    LOCKER_ITEM_ADD: 'LOCKER_ITEM_ADD',
};

// NOTE: get notification { content: { entity_id, entity_type }, navigation route }
function notificationReducer(state, action) {
    const { navigation, screen, content } = action;
    switch (action.type) {
        case NOTIFICATION_ENTITY_TYPE.SERVICE_APPROVED:
            return navigation.navigate(screen, content);
        case NOTIFICATION_ENTITY_TYPE.SERVICE_REJECTED:
            return action.payload;
        case NOTIFICATION_ENTITY_TYPE.REISSUE_APPROVED:
            return action.payload;
        case NOTIFICATION_ENTITY_TYPE.REISSUE_REJECTED:
            return action.payload;
        case NOTIFICATION_ENTITY_TYPE.NEWS_POST:
            return action.payload;
        case NOTIFICATION_ENTITY_TYPE.LOCKER_ITEM_ADD:
            return action.payload;
        default:
            return state;
    }
}

export default notificationReducer;
