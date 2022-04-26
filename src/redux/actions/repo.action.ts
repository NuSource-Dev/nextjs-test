import {Repository} from "@src/models";
import {RepoType} from "@src/redux/types";
import {Dispatch} from "redux";
import {BackendService} from "@src/services";

export interface RepoActionPayload {
    repos?: Repository[];
    error?: any;
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

export const orgReposLoad = (vcs: string, slug: any) => (
    (dispatch: Dispatch, getState: any, service: BackendService) => {

        dispatch(repoLoading());

        service.getOrgRepos(vcs, slug)
            .then((res: any) => {
                dispatch(repoLoadSuccess({repos: Repository.fromJson(res.data, vcs)}));
            })
            .catch((error) => {
                dispatch(repoLoadFailed({error}));
            })
    }
);

export const userReposLoad = (vcs: string, slug: any) => (
    (dispatch: Dispatch, getState: any, service: BackendService) => {

        dispatch(repoLoading());

        service.getUserRepos(vcs, slug)
            .then((res: any) => {
                dispatch(repoLoadSuccess({repos: Repository.fromJson(res.data, vcs)}));
            })
            .catch((error) => {
                dispatch(repoLoadFailed({error}));
            })
    }
);