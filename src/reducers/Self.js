let initState = {
    data          : { fname: '',lname: '', username: '' },
    jwt           : null,
    notifications : [],
    unseencount   : 0
};
export default (state = initState, action) => {
    switch (action.type) {
        case "SET_USER_DATA": {
            return Object.assign({}, state, { data: action.payload.data });
        }
        case "SET_USER_JWT": {
            return Object.assign({}, state, { jwt: action.payload.jwt });
        }
        case "SET_USER_NOTIFICATIONS": {
            return Object.assign({}, state, { notifications: action.payload.notifications });
        }
        case "SET_USER_UNSEEN_COUNT": {
            return Object.assign({}, state, { unseencount: action.payload.unseencount });
        }
        default: {
            return state;
        }
    }
}