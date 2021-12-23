import React, { Component } from 'react';
import { connect } from 'react-redux';
import { APIManager, Config } from '../../utils';
import { OTPError } from '../../actions/Home';

class OTP extends Component {
    componentDidMount () {
        let self = this;
        let otp  = document.querySelector("#otp");
        otp.addEventListener("keyup", function(e) {
            let code   = this.value.replace(/\D/g,'');
            this.value = code;
            if (code.length == 6) {
                self.submitOTP(code);
            }
        });
    }
    submitOTP(code) {
        let self    = this;
        let user     = Object.assign({}, this.props.home.temp);
        let otp      = document.querySelector("#otp");
        otp.disabled = true;
        this.props.dispatch(OTPError(null));
        APIManager.post(Config.API.URL+'/auth', { otp:code, jwt:user.jwt }, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                if (res.info.code == 202) {
                    otp.value = '';
                    self.props.onCreate({profile:res.profile, jwt:res.jwt});
                } else {
                    self.props.dispatch(OTPError(res.info.msg));
                }
            }
            otp.disabled = false;
        });
    }
    render () {
        return (
            <div class="modal fade" id="onetimepassword-model" tabIndex="-1" role="dialog" aria-labelledby="onetimepassword-model" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered window-popup create-friend-group create-friend-group-1" role="document">
                    <div class="modal-content">
                        
                        <form class="needs-validation" noValidate>
                            <a href="#" class="close icon-close" data-dismiss="modal" aria-label="Close">
                                <svg class="olymp-close-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-close-icon"></use></svg>
                            </a>
                            <div class="modal-header">
                                <h6 class="title">OTP Code</h6>
                            </div>
                            <div class="modal-body">
                                <div class="error-report"><p>{ this.props.home.otp_err }</p></div>
                                <p>We sent One Time Password to <strong>{this.props.home.temp.phone}</strong></p>
                                <div class="form-group label-floating">
                                    <label class="control-label">OTP Code</label>
                                    <input class="form-control" type="text" autoComplete="off" maxLength="6" minLength="6" id="otp" required autoFocus/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    home: state.home
});
export default connect(mapStateToProps)(OTP);