let initState = {
    data    : {user:{fname:'',lname:''}, album:{files:[], likes:[], comments:[], shares:[]}},
    current : { start : 0, end: 1 },
    type    : 'photo',
    player  : {
        playPause   : 'play',
        muteUnmute  : 'sound',
        currentTime : '00:00',
        duration    : '00:00',
        sliderMax   : '100',
        sliderValue : '0'
    }
    
};
export default (state = initState, action) => {
    switch (action.type) {
        case "SET_ALBUM_DATA": {
            return Object.assign({}, state, { data: action.payload.data });
        }
        case "CHANGE_CURRENT_ALBUM": {
            return Object.assign({}, state, { current: action.payload.current });
        }
        case "CHANGE_CURRENT_ALBUM_TYPE": {
            return Object.assign({}, state, { type: action.payload.type });
        }
        case "UPDATE_ALBUM_PLAYER": {
            return Object.assign({}, state, { player: action.payload.player });
        }
        default: {
            return state;
        }
    }
}