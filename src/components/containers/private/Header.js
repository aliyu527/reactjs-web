import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Config from '../../../utils/Config';
import { connect } from 'react-redux';
import superagent from 'superagent';
import { setNotificationData, setUnseenNotification } from '../../../actions/Notifications';
import { setSearchKeywords } from '../../../actions/Search';
import moment from 'moment';
import PouchDB from 'pouchdb';

const db = new PouchDB('self');

class Header extends Component {
    constructor () {
        super();
        this.state = {
            search: {
                keywords: ''
            }
        }
    }
    componentDidMount () {
        //setInterval(this.notifications.bind(this), 5000);
        $('.mCustomScrollbar').perfectScrollbar({wheelPropagation:false});
        this.notifications();
    }
    notifications () {
        let self = this;
        superagent
            .get(Config.API.URL+'/user/notifications/all')
            .set('x-access-jwt', localStorage.getItem('jwt'))
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    if (res.body.info.code == 200) {
                        let payload = res.body.payload;
                        payload.notifications.reverse();
                        self.props.dispatch(setNotificationData(payload.notifications));
                        self.props.dispatch(setUnseenNotification(payload.unseencount));
                    }
                }
            });
    }
    markAsSeen () {
        let self = this;
        superagent
            .get(Config.API.URL+'/user/notifications/markasseen')
            .set('x-access-jwt', localStorage.getItem('jwt'))
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    if (res.body.info.code == 200) {
                        self.props.dispatch(setUnseenNotification(0));
                    }
                }
            });
    }
    updateKeywords (e) {        
        this.props.dispatch(setSearchKeywords(e.target.value));
        if (e.target.value.length <= 0) {
            if (localStorage.getItem('last-path')) {
                this.props.history.push(localStorage.getItem('last-path'));
            } else {
                this.props.history.push('/owe');
            }
        }
    }
    search (e) {
        e.preventDefault();
        let keywords = this.props.search.keywords;
        if (keywords.length > 0) {
            this.props.history.push('/owe/search/'+keywords);
        }
    }
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
        let data          = this.props.data;
        let notifications = Object.assign([], this.props.notifications.data);
        let unseencount   = this.props.notifications.unseencount;
        return (
            <header class="header" id="site-header">
                <div class="page-title"><h6>Status</h6></div>
                <div class="header-content-wrapper">
                    <form class="search-bar w-search notification-list friend-requests" onSubmit={this.search.bind(this)}>
                        <div class="form-group with-button">
                            <input class="form-control" placeholder="Search People or Media here..." value={this.props.search.keywords} onChange={this.updateKeywords.bind(this)} type="text" /> {/* js-user-search */}
                            <button>
                                <svg class="olymp-magnifying-glass-icon">
                                    <use href="/static/svg-icons/sprites/icons.svg#olymp-magnifying-glass-icon"></use>
                                </svg>
                            </button>
                        </div>
                    </form>

                    <NavLink to="/owe/people" class="link-find-friend">People</NavLink>
                    <div class="control-block">
                        {/*<div class="control-icon more has-items">
                            <div class="olymp-chat---messages-icon custom-icon">
                                <i class="ion-ios-chatboxes-outline"></i>
                            </div>
                            <div class="label-avatar bg-purple">2</div>

                            <div class="more-dropdown more-with-triangle triangle-top-center">
                                <div class="ui-block-title ui-block-title-small">
                                    <h6 class="title">Chat / Messages</h6>
                                    <a href="#">Mark all as read</a>
                                    <a href="#">Settings</a>
                                </div>

                                <div class="mCustomScrollbar" data-mcs-theme="dark">
                                    <ul class="notification-list chat-message">
                                        <li class="message-unread">
                                            <div class="author-thumb">
                                                <img src="/static/img/avatar59-sm.jpg" alt="author"/>
                                            </div>
                                            <div class="notification-event">
                                                <a href="#" class="h6 notification-friend">Shafa'tu Aminu</a>
                                                <span class="chat-message-item">Hi Aliyu! It’s Shafaatu, I just wanted to let you know that we have to reschedule...</span>
                                                <span class="notification-date"><time class="entry-date updated" dateTime="2004-07-24T18:18">4 hours ago</time></span>
                                            </div>
                                            <span class="notification-icon">
                                                <svg class="olymp-chat---messages-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use></svg>
                                            </span>
                                            <div class="more">
                                                <svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
                                            </div>
                                        </li>

                                        <li>
                                            <div class="author-thumb">
                                                <img src="/static/img/avatar60-sm.jpg" alt="author"/>
                                            </div>
                                            <div class="notification-event">
                                                <a href="#" class="h6 notification-friend">Aminu Aminu</a>
                                                <span class="chat-message-item">Great, I’ll see you tomorrow!.</span>
                                                <span class="notification-date"><time class="entry-date updated" dateTime="2004-07-24T18:18">4 hours ago</time></span>
                                            </div>
                                            <span class="notification-icon">
                                                <svg class="olymp-chat---messages-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use></svg>
                                            </span>

                                            <div class="more">
                                                <svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="author-thumb">
                                                <img src="/static/img/avatar61-sm.jpg" alt="author"/>
                                            </div>
                                            <div class="notification-event">
                                                <a href="#" class="h6 notification-friend">Hauwa'u Muhammad</a>
                                                <span class="chat-message-item">We’ll have to check that at the office and see if the client is on board with...</span>
                                                <span class="notification-date"><time class="entry-date updated" dateTime="2004-07-24T18:18">Yesterday at 9:56pm</time></span>
                                            </div>
                                            <span class="notification-icon">
                                                <svg class="olymp-chat---messages-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use></svg>
                                            </span>
                                            <div class="more">
                                                <svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
                                            </div>
                                        </li>

                                        <li class="chat-group">
                                            <div class="author-thumb">
                                                <img src="/static/img/avatar11-sm.jpg" alt="author"/>
                                                <img src="/static/img/avatar12-sm.jpg" alt="author"/>
                                                <img src="/static/img/avatar13-sm.jpg" alt="author"/>
                                                <img src="/static/img/avatar10-sm.jpg" alt="author"/>
                                            </div>
                                            <div class="notification-event">
                                                <a href="#" class="h6 notification-friend">You, Hamza, Amina &amp; +3</a>
                                                <span class="last-message-author">Hamza:</span>
                                                <span class="chat-message-item">Yeah! Seems fine by me!</span>
                                                <span class="notification-date"><time class="entry-date updated" dateTime="2004-07-24T18:18">March 16th at 10:23am</time></span>
                                            </div>
                                            <span class="notification-icon">
                                                <svg class="olymp-chat---messages-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use></svg>
                                            </span>
                                            <div class="more">
                                                <svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <a href="#" class="view-all bg-purple">View All Messages</a>
                            </div>
                        </div>*/}

                        <div class="control-icon more has-items">
                            <div onMouseOver={this.markAsSeen.bind(this)} onMouseDown={this.markAsSeen.bind(this)} class="olymp-photos-icon custom-icon">
                                <i class="ion-ios-bell-outline"></i>
                            </div>
                            <div class={unseencount > 0 ? `label-avatar bg-google`:`d-none`}>{ unseencount }</div>
                            <div class="more-dropdown more-with-triangle triangle-top-center">
                                <div class="ui-block-title ui-block-title-small">
                                    <h6 class="title">Notifications</h6>
                                    {/*<a href="#">Mark all as read</a>
                                    <a href="#">Settings</a>*/}
                                </div>

                                <div class="mCustomScrollbar" data-mcs-theme="dark">
                                    <ul class="notification-list">
                                        {notifications.map((notification, i) => {
                                            let user = notification.user, icon;
                                            if (notification.type == 'comment') {
                                                icon = 'comments-post';
                                            } else if (notification.type == 'like')  {
                                                icon = 'heart';
                                            } else {
                                                icon = 'happy-face';
                                            }
                                            return (
                                                <li class={notification.status == 1?`un-read`:``} key={i}>
                                                    <div class="author-thumb">
                                                        <img src={user.avatar ? Config.FILES.AVATAR+'/'+user.avatar : '/static/icons/avatar.png'} alt="author"/>
                                                    </div>
                                                    <div class="notification-event">
                                                        <div>
                                                            <NavLink to={`/owe/profile/${user.username}`} class="h6 notification-friend">{ user.fname+' '+user.lname }</NavLink> { notification.text } 
                                                            {/*<a href="#" class="notification-link">profile status</a>.*/}
                                                        </div>
                                                        <span class="notification-date"><time class="entry-date updated" dateTime={notification.datetime}>{moment(notification.datetime).fromNow()}</time></span>
                                                    </div>
                                                    <span class="notification-icon">
                                                        <svg class={`olymp-${icon}-icon`}><use href={`/static/svg-icons/sprites/icons.svg#olymp-${icon}-icon`}></use></svg>
                                                    </span>

                                                    <div class="more">
                                                        <svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
                                                        <svg class="olymp-little-delete"><use href="/static/svg-icons/sprites/icons.svg#olymp-little-delete"></use></svg>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                        {/*
                                        <li>
                                            <div class="author-thumb">
                                                <img src="/static/img/avatar62-sm.jpg" alt="author"/>
                                            </div>
                                            <div class="notification-event">
                                                <div><a href="#" class="h6 notification-friend">Musa Iliya</a> commented on your new <a href="#" class="notification-link">profile status</a>.</div>
                                                <span class="notification-date"><time class="entry-date updated" dateTime="2004-07-24T18:18">4 hours ago</time></span>
                                            </div>
                                            <span class="notification-icon">
                                                <svg class="olymp-comments-post-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use></svg>
                                            </span>

                                            <div class="more">
                                                <svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
                                                <svg class="olymp-little-delete"><use href="/static/svg-icons/sprites/icons.svg#olymp-little-delete"></use></svg>
                                            </div>
                                        </li>

                                        <li class="un-read">
                                            <div class="author-thumb">
                                                <img src="/static/img/avatar63-sm.jpg" alt="author"/>
                                            </div>
                                            <div class="notification-event">
                                                <div>You and <a href="#" class="h6 notification-friend">Auwal Aminu</a> just became friends. Write on <a href="#" class="notification-link">his wall</a>.</div>
                                                <span class="notification-date"><time class="entry-date updated" dateTime="2004-07-24T18:18">9 hours ago</time></span>
                                            </div>
                                            <span class="notification-icon">
                                                <svg class="olymp-happy-face-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use></svg>
                                            </span>

                                            <div class="more">
                                                <svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
                                                <svg class="olymp-little-delete"><use href="/static/svg-icons/sprites/icons.svg#olymp-little-delete"></use></svg>
                                            </div>
                                        </li>

                                        <li class="with-comment-photo">
                                            <div class="author-thumb">
                                                <img src="/static/img/avatar64-sm.jpg" alt="author"/>
                                            </div>
                                            <div class="notification-event">
                                                <div><a href="#" class="h6 notification-friend">Umar Usman</a> commented on your <a href="#" class="notification-link">photo</a>.</div>
                                                <span class="notification-date"><time class="entry-date updated" dateTime="2004-07-24T18:18">Yesterday at 5:32am</time></span>
                                            </div>
                                            <span class="notification-icon">
                                                <svg class="olymp-comments-post-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use></svg>
                                            </span>

                                            <div class="comment-photo">
                                                <img src="/static/img/comment-photo1.jpg" alt="photo"/>
                                                <span>“She looks incredible in that outfit! We should see each...”</span>
                                            </div>

                                            <div class="more">
                                                <svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
                                                <svg class="olymp-little-delete"><use href="/static/svg-icons/sprites/icons.svg#olymp-little-delete"></use></svg>
                                            </div>
                                        </li>

                                        <li>
                                            <div class="author-thumb">
                                                <img src="/static/img/avatar65-sm.jpg" alt="author"/>
                                            </div>
                                            <div class="notification-event">
                                                <div><a href="#" class="h6 notification-friend">Muhammad Ibrahim</a> invited you to attend to his event Goo in <a href="#" class="notification-link">Gotham Bar</a>.</div>
                                                <span class="notification-date"><time class="entry-date updated" dateTime="2004-07-24T18:18">March 5th at 6:43pm</time></span>
                                            </div>
                                            <span class="notification-icon">
                                                <svg class="olymp-happy-face-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use></svg>
                                            </span>

                                            <div class="more">
                                                <svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
                                                <svg class="olymp-little-delete"><use href="/static/svg-icons/sprites/icons.svg#olymp-little-delete"></use></svg>
                                            </div>
                                        </li>

                                        <li>
                                            <div class="author-thumb">
                                                <img src="/static/img/avatar66-sm.jpg" alt="author"/>
                                            </div>
                                            <div class="notification-event">
                                                <div><a href="#" class="h6 notification-friend">Ladi Haruna</a> commented on your new <a href="#" class="notification-link">profile status</a>.</div>
                                                <span class="notification-date"><time class="entry-date updated" dateTime="2004-07-24T18:18">March 2nd at 8:29pm</time></span>
                                            </div>
                                            <span class="notification-icon">
                                                <svg class="olymp-heart-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-heart-icon"></use></svg>
                                            </span>

                                            <div class="more">
                                                <svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
                                                <svg class="olymp-little-delete"><use href="/static/svg-icons/sprites/icons.svg#olymp-little-delete"></use></svg>
                                            </div>
                                        </li>
                                        */}
                                    </ul>
                                </div>

                                {/*<a href="#" class="view-all bg-primary">View All Notifications</a>*/}
                            </div>
                        </div>

                        <div class="author-page author vcard inline-items more">
                            <div class="author-thumb">
                                <NavLink to={`/owe/profile/${data.username}`}>
                                    <img alt="author" src={data.avatar ? Config.FILES.AVATAR+'/'+data.avatar : '/static/icons/avatar.png'} class="avatar"/>
                                </NavLink>
                                <span class="icon-status online"></span>
                                <div class="more-dropdown more-with-triangle">
                                    <div class="mCustomScrollbar" data-mcs-theme="dark">
                                        <div class="ui-block-title ui-block-title-small">
                                            <h6 class="title">Your Account</h6>
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
                                        {/*
                                        <div class="ui-block-title ui-block-title-small">
                                            <h6 class="title">Chat Settings</h6>
                                        </div>

                                        <ul class="chat-settings">
                                            <li><a href="#"><span class="icon-status online"></span><span>Online</span></a></li>
                                            <li><a href="#"><span class="icon-status away"></span><span>Away</span></a></li>
                                            <li><a href="#"><span class="icon-status disconected"></span><span>Offline</span></a></li>
                                            <li><a href="#"><span class="icon-status status-invisible"></span><span>Invisible</span></a></li>
                                        </ul>
                                        */}
                                        {/*<!--
                                        <div class="ui-block-title ui-block-title-small">
                                            <h6 class="title">Custom Status</h6>
                                        </div>

                                        <form class="form-group with-button custom-status">
                                            <input class="form-control" placeholder="" type="text" value="Space Cowboy">

                                            <button class="bg-purple">
                                                <svg class="olymp-check-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-check-icon"></use></svg>
                                            </button>
                                        </form>

                                        -->
                                        <div class="ui-block-title ui-block-title-small">
                                            <h6 class="title">About Gistoneer</h6>
                                        </div>*/}

                                        <ul>
                                            {/*
                                            <li><NavLink to="/owe/terms"><span>Terms and Conditions</span></NavLink></li>
                                            
                                            <li><NavLink to="/owe/contact"><span>Contact</span></NavLink></li>
                                            <li><NavLink to="/owe/faqs"><span>FAQs</span></NavLink></li>
                                            */}
                                        </ul>
                                    </div>

                                </div>
                            </div>
                            <NavLink to={`/owe/profile/${data.username}`} class="author-name fn">
                                <div class="author-title">
                                    { data.fname+' '+data.lname } <svg class="olymp-dropdown-arrow-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-dropdown-arrow-icon"></use></svg>
                                </div>
                                <span class="author-subtitle">@{ data.username }</span>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

const mapStateToProps = state => ({
    search: state.search,
    notifications: state.notifications
});

export default connect(mapStateToProps)(withRouter(Header));