const initState = { 
    list : []
};
export default (state = initState, action) => {
    switch (action.type) {
        case "SET_PEOPLE_LIST": {
            return Object.assign({}, state, { list: action.payload.list });
        }
        default: {
            return state;
        }
    }
}