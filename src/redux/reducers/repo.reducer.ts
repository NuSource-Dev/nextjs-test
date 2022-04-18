import {OrgDetail} from "@src/models";
import {RepoAction} from "@src/redux/actions";
import RepoType from "@src/redux/types/repo.types";

interface RepoState {
    error?: any;
    loading: boolean;
    orgDetail?: OrgDetail;
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
                orgDetail: action.payload?.orgDetail
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