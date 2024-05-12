import { useContext } from 'react';
import { UserContext, UserDispatchContext } from '~/contexts/UserContext';

export function useUser() {
    return useContext(UserContext);
}

export function useUserDispatch() {
    return useContext(UserDispatchContext);
}
