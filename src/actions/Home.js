export let setUser = (user) => {
    return {
        type: "SET_USER",
        payload: { user }
    }
}
export let setTemp = (temp) => {
    return {
        type: "SET_TEMP",
        payload: { temp }
    }
}
export let setBusy = (params) => {
    return {
        type: 'SET_BUSY',
        payload: { 
            status: params.status, 
            caption: params.caption 
        }
    }
}
export let JoinBtnStatus = (status) => {
    return {
        type: 'JOIN_BTN_STATUS',
        payload: { status }
    }
}
export let JoinBtnCaption = (caption) => {
    return {
        type: 'JOIN_BTN_CAPTION',
        payload: { caption }
    }
}
export let joinError = (err) => {
    return {
        type: 'JOIN_ERROR',
        payload: { err },
    }
}
export let OTPError = (err) => {
    return {
        type: 'OTP_ERROR',
        payload: { err },
    }
}
export let SignupBtnStatus = (status) => {
    return {
        type: 'SIGNUP_BTN_STATUS',
        payload: { status }
    }
}
export let SignupBtnCaption = (caption) => {
    return {
        type: 'SIGNUP_BTN_CAPTION',
        payload: { caption }
    }
}
export let SignupError = (err) => {
    return {
        type: 'SIGNUP_ERROR',
        payload: { err },
    }
}

  