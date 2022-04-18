import {Dispatch} from "redux";
import { Organization } from "@src/models";
import {OrgType} from "@src/redux/types";
import {ApiProvider} from "@src/api";

export interface OrgActionPayload {
    orgs?: Organization[];
    error?: any;
    username?: string;
}

export interface OrgAction {
    type: OrgType,
    payload?: OrgActionPayload;
}

export const orgLoading = (): OrgAction =>
    ({type: OrgType.fetchOrg});

export const orgLoadSuccess = (payload: OrgActionPayload): OrgAction =>
    ({type: OrgType.fetchOrgSuccess, payload});

export const orgLoadFailed = (payload: OrgActionPayload): OrgAction =>
    ({type: OrgType.fetchOrgFailed, payload});

export const orgLoad = (payload: OrgActionPayload) => (
    (dispatch: Dispatch, getState: any, api: ApiProvider) => {
        dispatch(orgLoading());

        api.provider.fetchOrganizations(payload.username || '')
            .then((res: any) => {
                dispatch(orgLoadSuccess({orgs: res.data}));
            })
            .catch((error) => {
                dispatch(orgLoadFailed({orgs: [], error}));
            });
    }
);