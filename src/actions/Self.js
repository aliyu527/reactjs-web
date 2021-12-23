export let setUserData = (data) => {
    return {
        type: "SET_USER_DATA",
        payload: { data } 
    }
}
export let setUserToken = (jwt) => {
    return {
        type: "SET_USER_JWT",
        payload: { jwt } 
    }
}
export let setUserNotifications = (notifications) => {
    return {
        type: "SET_USER_NOTIFICATIONS",
        payload: { notifications } 
    }
}
export let setUserUnseenCount = (unseencount) => {
    return {
        type: "SET_USER_UNSEEN_COUNT",
        payload: { unseencount } 
    }
}
  