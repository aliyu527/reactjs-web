import React, { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { setUserData, setUserToken } from '../../actions/Self';
import { Route, withRouter, Redirect } from 'react-router-dom';
import PouchDB from 'pouchdb';
import Loading from '../layout/Loading';

import './IsAuth.css';

const db                     = new PouchDB('self');
const SidebarLeft            = lazy(() => import('../containers/private/SidebarLeft'));
const SidebarLeftResponsive  = lazy(() => import('../containers/private/SidebarLeftResponsive'));
const SidebarRight           = lazy(() => import('../containers/private/SidebarRight'));
const SidebarRightResponsive = lazy(() => import('../containers/private/SidebarRightResponsive'));
const Header                 = lazy(() => import('../containers/private/Header'));
const HeaderResponsive       = lazy(() => import('../containers/private/HeaderResponsive'));

const Status                 = lazy(() => import('../layout/Status'));
const Profile                = lazy(() => import('../layout/Profile'));
const People                 = lazy(() => import('../layout/People'));
const Search                 = lazy(() => import('../layout/Search'));
const Settings               = lazy(() => import('../layout/Settings'));

const OpenAlbumPopupV2       = lazy(() => import('../containers/OpenAlbumPopupV2'));

class IsAuth extends Component {
    componentDidMount() {
        let self = this;
        let auth = { jwt: false, user: false };
        db.allDocs({include_docs: true}).then((result) => {
            if (result.total_rows >= 2) {
                result.rows.forEach((row, i) => {
                    if (row.id == 'jwt') { self.props.dispatch(setUserToken(row.doc.jwt)); auth.jwt = true; localStorage.setItem('jwt', row.doc.jwt) }
                    if (row.id == 'user') { self.props.dispatch(setUserData(row.doc.user)); auth.user = true; }
                    if (result.rows.length-1 == i && (!auth.jwt || !auth.user)) { self.props.history.push('/join'); }
                });
            } else {
                self.props.history.push('/join');
            }
        }).catch((err) => {
            self.props.history.push('/join');
        });
    }
    render() {
        return (
            <>
                <SidebarLeft />
                <SidebarLeftResponsive data={ this.props.self.data } />

                {/*<SidebarRight />*/}
                {/*<SidebarRightResponsive data={ this.props.self.data } />*/}

                <Header data={ this.props.self.data} />
                <HeaderResponsive data={ this.props.self.data} />
                
                <div class="header-spacer"></div> 

                <Suspense fallback={<Loading stage="Loading.." />}>
                    <Route path='/owe/status' render={() => { return(<Status key={Date.now()} />) } } />
                    <Route path='/owe/people' exact render={() => { return(<People key={Date.now()} />) } } />
                    <Route path='/owe/profile/:username' render={() => { return(<Profile key={Date.now()} />) } } />
                    <Route path='/owe/search/:keywords' render={() => { return(<Search key={Date.now()} />) } } />
                    <Route path='/owe/settings' render={() => { return(<Settings key={Date.now()} />) } } />
                    <Route path="/owe" render={() => <Redirect to="/owe/status" />} exact />
                </Suspense>
                <OpenAlbumPopupV2 />
            </>
        )
    }
}
const mapStateToProps = state => ({
    home : state.home,
    self : state.self
});
export default connect(mapStateToProps)(withRouter(IsAuth));;