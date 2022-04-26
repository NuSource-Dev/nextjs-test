import {User} from "@src/models";
import {UserAction} from "@src/redux/actions";
import UserTypes from "@src/redux/types/user.types";

interface UserState {
    error?: any;
    loading: boolean;
    user?: User | null;
}

const initState: UserState = {
    loading: false,
    user: null,
    error: null
};

export default (state = initState, action: UserAction): UserState => {
    switch (action.type) {
        case UserTypes.fetchUser:
            return {
                ...state,
                loading: true
            };
        case UserTypes.fetchUserSuccess:
            return {
                ...state,
                loading: false,
                user: action.payload?.user,
                error: null
            };
        case UserTypes.fetchUserFailed:
            return {
                ...state,
                loading: false,
                error: action.payload?.error
            };
        default:
            return {...state};
    }
};