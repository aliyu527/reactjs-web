export let setProfileData = (data) => {
    return {
        type: "SET_PROFILE_DATA",
        payload: { data } 
    }
}
export let setProfileHeader = (header) => {
    return {
        type: "SET_PROFILE_HEADER",
        payload: { header } 
    }
}
export let setProfileAlbums = (albums) => {
    return {
        type: "SET_PROFILE_ALBUMS",
        payload: { albums } 
    }
}
export let setProfileCollections = (collections) => {
    return {
        type: "SET_PROFILE_COLLECTIONS",
        payload: { collections } 
    }
}
export let setProfileInfo = (info) => {
    return {
        type: "SET_PROFILE_INFO",
        payload: { info } 
    }
}
export let setProfileContacs = (contacts) => {
    return {
        type: "SET_PROFILE_CONTACTS",
        payload: { contacts } 
    }
}
export let setProfileFollowers = (followers) => {
    return {
        type: "SET_PROFILE_FOLLOWERS",
        payload: { followers } 
    }
}
export let setProfileFollowing = (following) => {
    return {
        type: "SET_PROFILE_FOLLOWING",
        payload: { following } 
    }
}
export let setProfileTempAvatar = (temp_avatar) => {
    return {
        type: "SET_PROFILE_TEMP_AVATAR",
        payload: { temp_avatar } 
    }
}
export let setProfileTempCover = (temp_cover) => {
    return {
        type: "SET_PROFILE_TEMP_COVER",
        payload: { temp_cover } 
    }
}
  