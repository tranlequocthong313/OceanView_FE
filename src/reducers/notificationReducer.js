export const NOTIFICATION_ACTION_TYPE = {
    LOAD: 0,
    PUSH: 1,
    INFINITE_SCROLL: 2,
    READ: 3,
    UPDATE_BADGE: 4,
};

export const initialNotificationState = {
    data: [],
    badge: 0,
    limit: 10,
    offset: 0,
};

function notificationReducer(state, action) {
    switch (action.type) {
        case NOTIFICATION_ACTION_TYPE.PUSH: {
            console.group('PUSH NOTIFICATION');
            console.log(action.payload);
            console.groupEnd();
            const newBadge = state.badge + 1;
            const newOffset = state.offset ? state.offset + 1 : 0;
            const { data } = action.payload;
            return {
                ...state,
                badge: newBadge,
                data: [data, ...state.data],
                offset: newOffset,
            };
        }
        case NOTIFICATION_ACTION_TYPE.READ: {
            console.group('READ NOTIFICATION');
            console.log(action.payload);
            console.groupEnd();
            const { id } = action.payload;
            let updated = false;
            const newData = state.data.map((item) => {
                if (item.id === id && !item.has_been_read) {
                    updated = true;
                    return { ...item, has_been_read: true };
                }
                return item;
            });
            const newBadge = updated ? state.badge - 1 : state.badge;

            return {
                ...state,
                data: newData,
                badge: newBadge,
            };
        }
        case NOTIFICATION_ACTION_TYPE.INFINITE_SCROLL: {
            console.group('ADD NOTIFICATION');
            console.log(action.payload);
            console.groupEnd();
            const { badge = 0, data = [], limit, offset } = action.payload;
            return {
                ...state,
                data: [...state.data, ...data],
                badge,
                limit: limit || state.limit,
                offset: offset || state.offset,
            };
        }
        case NOTIFICATION_ACTION_TYPE.LOAD: {
            console.group('LOAD NOTIFICATION');
            console.log(action.payload);
            console.groupEnd();
            const { badge = 0, data = [], limit, offset } = action.payload;
            return {
                ...state,
                data,
                badge,
                limit: limit || state.limit,
                offset: offset || state.offset,
            };
        }
        case NOTIFICATION_ACTION_TYPE.UPDATE_BADGE: {
            console.group('UPDATE BADGE NOTIFICATION');
            console.log(action.payload);
            console.groupEnd();
            const { badge = 0 } = action.payload;
            return {
                ...state,
                badge,
            };
        }
        default:
            return state;
    }
}

export default notificationReducer;
