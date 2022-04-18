import {AnyAction, combineReducers, Reducer} from "redux";
import { routerReducer } from "connected-next-router";
import { HYDRATE } from "next-redux-wrapper";
import ThemeReducer from "./theme.reducer";
import AuthReducer from './auth.reducer';
import OrgReducer from './org.reducer';
import RepoReducer from './repo.reducer';

const combinedReducer = combineReducers({
    router: routerReducer,
    theme: ThemeReducer,
    auth: AuthReducer,
    org: OrgReducer,
    repo: RepoReducer
});

const RootReducer: Reducer<any, AnyAction> = (state: any, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
        };
        if (typeof window !== "undefined" && state?.router) {
            nextState.router = state.router;
        }
        return nextState;
    } else {
        return combinedReducer(state, action);
    }
};

export type RootState = ReturnType<typeof RootReducer>;

export default RootReducer;
