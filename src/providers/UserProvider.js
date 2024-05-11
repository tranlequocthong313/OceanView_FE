import { useReducer } from 'react';
import { UserContext, UserDispatchContext } from '~/contexts/UserContext';
import userReducer from '~/reducers/userReducer';

export default function UserProvider({ children }) {
    const [user, dispatch] = useReducer(userReducer, {});
    return (
        <UserContext.Provider value={user}>
            <UserDispatchContext.Provider value={dispatch}>{children}</UserDispatchContext.Provider>
        </UserContext.Provider>
    );
}
