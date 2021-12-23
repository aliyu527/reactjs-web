let initState = {
    album : {
        playPause   : 'play',
        muteUnmute  : 'sound',
        currentTime : '00:00',
        duration    : '00:00',
        sliderMax   : '100',
        sliderValue : '0'
    },
    normal : {
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
        case "UPDATE_ALBUM_PLAYER": {
            return Object.assign({}, state, { album: action.payload.album });
        }
        case "UPDATE_NORMAL_PLAYER": {
            return Object.assign({}, state, { normal: action.payload.normal });
        }
        default: {
            return state;
        }
    }
}