import React, { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { setTemp } from '../../../actions/Home';
import { withRouter } from 'react-router-dom';
import PouchDB from 'pouchdb';

const db      = new PouchDB('self');
const CRUMINA = {};

const JoinUs  = lazy(() => import('../../presentation/home/JoinUs'));
const OTP     = lazy(() => import('../../presentation/home/OTP'));
const Signup  = lazy(() => import('../../presentation/home/Signup'));

class Content extends Component {
    constructor () {
        super();
        this.state = {
            stage: 'joinus'
        }
    }
    componentDidMount () {
        let self = this;
        CRUMINA.Materialize = function () {
            $.material.init();
            $('.checkbox > label').on('click', function () {
                $(this).closest('.checkbox').addClass('clicked');
            })
        };
        $(document).ready(function () {
            CRUMINA.Materialize();
        });
        db.get('temp').then((doc) => {
            self.props.dispatch(setTemp(doc.temp));
            self.setState({stage:'otp'});
        }).catch((err) => {
            if (err.status == 404) {} else {
                //console.log(err);
            }
        });
    }
    join (user) {
        this.props.dispatch(setTemp(user));
        // Change stage to OTP stage
        this.setState({stage:'otp'});
        db.get('temp').then((doc) => {
            return db.put({_id: 'temp', _rev: doc._rev, temp:user});
        }).then((response) => {
            //console.log(response);
        }).catch((err) => {
            if (err.status == 404) {
                return db.put({_id:'temp', temp:user});
            } else {
                //console.log(err);
            }
        });
    }
    auth (payload) {
        let self = this;
        if (!payload.profile.fname || !payload.profile.lname || !payload.profile.username) {
            // Change Stage to sign up
            self.setState({stage:'signup'});
        } else {
            db.get('temp').then((doc) => { return db.remove(doc); }).then((result) => { 
                localStorage.setItem('jwt', payload.jwt);
                db.bulkDocs([{jwt:payload.jwt, _id:'jwt'}, {user:payload.profile, _id:'user'}]).then((result) => {
                    self.props.dispatch(setTemp({}));
                    if (localStorage.getItem('current-path')) {
                        self.props.history.push(localStorage.getItem('current-path'));
                    } else {
                        self.props.history.push('/owe');
                    }
                }).catch((err) => { });
            }).catch((err) => { });
        }
    }
    enter (payload) {
        let self = this;
        db.get('temp').then((doc) => { return db.remove(doc); }).then((result) => {
            localStorage.setItem('jwt', payload.jwt);
            db.bulkDocs([{jwt:payload.jwt, _id:'jwt'}, {user:payload.profile, _id:'user'}]).then((result) => {
                self.props.dispatch(setTemp({}));
                self.props.history.push('/owe');
            }).catch((err) => { });
        }).catch((err) => {  });
        
    }
    cancel (res) {
        this.setState({stage:'joinus'});
    }
    render () {
        let stage = () => {
            if (this.state.stage == 'signup') {
                return (<Signup onCreate={this.enter.bind(this)} />);
            } else if(this.state.stage == 'otp') {
                return (<OTP onCreate={this.auth.bind(this)} onCancel={this.cancel.bind(this)} />);
            } else {
                return (<JoinUs onCreate={this.join.bind(this)} />);
            }
        }
        return (
            <div class="container">
                <div class="row display-flex">
                    <div class="col col-xl-7 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div class="landing-content">
                            <h4>Free mp3, mp4 and images sharing social networking service. However, we intend not to limit our services to music.</h4>
                        </div>
                    </div>

                    <div class="col col-xl-5 col-lg-6 col-md-12 col-sm-12 col-12">
                        <Suspense fallback={<div>Loading...</div>}>
                            <div class="registration-login-form">
                                    { stage() }
                            </div>
                        </Suspense>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    home: state.home
});

export default connect(mapStateToProps)(withRouter(Content));