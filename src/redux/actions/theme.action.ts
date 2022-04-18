import { ThemeActionType } from "@src/redux/types";

export interface ThemeAction {
    type: ThemeActionType,
    payload: any
}

export const changeTheme = (payload: any): ThemeAction =>
    ({type: ThemeActionType.change, payload});