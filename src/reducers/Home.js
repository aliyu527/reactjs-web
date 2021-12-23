const initState = { 
    user: {}, 
    temp: {}, 
    join_err: null, jbstat: true, jbcapt: 'Submit', 
    otp_err: null, 
    signup_err: null, sbstat: true, sbcapt: 'Continue' 
};
export default (state = initState, action) => {
    switch (action.type) {
        case "SET_USER": {
            return Object.assign({}, state, { user: action.payload.user });
        }
        case "SET_TEMP": {
            return Object.assign({}, state, { temp: action.payload.temp });
        }
        case "SET_BUSY": {
            return Object.assign({}, state, { 
                jbstat: action.payload.status, 
                jbcapt: action.payload.caption 
            });
        }
        case "JOIN_BTN_STATUS": {
            return Object.assign({}, state, { jbstat: action.payload.status });
        }
        case "JOIN_BTN_CAPTION": {
            return Object.assign({}, state, { jbcapt: action.payload.caption });
        }
        case "JOIN_ERROR": {
            return Object.assign({}, state, { join_err: action.payload.err });
        }
        case "OTP_ERROR": {
            return Object.assign({}, state, { otp_err: action.payload.err });
        }
        case "SIGNUP_BTN_STATUS": {
            return Object.assign({}, state, { sbstat: action.payload.status });
        }
        case "SIGNUP_BTN_CAPTION": {
            return Object.assign({}, state, { sbcapt: action.payload.caption });
        }
        case "SIGNUP_ERROR": {
            return Object.assign({}, state, { signup_err: action.payload.err });
        }
        default: {
            return state;
        }
    }
}