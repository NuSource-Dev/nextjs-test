import {getTheme, themeSettings} from "@src/utils/settings/theme/index.setting"
import { ThemeAction } from "../actions";
import { ThemeActionType } from "@src/redux/types";


const initialState = {
    current: 'light',
    settings: {
        ...themeSettings.light
    },
};

export default (state = initialState, action: ThemeAction) => {
    switch (action.type) {
        case ThemeActionType.change:
            return {
                ...state,
                current: action.payload.current,
                settings: getTheme(action.payload.current)
            };
        default:
            return { ...state }
    }
};
