import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import superagent from 'superagent';
import Config from '../../utils/Config';
import PouchDB from 'pouchdb';
import Splash from './Splash';

const db = new PouchDB('self');

import './Landing.css';

class Landing extends Component {
    componentDidMount() {
        let self = this;
        db.get('jwt').then((doc) => {
            superagent
                .get(Config.API.URL+'/user/self')
                .set('x-access-jwt', doc.jwt)
                .set('Accept', 'application/json')
                .end((err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        if (res.body) {
                            if (res.body.info.code == 200) {
                                let user = res.body.data; if (user) { delete user.__v; }
                                db.get('user').then((doc) => { 
                                    return db.put({_id: 'user', _rev: doc._rev, user:user}); 
                                }).then((response) => { 
                                    self.props.history.push('/owe');
                                }).catch((err) => {
                                    if (err.status == 404) {
                                        db.put({_id:'user', user:user}).then((response) => { 
                                            self.props.history.push('/owe');
                                        });
                                    }
                                });
                            } else {
                                self.props.history.push('/join');
                            }
                        } else {
                            console.log('Something is wrong! Check your internet');
                            //self.props.history.push('/join');
                        }
                    }
                });
        }).catch((err) => {
            self.props.history.push('/join');
        });
        
    }
    render() {
        return (<Splash stage="Loading.." />)
    }
}
const mapStateToProps = state => ({
    home : state.home,
    self : state.self
});
export default connect(mapStateToProps)(withRouter(Landing));;