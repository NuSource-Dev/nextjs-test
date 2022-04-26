import {Dispatch} from "redux";
import {Organization, OrganizationDetail} from "@src/models";
import {OrgType} from "@src/redux/types";
import {BackendService} from "@src/services";

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

export const orgLoad = (vcs_slug: string) => (
    (dispatch: Dispatch, getState: any, service: BackendService) => {
        dispatch(orgLoading());

        service.getOrgs(vcs_slug)
            .then((res: any) => {
                console.log(res.data);
                dispatch(orgLoadSuccess({
                    orgs: Organization.getFromJson(res.data)
                }));
            })
            .catch((error) => {
                console.log(error);
                dispatch(orgLoadFailed({orgs: [], error}));
            });
    }
);

export const orgDetailLoad = (vcs: string, slug: any) => (
    (dispatch: Dispatch, getState: any, service: BackendService) => {
        dispatch(orgLoading());

        service.getOrgDetail(vcs, slug)
            .then((res: any) => {
                dispatch(orgDetailLoadSuccess({detail: OrganizationDetail.fromJson(res.data)}));
            })
            .catch((error) => {
                dispatch(orgLoadFailed({error}));
            });
    }
);