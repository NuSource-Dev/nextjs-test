export const loadState = () => {
    try {
        const serializedState = localStorage.getItem("state");
        if (serializedState === null) {
            return undefined
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined
    }
};

export const saveState = (state: any) => {
    try {
        const serializedState = JSON.stringify({
            router: state.router,
            theme: state.theme
        });
        localStorage.setItem("state", serializedState)
    } catch {
        console.log('Save state failed!')
    }
};
