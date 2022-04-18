import { AuthType } from "@src/redux/types";
import { User } from "@src/models";
import { Dispatch } from "redux";
import { ApiProvider } from "@src/api";

export interface AuthActionPayload {
    user?: User | null;
    error?: any;
    username?: string;
    password?: string;
    authenticating?: boolean;
}

export interface AuthAction {
    type: AuthType,
    payload?: AuthActionPayload;
}

export const authenticating = (): AuthAction =>
    ({type: AuthType.login});

export const loginSuccess = (payload: AuthActionPayload): AuthAction =>
    ({type: AuthType.loginSuccess, payload});

export const loginFailed = (payload: AuthActionPayload): AuthAction =>
    ({type: AuthType.loginFailed, payload});

export const login = (payload: AuthActionPayload) => (
    (dispatch: Dispatch, getState: any, api: ApiProvider) => {

        dispatch(authenticating());

        api.provider.login(payload.username || '', payload.password || '')
            .then((res: any) => {

                dispatch(
                    loginSuccess({user: res.data})
                );
            })
            .catch((error) => {
                dispatch(
                    loginFailed({error})
                );
            });
    }
);