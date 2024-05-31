export const USER_ACTION_TYPE = {
    LOGIN: 0,
    CURRENT: 1,
    LOGOUT: 2,
};

export const initialUserState = {};

function userReducer(state, action) {
    switch (action.type) {
        case USER_ACTION_TYPE.LOGIN:
            return action.payload;
        case USER_ACTION_TYPE.CURRENT:
            return action.payload;
        case USER_ACTION_TYPE.LOGOUT:
            return null;
        default:
            return state;
    }
}

export default userReducer;
