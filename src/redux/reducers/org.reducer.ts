import {Organization, OrganizationDetail} from "@src/models";
import {OrgAction} from "@src/redux/actions/org.action";
import OrgType from "@src/redux/types/org.types";

interface OrgState {
    error?: any;
    loading: boolean;
    orgs?: Organization[];
    detail?: OrganizationDetail | null
}

const initState: OrgState = {
    loading: false,
    orgs: [],
    detail: null,
    error: null
};

export default (state = initState, action: OrgAction): OrgState => {
    switch (action.type) {
        case OrgType.fetchOrg:
            return {
                ...state,
                loading: true
            };
        case OrgType.fetchOrgSuccess:
            return {
                ...state,
                loading: false,
                orgs: action.payload?.orgs,
                error: null
            };
        case OrgType.fetchOrgDetailSuccess:
            return {
                ...state,
                loading: false,
                detail: action.payload?.detail,
                error: null
            };
        case OrgType.fetchOrgFailed:
            return {
                ...state,
                loading: false,
                error: action.payload?.error
            };
        default:
            return {...state};
    }
};