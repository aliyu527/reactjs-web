let initState = {
    result   : {},
    keywords : ''
};
export default (state = initState, action) => {
    switch (action.type) {
        case "SET_SEARCH_RESULT": {
            return Object.assign({}, state, { result: action.payload.result });
        }
        case "SET_SEARCH_KEYWORDS": {
            return Object.assign({}, state, { keywords: action.payload.keywords });
        }
        default: {
            return state;
        }
    }
}