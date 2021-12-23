export let updateAlbumPlayer = (album) => {
    return {
        type: "UPDATE_ALBUM_PLAYER",
        payload: { album } 
    }
}
export let updateNormalPlayer = (normal) => {
    return {
        type: "UPDATE_NORMAL_PLAYER",
        payload: { normal } 
    }
}
  