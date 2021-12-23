import React, { Component } from 'react';
import { connect } from 'react-redux';
import { APIManager, Config } from '../../../utils';
import { SignupError, SignupBtnCaption, SignupBtnStatus, setUser } from '../../../actions/Home';
 
class Signup extends Component {
    componentDidMount() {
        let self     = this;
        let username = document.querySelector("#username");
        username.addEventListener("blur", (e) => {
            self.props.dispatch(SignupError(null));
            let user = Object.assign({}, self.props.home.user);
            e.target.parentElement.classList.remove("has-success");
            e.target.parentElement.classList.remove("has-error");
            if (username.value.length > 0) {
                APIManager.post(Config.API.URL+'/check/user', { username: username.value }, (err, res) => {
                    if (err) {
                        console.log(res);
                        console.log('ERROR: '+JSON.stringify(err));
                    } else {
                        if (res.info.code == 204) {
                            e.target.parentElement.classList.remove("has-error");
                            e.target.parentElement.classList.add("has-success");
                            self.props.dispatch(SignupError(null));
                            user.username = username.value;
                        } else {
                            e.target.parentElement.classList.remove("has-success");
                            e.target.parentElement.classList.add("has-error");
                            self.props.dispatch(SignupError('Username '+res.info.msg));
                            delete user.username;
                        }
                    }
                });
            } else {
                delete user.username;
            }
            self.props.dispatch(setUser(user));
            self.enableSubmit(user);
        });
    }
    updateUser(e) { 
        let user = Object.assign({}, this.props.home.user);
        if (e.target.value.length == 0) {
            delete user[e.target.id];
        } else {
            if(e.target.id == 'username') {
                user[e.target.id] = e.target.value.replace(/[^a-zA-Z0-9_.]/g, ''); //replace(/\s/g, "_").
                e.target.value    = user[e.target.id];
            } else {
                user[e.target.id] = e.target.value;
            }
        }
        this.props.dispatch(setUser(user));
        this.enableSubmit(user);
    }
    enableSubmit (user) {
        if (user.fname && user.lname && user.username) {
            this.props.dispatch(SignupBtnStatus(false));
        } else {
            this.props.dispatch(SignupBtnStatus(true));
        }
    }
    submitData(e) {
        this.props.dispatch(SignupError(null));
        e.preventDefault();
        let self = this;
        let user  = Object.assign({}, this.props.home.user, {jwt: this.props.home.temp.jwt});
        if (!user.fname || !user.lname || !user.username) {
            this.props.dispatch(SignupError('All field are required!'));
        } else {
            this.props.dispatch(SignupBtnStatus(true));
            this.props.dispatch(SignupBtnCaption('Please Wait...'));
            APIManager.post(Config.API.URL+'/user/signup', user, (err, res) => {
                console.log(res);
                if (err) {
                    self.props.dispatch(SignupBtnStatus(false));
                    console.log(res);
                    console.log('ERROR: '+JSON.stringify(err));
                } else {
                    if (res.info.code == 202) {
                        document.querySelector("#fname").value    = '';
                        document.querySelector("#lname").value    = '';
                        document.querySelector("#username").value = '';
                        self.props.dispatch(setUser({}));
                        self.props.onCreate({ profile:res.profile, jwt:res.jwt });
                    } else {
                        self.props.dispatch(SignupError(res.info.msg));
                        self.props.dispatch(SignupBtnStatus(false));
                    }
                }
                this.props.dispatch(SignupBtnCaption('Continue'));
            });
        }
    }
    render () {
        return (
            <div class="default animated bounceIn">
                <div class="title h6">Sign up </div>
                <form class="needs-validation content" noValidate onSubmit={this.submitData.bind(this)}>
                    <div class="error-report"><p>{ this.props.home.signup_err }</p></div>
                    <div class="row">
                        <div class="col col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div class="form-group label-floating is-empty">
                                <label class="control-label">Username</label>
                                <input class="form-control" id="username" onKeyUp={this.updateUser.bind(this)} type="text" autoComplete="off" required />
                            </div>
                        </div>
                        <div class="col col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                            <div class="form-group label-floating is-empty">
                                <label class="control-label">First Name</label>
                                <input class="form-control" id="fname" onKeyUp={this.updateUser.bind(this)} type="text" autoComplete="off" required />
                            </div>
                        </div>
                        <div class="col col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                            <div class="form-group label-floating is-empty">
                                <label class="control-label">Last Name</label>
                                <input class="form-control" id="lname" onKeyUp={this.updateUser.bind(this)} type="text" autoComplete="off" required />
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-success btn-lg full-width" disabled={ this.props.home.sbstat }>{ this.props.home.sbcapt }</button> 
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    home: state.home
});

export default connect(mapStateToProps)(Signup);