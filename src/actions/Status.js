export let setFiles = (files) => {
    return {
        type: "SET_FILES",
        payload: { files }
    }
}
export let setFile = (file) => {
    return {
        type: "SET_FILE",
        payload: { file }
    }
} 
export let setAlbumTitle = (album) => {
    return {
        type: "SET_ALBUM_TITLE",
        payload: { album }
    }
}
export let setPostActivity = (activity) => {
    return {
        type: "SET_POST_ACTIVITY",
        payload: { activity }
    }
}
export let adjustCharactarLimit = (chleft) => {
    return {
        type: "ADJUST_CHR_LIMIT",
        payload: { chleft }
    }
}
export let setStories = (stories) => {
    return {
        type: "SET_STORIES",
        payload: { stories }
    }
}
export let setPeople = (people) => {
    return {
        type: "SET_PEOPLE",
        payload: { people }
    }
}

  