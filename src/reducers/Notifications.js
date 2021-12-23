let initState = {
    data        : [],
    unseencount : 0
};
export default (state = initState, action) => {
    switch (action.type) {
        case "SET_NOTIFICATION_DATA": {
            return Object.assign({}, state, { data: action.payload.notifications });
        }
        case "SET_UNSEEN_NOTIFICATION": {
            return Object.assign({}, state, { unseencount: action.payload.unseencount });
        }
        default: {
            return state;
        }
    }
}