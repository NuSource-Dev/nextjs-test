import {User} from "@src/models";
import { AuthType } from '@src/redux/types';
import { AuthAction } from "@src/redux/actions";

interface AuthState {
    loading: boolean;
    user: User | null | undefined;
    error: any;
    isAuthenticated: boolean;
}

const initState: AuthState = {
    loading: false,
    error: null,
    user: null,
    isAuthenticated: false
};

export default (state = initState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthType.login:
            return {
                ...state,
                error: null,
                isAuthenticated: false,
                loading: true
            };
        case AuthType.loginSuccess:
            return {
                ...state,
                error: null,
                isAuthenticated: true,
                loading: false,
                user: action.payload?.user
            };
        case AuthType.loginFailed:
            return {
                ...state,
                error: action.payload?.error,
                isAuthenticated: false,
                loading: false
            };
        default:
            return {...state};
    }
}