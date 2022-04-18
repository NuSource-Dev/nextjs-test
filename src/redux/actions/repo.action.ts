import {OrgDetail} from "@src/models";
import {RepoType} from "@src/redux/types";
import {Dispatch} from "redux";
import {ApiProvider} from "@src/api";

export interface RepoActionPayload {
    orgDetail?: OrgDetail;
    error?: any;
    username?: string;
    slug?: string;
}

export interface RepoAction {
    type: RepoType,
    payload?: RepoActionPayload
}

export const repoLoading = (): RepoAction => ({type: RepoType.fetchRepo});

export const repoLoadSuccess = (payload: RepoActionPayload): RepoAction =>
    ({type: RepoType.fetchRepoSuccess, payload});

export const repoLoadFailed = (payload: RepoActionPayload): RepoAction =>
    ({type: RepoType.fetchRepoFailed, payload});

export const repoLoad = (payload: RepoActionPayload) => (
    (dispatch: Dispatch, getState: any, api: ApiProvider) => {

        dispatch(repoLoading());

        api.provider.fetchOrgDetails(payload.username || '', payload.slug || '')
            .then((res: any) => {
                dispatch(repoLoadSuccess({orgDetail: res.data}));
            })
            .catch((error) => {
                dispatch(repoLoadFailed({error}));
            })
    }
);