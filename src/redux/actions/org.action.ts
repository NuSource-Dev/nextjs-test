import {Dispatch} from "redux";
import {Organization, OrganizationDetail} from "@src/models";
import {OrgType} from "@src/redux/types";
import {ApiProvider} from "@src/api";
import {Provider} from "@src/api/provider-template";

export interface OrgActionPayload {
    orgs?: Organization[];
    detail?: OrganizationDetail;
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

export const orgDetailLoadSuccess = (payload: OrgActionPayload): OrgAction =>
    ({type: OrgType.fetchOrgDetailSuccess, payload});

export const orgLoadFailed = (payload: OrgActionPayload): OrgAction =>
    ({type: OrgType.fetchOrgFailed, payload});

export const orgLoad = (provider: Provider) => (
    (dispatch: Dispatch, getState: any, api: ApiProvider) => {
        dispatch(orgLoading());

        api.provider(provider).fetchOrganizations()
            .then((res: any) => {
                dispatch(orgLoadSuccess({orgs: Organization.getFromJson(res.data, api.getProvider)}));
            })
            .catch((error) => {
                dispatch(orgLoadFailed({orgs: [], error}));
            });
    }
);

export const orgDetailLoad = (slug: any, provider: Provider) => (
    (dispatch: Dispatch, getState: any, api: ApiProvider) => {
        dispatch(orgLoading());

        api.provider(provider).fetchOrgDetails(slug)
            .then((res: any) => {
                dispatch(orgDetailLoadSuccess({detail: OrganizationDetail.getFromJson(res.data, api.getProvider)}));
            })
            .catch((error) => {
                dispatch(orgLoadFailed({error}));
            });
    }
);