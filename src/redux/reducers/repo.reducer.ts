import {Repository} from "@src/models";
import {RepoAction} from "@src/redux/actions";
import {RepoType} from "@src/redux/types";

interface RepoState {
    error?: any;
    loading: boolean;
    repos?: Repository[];
}

const initState: RepoState = {
    loading: false,
    error: null
};

export default (state = initState, action: RepoAction): RepoState => {
    switch (action.type) {
        case RepoType.fetchRepo:
            return {
                ...state,
                loading: true
            };
        case RepoType.fetchRepoSuccess:
            return {
                ...state,
                loading: false,
                repos: action.payload?.repos
            };
        case RepoType.fetchRepoFailed:
            return {
                ...state,
                loading: false,
                error: action.payload?.error
            };
        default:
            return {...state};
    }
}