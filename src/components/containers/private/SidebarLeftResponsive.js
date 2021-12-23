import React, { Component } from 'react';
import Config from '../../../utils/Config';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PouchDB from 'pouchdb';

const db = new PouchDB('self');

class SidebarLeftResponsive extends Component {
    signout (e) {
        e.preventDefault();
        let self = this;
        db.get('jwt').then((doc) => { 
            return db.remove(doc); 
        }).then((result) => { 
            db.get('user').then((doc) => { return db.remove(doc); }).then((result) => { self.props.history.push('/join'); }); 
        });
        localStorage.removeItem('jwt');
        localStorage.removeItem('last-path');
        localStorage.removeItem('current-path');
    }
    render () {
        let data = this.props.data;
        return (
            <div class="fixed-sidebar fixed-sidebar-responsive">
                <div class="fixed-sidebar-left sidebar--small" id="sidebar-left-responsive">
                    <NavLink to="/owe" class="logo js-sidebar-open">
                        <img src="/static/logo/icon-50x50/white-50px.png" alt="Gistoneer" />
                    </NavLink>
                </div>
                <div class="fixed-sidebar-left sidebar--large" id="sidebar-left-1-responsive">
                    <NavLink to="/owe" class="logo">
                        <div class="img-wrap">
                            <img src="/static/logo/icon-50x50/white-50px.png" alt="Gistoneer" />
                        </div>
                        <div class="title-block">
                            <h6 class="logo-title custome-logo">Gistoneer</h6>
                            {/*<h6 class="logo-title">
                                <img src="/static/logo/g33.png" alt="Gistoneer" />
                            </h6>*/}
                        </div>
                    </NavLink>
                    <div class="mCustomScrollbar" data-mcs-theme="dark">
                        <div class="control-block">
                            <div class="author-page author vcard inline-items">
                                <div class="author-thumb">
                                    <img alt="author" src={data.avatar ? Config.FILES.AVATAR+'/'+data.avatar : '/static/icons/avatar.png'} class="avatar" />
                                    <span class="icon-status online"></span>
                                </div>
                                <NavLink to={`/owe/profile/${data.username}`} class="author-name fn">
                                    <div class="author-title">
                                        { data.fname+' '+data.lname } <svg class="olymp-dropdown-arrow-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-dropdown-arrow-icon"></use></svg>
                                    </div>
                                    <span class="author-subtitle">{ data.username }</span>
                                </NavLink>
                            </div>
                        </div>

                        <div class="ui-block-title ui-block-title-small">
                            <h6 class="title">MAIN SECTIONS</h6>
                        </div>
                        <ul class="left-menu">
                            <li>
                                <a href="#" class="js-sidebar-open">
                                    <svg class="olymp-close-icon left-menu-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-close-icon"></use></svg>
                                    <span class="left-menu-title">Collapse Menu</span>
                                </a>
                            </li>
                            <li>
                                <NavLink to="/owe">
                                    <svg class="olymp-newsfeed-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="STATUS">
                                        <use href="/static/svg-icons/sprites/icons.svg#olymp-newsfeed-icon"></use>
                                    </svg>
                                    <span class="left-menu-title">Status</span>
                                </NavLink>
                            </li>
                            {/*<li>
                                <a href="/audios">
                                    <svg class="olymp-headphones-icon left-menu-icon"  data-toggle="tooltip" data-placement="right" data-original-title="AUDIOS & PLAYLISTS">
                                        <use href="/static/svg-icons/sprites/icons.svg#olymp-headphones-icon"></use>
                                    </svg>
                                    <span class="left-menu-title">Audios</span>
                                </a>
                            </li>
                            */}
                            
                        </ul>

                        <div class="ui-block-title ui-block-title-small">
                            <h6 class="title">YOUR ACCOUNT</h6>
                        </div>

                        <ul class="account-settings">
                            {/*<li>
                                <NavLink to="/owe/settings">
                                    <svg class="olymp-menu-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-menu-icon"></use></svg>
                                    <span>Settings</span>
                                </NavLink>
                            </li>*/}
                            <li>
                                <a href="javascript:void(0)" onClick={this.signout.bind(this)}>
                                    <svg class="olymp-logout-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-logout-icon"></use></svg>
                                    <span>Signout</span>
                                </a>
                            </li>
                        </ul>
                        <div class="ui-block-title ui-block-title-small">
                            <h6 class="title">About Gistoneer</h6>
                        </div>
                        <ul class="about-olympus">
                            {/*<li><NavLink to="/owe/contact"><span>Contact</span></NavLink></li>
                            <li><NavLink to="/owe/faqs"><span>FAQs</span></NavLink></li>
                            <li><NavLink to="/owe/terms"><span>Terms and Conditions</span></NavLink></li>*/}
                        </ul>

                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    search: state.search,
    notifications: state.notifications
});

export default connect(mapStateToProps)(withRouter(SidebarLeftResponsive));