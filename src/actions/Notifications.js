export let setNotificationData = (notifications) => {
    return {
        type: "SET_NOTIFICATION_DATA",
        payload: { notifications } 
    }
}
export let setUnseenNotification = (unseencount) => {
    return {
        type: "SET_UNSEEN_NOTIFICATION",
        payload: { unseencount } 
    }
}
  