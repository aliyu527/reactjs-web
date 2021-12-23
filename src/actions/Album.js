export let setAlbumData = (data) => {
    return {
        type: "SET_ALBUM_DATA",
        payload: { data } 
    }
}
export let changeCurrentAlbum = (current) => {
    return {
        type: "CHANGE_CURRENT_ALBUM",
        payload: { current } 
    }
}
export let changeCurrentAlbumType = (type) => {
    return {
        type: "CHANGE_CURRENT_ALBUM_TYPE",
        payload: { type } 
    }
}
export let updateAlbumPlayer = (player) => {
    return {
        type: "UPDATE_ALBUM_PLAYER",
        payload: { player } 
    }
}
  