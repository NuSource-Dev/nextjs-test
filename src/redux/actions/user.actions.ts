import {Dispatch} from "redux";
import {User} from "@src/models";
import {UserTypes} from "@src/redux/types";
import {BackendService} from "@src/services";

export interface UserActionPayload {
    user?: User | null;
    error?: any;
}

export interface UserAction {
    type: UserTypes,
    payload?: UserActionPayload;
}

export const userLoading = (): UserAction =>
    ({type: UserTypes.fetchUser});

export const userLoadSuccess = (payload: UserActionPayload): UserAction =>
    ({type: UserTypes.fetchUserSuccess, payload});


export const userLoadFailed = (payload: UserActionPayload): UserAction=>
    ({type: UserTypes.fetchUserFailed, payload});

export const loadUser = (vcs: string) => (
    (dispatch: Dispatch, getState: any, service: BackendService) => {
        dispatch(userLoading());

        service.getUser(vcs)
            .then((res: any) => {
                dispatch(userLoadSuccess({user: User.fromJson(res.data)}));
            })
            .catch((error) => {
                dispatch(userLoadFailed({user: null, error}));
            });
    }
);