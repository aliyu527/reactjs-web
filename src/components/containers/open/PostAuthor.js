import React, { Component } from 'react';
import { connect } from 'react-redux';
import Config from '../../../utils/Config';
import moment from 'moment';
import { NavLink } from 'react-router-dom';

class PostAuthor extends Component {
    render () {
        let user = this.props.user;
        let time = this.props.updated_at;
        return (
            <div class="post__author author vcard inline-items">
                <span class="bordered-author"><img src={user.avatar ? Config.FILES.AVATAR+'/'+user.avatar : '/static/icons/avatar.png'} alt="author"/></span>
                <div class="author-date">
                    <NavLink class="h6 post__author-name fn" to={`/owe/profile/${user.username}`}>{user.fname+ ' ' +user.lname}</NavLink>
                    <div class="post__date">
                        <time class="published" dateTime={time}>{ moment(time).fromNow() }</time>
                    </div>
                </div>

                {/*<div class="more"><svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
                    <ul class="more-dropdown">
                        <li><a href="#">Delete Post</a></li>
                    </ul>
                </div>*/}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    home: state.home
});
export default connect(mapStateToProps)(PostAuthor);