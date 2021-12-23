let initState = {
    people : []
};
export default (state = initState, action) => {
    switch (action.type) {
        case "SET_PEOPLE_SUGGESTIONS": {
            return Object.assign({}, state, { people: action.payload.people });
        }
        default: {
            return state;
        }
    }
}