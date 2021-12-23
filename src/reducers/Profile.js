let initState = {
    header      : { fname: '',lname: '', username: '', role: 'others', country:{iso2:'', name:''} },
    data        : { fname: '',lname: '', username: '', role: 'others', country:{iso2:'', name:''}, followers: [], following: [], contacts: [], albums: [] },
    albums      : [],
    info        : [],
    contacts    : [],
    followers   : [],
    following   : [],
    collections : [],
    temp_avatar : '',
    temp_cover  : ''
};
export default (state = initState, action) => {
    switch (action.type) {
        case "SET_PROFILE_DATA": {
            return Object.assign({}, state, { data: action.payload.data });
        }
        case "SET_PROFILE_HEADER": {
            return Object.assign({}, state, { header: action.payload.header });
        }
        case "SET_PROFILE_ALBUMS": {
            return Object.assign({}, state, { albums: action.payload.albums });
        }
        case "SET_PROFILE_COLLECTIONS": {
            return Object.assign({}, state, { collections: action.payload.collections });
        }
        case "SET_PROFILE_INFO": {
            return Object.assign({}, state, { info: action.payload.info });
        }
        case "SET_PROFILE_CONTACTS": {
            return Object.assign({}, state, { contacts: action.payload.contacts });
        }
        case "SET_PROFILE_FOLLOWERS": {
            return Object.assign({}, state, { followers: action.payload.followers });
        }
        case "SET_PROFILE_FOLLOWING": {
            return Object.assign({}, state, { following: action.payload.following });
        }
        case "SET_PROFILE_TEMP_AVATAR": {
            return Object.assign({}, state, { temp_avatar: action.payload.temp_avatar });
        }
        case "SET_PROFILE_TEMP_COVER": {
            return Object.assign({}, state, { temp_cover: action.payload.temp_cover });
        }
        default: {
            return state;
        }
    }
}