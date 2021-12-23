import React, { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setUserData, setUserToken } from '../../actions/Self';
import PouchDB from 'pouchdb';

import Splash from './Splash';

import './Home.css';

const db      = new PouchDB('self');
const Header  = lazy(() => import('../containers/home/Header'));
const Content = lazy(() => import('../containers/home/Content'));

class Home extends Component {
    componentDidMount() {
        let self = this;
        let auth = { jwt: false, user: false };
        db.allDocs({include_docs: true}).then((result) => {
            if (result.total_rows >= 2) {
                result.rows.forEach((row, i) => {
                    if (row.id == 'jwt') { self.props.dispatch(setUserToken(row.doc.jwt)); auth.jwt = true; }
                    if (row.id == 'user') { self.props.dispatch(setUserData(row.doc.user)); auth.user = true; }
                    if (result.rows.length-1 == i && auth.jwt && auth.user) { self.props.history.push('/owe'); }
                });
            }
        }).catch((err) => {});
    }
    render() {
        return (
            <Suspense fallback={<Splash stage="Loading..." />}>
                <div class="landing-page">
                    <Header />
                    
                    
                    <div class="header-spacer--standard"></div>
                    <Content />
                </div>
            </Suspense>
        )
    }
}
const mapStateToProps = state => ({
    home : state.home,
    self : state.self
});
export default connect(mapStateToProps)(withRouter(Home));