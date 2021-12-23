import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Config from '../../../utils/Config';
import { connect } from 'react-redux';
import superagent from 'superagent';
import { setNotificationData, setUnseenNotification } from '../../../actions/Notifications';
import { setSearchResult, setSearchKeywords } from '../../../actions/Search';
import moment from 'moment';

class HeaderResponsive extends Component {
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
        this.notifications();

        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            var target = $(e.target).attr("href"); // activated tab
            if('#events' === target){
                $('.fc-state-active').click();
            }
        });

        // Close active tab on second click.
        $('[data-toggle=tab]').on('click', function(){
            /*$body.toggleClass('body--fixed');*/
            if ($(this).hasClass('active') && $(this).closest('ul').hasClass('mobile-app-tabs')){
                $($(this).attr("href")).toggleClass('active');
                $(this).removeClass('active');
                return false;
            }
        });

        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            var target = $(e.target).attr("href"); // activated tab
            if('#events' === target){
                $('.fc-state-active').click();
            }
        });
        
        $('.mCustomScrollbar').perfectScrollbar({wheelPropagation:false});

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
        localStorage.removeItem('jwt');
        localStorage.removeItem('last-path');
        localStorage.removeItem('current-path');
        this.props.history.push('/');
    }
    render () {
        let data          = this.props.data;
        let notifications = Object.assign([], this.props.notifications.data);
        let unseencount   = this.props.notifications.unseencount;
        return (
            <header class="header header-responsive" id="site-header-responsive">
                <div class="header-content-wrapper">
                    <ul class="nav nav-tabs mobile-app-tabs" role="tablist">
                        <li class="nav-item">
                            <NavLink class="nav-link" to={`/owe`}>
                                <div class="control-icon has-items">
                                    <div class="olymp-chat---messages-icon custom-icon">
                                        <i class="ion-ios-home"></i>
                                    </div>
                                </div>
                            </NavLink>
                        </li>
                        {/*<li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#chat" role="tab">
                                <div class="control-icon has-items">
                                    <div class="olymp-chat---messages-icon custom-icon">
                                        <i class="ion-android-chat"></i>
                                    </div>
                                    <div class="label-avatar bg-google">8</div>
                                </div>
                            </a>
                        </li>*/}

                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#search" role="tab">
                                <div class="olymp-magnifying-glass-icon custom-icon open-seach"><i class="ion-ios-search"></i> {/*<use href="/static/svg-icons/sprites/icons.svg#olymp-magnifying-glass-icon"></use>*/}</div>
                                <div class="olymp-close-icon custom-icon"><i class="ion-ios-close-empty"></i>{/*<use href="/static/svg-icons/sprites/icons.svg#olymp-close-icon"></use>*/}</div>
                            </a>
                        </li>

                        <li class="nav-item">
                            <NavLink class="nav-link" to={`/owe/people`}>
                                <div class="control-icon has-items">
                                    <div class="olymp-chat---messages-icon custom-icon">
                                        <i class="ion-person-stalker"></i>
                                    </div>
                                </div>
                            </NavLink>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" onMouseDown={this.markAsSeen.bind(this)} href="#notification" role="tab">
                                <div class="control-icon has-items">
                                    <div class="olymp-notifications-icon custom-icon">
                                        <i class="ion-ios-bell-outline"></i>
                                    </div>
                                    <div class={unseencount > 0 ? `label-avatar bg-google`: `d-none`}>{ unseencount }</div>
                                </div>
                            </a>
                        </li>

                        <li class="nav-item">
                            <NavLink class="nav-link" to={`/owe/profile/${data.username}`}>
                                <div class="control-icon has-items">
                                    <div class="olymp-chat---messages-icon custom-icon">
                                        <i class="ion-person"></i>
                                    </div>
                                </div>
                            </NavLink>
                        </li>

                    </ul>
                </div>

                {/*<!-- Tab panes -->*/}
                <div class="tab-content tab-content-responsive">
                    <div class="tab-pane " id="chat" role="tabpanel">
                        <div class="mCustomScrollbar" data-mcs-theme="dark">
                            <div class="ui-block-title ui-block-title-small">
                                <h6 class="title">Chat / Messages</h6>
                                <a href="#">Mark all as read</a>
                                <a href="#">Settings</a>
                            </div>

                            <ul class="notification-list chat-message">
                                <li class="message-unread">
                                    <div class="author-thumb">
                                        <img src="/static/img/avatar59-sm.jpg" alt="author"/>
                                    </div>
                                    <div class="notification-event">
                                        <a href="#" class="h6 notification-friend">Aliyu Aminu</a>
                                        <span class="chat-message-item">Hi Musa! It’s Aliyu, I just wanted to let you know that we have to reschedule...</span>
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
                                        <a href="#" class="h6 notification-friend">Umar Lawal</a>
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
                                        <a href="#" class="h6 notification-friend">Hassan Abdulhamid</a>
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
                                        <a href="#" class="h6 notification-friend">You, Umar, Musa &amp; Usman +3</a>
                                        <span class="last-message-author">Usman:</span>
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

                            <a href="#" class="view-all bg-purple">View All Messages</a>
                        </div>

                    </div>

                    <div class="tab-pane " id="notification" role="tabpanel">

                        <div class="mCustomScrollbar" data-mcs-theme="dark">
                            <div class="ui-block-title ui-block-title-small">
                                <h6 class="title">Notifications</h6>
                                {/*<a href="#">Mark all as read</a>
                                <a href="#">Settings</a>*/}
                            </div>

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
                            </ul>

                            {/*<a href="#" class="view-all bg-primary">View All Notifications</a>*/}
                        </div>

                    </div>

                    <div class="tab-pane " id="search" role="tabpanel">
                        <form class="search-bar w-search notification-list friend-requests" onSubmit={this.search.bind(this)}>
                            <div class="form-group with-button">
                                <input class="form-control js-user-search" placeholder="Search People or Media here..." value={this.props.search.keywords} onChange={this.updateKeywords.bind(this)} type="text"/>
                            </div>
                        </form>
                    </div>
                </div>
                {/*<!-- ... end  Tab panes -->*/}
            </header>
        )
    }
}

const mapStateToProps = state => ({
    search: state.search,
    notifications: state.notifications
});

export default connect(mapStateToProps)(withRouter(HeaderResponsive));