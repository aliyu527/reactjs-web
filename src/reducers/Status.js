const initState = { 
    stories  : [],
    people   : [],
    file     : {},
    activity : '',
    album    : '', 
    files    : [],
    preview  : '',
    chlimit  : 150,
    ablimit  : 60
};
export default (state = initState, action) => {
    switch (action.type) {
        case "SET_FILES": {
            return Object.assign({}, state, { files: action.payload.files });
        }
        case "SET_FILE": {
            return Object.assign({}, state, { file: action.payload.file });
        }
        case "SET_ALBUM_TITLE": {
            return Object.assign({}, state, { album: action.payload.album });
        }
        case "SET_POST_ACTIVITY": {
            return Object.assign({}, state, { activity: action.payload.activity });
        }
        case "ADJUST_CHR_LIMIT": {
            return Object.assign({}, state, { chleft: action.payload.chleft });
        }
        case "SET_STORIES": {
            return Object.assign({}, state, { stories: action.payload.stories });
        }
        case "SET_PEOPLE": {
            return Object.assign({}, state, { people: action.payload.people });
        }
        default: {
            return state;
        }
    }
}