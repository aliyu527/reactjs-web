import React, { Component } from 'react';
import superagent from 'superagent';
import jsonp from 'superagent-jsonp';
import { connect } from 'react-redux';
import { Config } from '../../../utils';
import { setUser, joinError, JoinBtnCaption, JoinBtnStatus } from '../../../actions/Home';

const CRUMINA = {};
 
class JoinUs extends Component {
    componentDidMount() {
        CRUMINA.Materialize = function () {
            $.material.init();
            $('.checkbox > label').on('click', function () {
                $(this).closest('.checkbox').addClass('clicked');
            })
        };
        $(document).ready(function () {
            CRUMINA.Materialize();
        });
        let self    = this;
        let phone   = document.querySelector("#phone");
        let email   = document.querySelector("#email");
        let terms   = document.querySelector("#terms");
        let intlTel = window.intlTelInput(phone, {
            initialCountry: "auto",
            utilsScript : '/static/intl-tel-input-14.0.6/build/js/utils.js',
            geoIpLookup: function(success, failure) {
                superagent.get('https://ipinfo.io').use(jsonp({timeout: 500})).end((err, res) => {
                console.log('Update...');    
                console.log(res);
                    if (err) { success('NG'); } else { success((res && res.body && res.body.country) ? res.body.country : 'NG'); }
                });
            },
            separateDialCode: true,
            formatOnDisplay: true,
            customPlaceholder: function(selectedCountryPlaceholder, selectedCountryData) {
                return  'Enter '+selectedCountryData.name+' phone number';
                //return selectedCountryPlaceholder;
            },
            autoPlaceholder: 'aggressive',
            formatOnDisplay: true
        });
        /*phone.addEventListener("countrychange", function() {
            let user     = Object.assign({}, self.props.home.user);
            //user.country = intlTel.getSelectedCountryData();
            delete user.country.priority;
            delete user.country.areaCodes;
            self.props.dispatch(setUser(user));
        });*/
        phone.addEventListener("blur", (e) => {
            let user = Object.assign({}, self.props.home.user);
            if (intlTel.isValidNumber()) { 
                e.target.parentElement.parentElement.classList.add("has-success");
                e.target.parentElement.parentElement.classList.remove("has-error");
                user.phone   = intlTel.getNumber();
                user.country = intlTel.getSelectedCountryData();
                delete user.country.priority;
                delete user.country.areaCodes;
            } else {
                e.target.parentElement.parentElement.classList.remove("has-success");
                delete user.phone;
                if (e.target.value.length > 0) {
                    e.target.parentElement.parentElement.classList.add("has-error");
                } else {
                    e.target.parentElement.parentElement.classList.remove("has-error");
                }
            }
            self.props.dispatch(setUser(user));
        });
        email.addEventListener("blur", (e) => {
            let user = Object.assign({}, self.props.home.user);
            if (e.target.value.length > 0 && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value) == true) {
                e.target.parentElement.classList.add("has-success");
                e.target.parentElement.classList.remove("has-error");
                user.email   = e.target.value;
                user.country = intlTel.getSelectedCountryData();
                delete user.country.priority;
                delete user.country.areaCodes;
            } else {
                e.target.parentElement.classList.remove("has-success");
                delete user.email;
                if (e.target.value.length > 0) {
                    e.target.parentElement.classList.add("has-error");
                } else {
                    e.target.parentElement.classList.remove("has-error");
                }
            }
            self.props.dispatch(setUser(user));
        });
        phone.addEventListener("keyup", function(e) {
            e.target.value = e.target.value.replace(/\D/g,'');
            if ((intlTel.isValidNumber() || (email.value.length > 0 && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value) == true)) && terms.checked) {
                self.props.dispatch(JoinBtnStatus(false));
            } else {
                self.props.dispatch(JoinBtnStatus(true));
            }
        });
        email.addEventListener("keyup", (e) => {
            if ((intlTel.isValidNumber() || (e.target.value.length > 0 && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value) == true)) && terms.checked) {
                self.props.dispatch(JoinBtnStatus(false));
            } else {
                self.props.dispatch(JoinBtnStatus(true));
            }
        });
        terms.addEventListener("change", (e) => {
            if ((intlTel.isValidNumber() || (email.value.length > 0 && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value) == true)) && e.target.checked) {//self.props.home.user.phone
                self.props.dispatch(JoinBtnStatus(false));
            } else {
                self.props.dispatch(JoinBtnStatus(true));
            }
        });
    }

    submitUser(e) {
        e.preventDefault();
        this.props.dispatch(joinError(null));
        let self  = this;
        let user  = Object.assign({}, this.props.home.user);
        let phone = document.querySelector("#phone");
        let email = document.querySelector("#email");
        let terms = e.target.querySelector("#terms");
        if (!user.phone && !user.email) {
            this.props.dispatch(joinError('Please! Enter an Active Phone Number'));
        } else {
            if (terms.checked) {
                this.props.dispatch(JoinBtnStatus(true));
                this.props.dispatch(JoinBtnCaption('Please Wait...'));
                superagent
                    .post(Config.API.URL+'/user/join')
                    .send(user)
                    .set('Accept', 'application/json')
                    .end((err, response) => {
                        if (err) {
                            self.props.dispatch(JoinBtnStatus(false));
                            console.log(err);
                        } else {
                            let res = response.body;
                            if (res.info.code == 201) {
                                phone.value = '';
                                email.value = '';
                                self.props.dispatch(setUser({}));
                                self.props.onCreate(res.user);
                            } else {
                                self.props.dispatch(joinError(res.info.msg));
                            }
                        }
                        self.props.dispatch(JoinBtnCaption('Submit'));
                    });
            } else {
                this.props.dispatch(joinError('You most accept our terms and conditions to Join Us'));
            }
        }
    }
    
    render () {
        return (
            <div class="default animated bounceIn">
                <div class="title h6">Enter your e-mail address or mobile number to login or register</div>
                <form class="needs-validation content" noValidate onSubmit={this.submitUser.bind(this)}>
                    <div class="error-report"><p>{ this.props.home.join_err }</p></div>

                    <div class="form-group label-floating is-select">
                        <label class="control-label"> E-mail address</label>
                        <input class="form-control" id="email" placeholder="Your active e-mail address" autoComplete="off" type="email" />
                    </div>

                    <div class="or"></div>
                    
                    <div class="form-group label-floating is-select">
                        <label class="control-label phone"> Mobile number</label>
                        <input class="form-control" id="phone" autoComplete="off" type="tel" autoFocus />
                    </div>

                    <div class="remember">
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" name="terms" id="terms" />
                                I accept your <a href="#">Terms and Conditions</a>
                            </label>
                        </div>
                    </div>

                    <button class="btn btn-lg btn-success full-width" disabled={ this.props.home.jbstat }>{ this.props.home.jbcapt }</button>
                        
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    home: state.home
});

export default connect(mapStateToProps)(JoinUs);