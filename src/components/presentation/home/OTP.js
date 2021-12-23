import React, { Component } from 'react';
import { connect } from 'react-redux';
import { APIManager, Config } from '../../../utils';
import { OTPError } from '../../../actions/Home';
import PouchDB from 'pouchdb';

const db = new PouchDB('self');
 
class OTP extends Component {
    constructor() {
        super();
        this.state = {
            verifybtn: true,
            cancelbtn: false,
            otpinput: false,
            verifylabel: 'Verify',
            otp: ''
        }
    }
    submit(e) {
        e.preventDefault();
        let self = this;
        let user = Object.assign({}, this.props.home.temp);
        let otp  = this.state.otp;
        if (otp.length == 6) {
            this.props.dispatch(OTPError(null));
            this.setState({otpinput:true, verifybtn:true, verifylabel:'Verifing...', cancelbtn:true});
            APIManager.post(Config.API.URL+'/user/auth', { otp:otp, jwt:user.jwt }, (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    if (res.info.code == 202) {
                        self.props.onCreate({profile:res.profile, jwt:res.jwt});
                        this.setState({otp:''});
                    } else {
                        self.props.dispatch(OTPError(res.info.msg));
                        self.setState({verifybtn:false});
                    }
                }
                self.setState({otpinput:false, verifylabel:'Verify', cancelbtn:false});
                //otp.disabled = false;
            });
        } else {
            self.props.dispatch(OTPError('OTP is not valid'));
        }
    }
    cancel (e) {
        e.preventDefault();
        db.get('temp').then((doc) => { return db.remove(doc); }).then( (result) => { }).catch((err) => { });
        this.props.onCancel('cancel');
    }
    onChangeOTPCode (e) {
        let otp = e.target.value.replace(/\D/g,'').trim();
        this.setState({otp:otp});
        if (otp.length == 6) {
            this.setState({verifybtn:false});
        } else {
            this.setState({verifybtn:true});
        }
    }
    render () {
        let user   = this.props.home.temp;
        let notify = () => {
            if (user.phone && !user.email) {
                return (<strong>{this.props.home.temp.phone}</strong>);
            } else if (!user.phone && user.email) {
                return (<strong>{this.props.home.temp.email}</strong>);
            } else if (user.phone && user.email) {
                return (<span><strong>{this.props.home.temp.phone}</strong> and <strong>{this.props.home.temp.email}</strong></span>);
            }
        }
        return (
            <div class="default animated zoomIn">
                <div class="title h6">One time password</div>
                <form class="needs-validation content" noValidate>
                    <div class="error-report"><p>{ this.props.home.otp_err }</p></div>
                    <p>We sent one time password to { notify() }</p>
                    <div class="form-group label-floating">
                        <label class="control-label">OTP Code</label>
                        <input class="form-control" onChange={this.onChangeOTPCode.bind(this)} type="text" disabled={this.state.otpinput} autoComplete="off" value={this.state.otp} maxLength="6" minLength="6" required autoFocus/> {/* id="otp" */}
                    </div>

                    <button type="botton" class="btn btn-lg btn-primary full-width" disabled={this.state.verifybtn} onClick={this.submit.bind(this)}> {this.state.verifylabel} </button> {/* full-width */}
                    <button type="botton" class="btn btn-lg btn-danger full-width" disabled={this.state.cancelbtn} onClick={this.cancel.bind(this)}> Cancel </button> {/* full-width id="otp-cancel" */}
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    home: state.home
});

export default connect(mapStateToProps)(OTP);