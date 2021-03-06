import thunk from "redux-thunk";
import {applyMiddleware, compose, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {
    createRouterMiddleware,
    initialRouterState,
} from "connected-next-router";
import Router from "next/router";
import service from '@src/services';
import {loadState, saveState} from "../utils/helpers/storage.helper";
import RootReducer from "@src/redux/reducers/index";

const routerMiddleware = createRouterMiddleware();

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const persistedState = loadState();

const {asPath} = Router.router || {};
let initialState: any;
if (asPath) {
    initialState = {
        router: initialRouterState(asPath),
    };
}

export const store = createStore(
    RootReducer,
    {...persistedState, ...initialState},
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument(service), routerMiddleware))
);

store.subscribe(() => saveState(store.getState()));
