import React, { Component } from 'react';
import Config from '../../../../utils/Config';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

class Author extends Component {
    render () {
        let files  = this.props.files;
        let user   = this.props.user;
        let time   = this.props.updated_at;
        let type   = this.props.type;
        let header = () => {
            if (type == 'avatar') {
                return (' - Changed a Profile Picture');
            } else if(type == 'cover') {
                return (' - Changed a Profile Cover');
            } else {
                if (files.length > 1) {
                    return (' - uploaded new album with '+ files.length+' files');
                }
            }
        }
        return (
            <div class="post__author author vcard inline-items">
                <img src={user.avatar ? Config.FILES.AVATAR+'/'+user.avatar : '/static/icons/avatar.png'} alt="author" />
                <div class="author-date">
                    <NavLink class="h6 post__author-name fn" to={`/owe/profile/${user.username}`}>{ user.fname+' '+user.lname }</NavLink> @{user.username } { header() }
                    <div class="post__date">
                        <time class="published" dateTime={time}>{ moment(time).fromNow() }</time>
                    </div>
                </div>
                {/*
                <div class="more"><svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
                    <ul class="more-dropdown">
                        <li><a href="#">Edit Post</a></li>
                        <li><a href="#">Delete Post</a></li>
                        <li><a href="#">Turn Off Notifications</a></li>
                        <li><a href="#">Select as Featured</a></li>
                    </ul>
                </div>
                */}
        
            </div>
        )
    }
}

export default Author;