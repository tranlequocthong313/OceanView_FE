function userReducer(state, action) {
    switch (action.type) {
        case 'login':
            return action.payload;
        case 'current':
            return action.payload;
        case 'logout':
            return null;
        default:
            return state;
    }
}

export default userReducer;
