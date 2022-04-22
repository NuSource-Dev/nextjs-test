import {Repository} from "@src/models";
import {RepoType} from "@src/redux/types";
import {Dispatch} from "redux";
import {ApiProvider} from "@src/api";
import {Provider} from "@src/api/provider-template";

export interface RepoActionPayload {
    repos?: Repository[];
    error?: any;
    org_slug?: string | string[];
    provider?: Provider;
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

export const reposLoad = (payload: RepoActionPayload) => (
    (dispatch: Dispatch, getState: any, api: ApiProvider) => {

        dispatch(repoLoading());

        api.provider(payload.provider).fetchOrgRepositories(payload.org_slug)
            .then((res: any) => {
                dispatch(repoLoadSuccess({repos: Repository.fromJson(res.data, payload.provider)}));
            })
            .catch((error) => {
                dispatch(repoLoadFailed({error}));
            })
    }
);