import React, { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Redirect } from 'react-router-dom';
import superagent from 'superagent';
import Config from '../../utils/Config';
import { setProfileData, setProfileHeader } from '../../actions/Profile';
import Loading from './Loading';

import './Profile.css';


const PrivateTopHeader = lazy(() => import('../containers/profile/PrivateTopHeader'));
const PublicTopHeader  = lazy(() => import('../containers/profile/PublicTopHeader'));
const Albums           = lazy(() => import('../containers/profile/Albums'));
const Followers        = lazy(() => import('../containers/profile/Followers'));
const Following        = lazy(() => import('../containers/profile/Following'));
const Info             = lazy(() => import('../containers/profile/Info'));
const EditAvatar       = lazy(() => import('../containers/profile/EditAvatar'));
const BrowseAvatar     = lazy(() => import('../containers/profile/BrowseAvatar'));
const EditCover        = lazy(() => import('../containers/profile/EditCover'));
const BrowseCover      = lazy(() => import('../containers/profile/BrowseCover'));

class Status extends Component {
    componentDidMount() {
        //Scroll to top.
        jQuery('.back-to-top').on('click', function () {
            $('html,body').animate({
                scrollTop: 0
            }, 1200);
            return false;
        });
        let self = this;
        superagent
            .get(Config.API.URL+'/profile/'+this.props.match.params.username)
            .set('x-access-jwt', localStorage.getItem('jwt'))
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    if (res.body.info.code == 200) {
                        self.props.dispatch(setProfileData(res.body.profile));
                        let header = Object.assign({}, res.body.profile);
                        delete header.contacts;
                        delete header.followers;
                        delete header.following;
                        delete header.notifications;
                        delete header.otp;
                        delete header.albums;
                        delete header.logins;
                        delete header.role;
                        self.props.dispatch(setProfileHeader(header));
                    } else if (res.body.info.code == 401 || res.body.info.code == 403) {
                        self.props.history.push('/join');
                    }
                }
            });
    }
    render () {
        let data     = this.props.profile.data;
        let username = this.props.match.params.username;
        return (
            <div>
                <Suspense fallback={<Loading stage="Loading..." />}>
                    { data.role == 'self' ? <PrivateTopHeader /> : <PublicTopHeader /> }
                    <Route path='/owe/profile/:username/albums' render={() => { return(<Albums />) } } />
                    <Route path='/owe/profile/:username/followers' render={() => { return(<Followers />) } } />
                    <Route path='/owe/profile/:username/following' render={() => { return(<Following />) } } />
                    <Route path='/owe/profile/:username/about' render={() => { return(<Info />) } } />
                    <Route path="/owe/profile/:username" render={() => <Redirect to={`/owe/profile/${username}/albums`} />} exact />
                </Suspense>

                <EditAvatar />
                <BrowseAvatar />
                <EditCover />
                <BrowseCover />
                <div class="floating-btn-wraper">
                    <button class="floating-btn back-to-top"><span class="ion-android-arrow-up back-icon"></span></button>
                    {/**<button class="floating-btn post-status"><span class="ion-compose back-icon"></span></button>data-toggle="modal" data-target="#create-photo-album" */ }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    status: state.status,
    profile: state.profile
});

export default connect(mapStateToProps)(withRouter(Status));