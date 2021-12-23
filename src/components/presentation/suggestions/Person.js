import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import Config from '../../../utils/Config';

class Person extends Component {
    follow (e) {
        e.preventDefault();
        this.props.onFollow(Object.assign({}, this.props.person, {index: this.props.index}));
    }
    render () {
        let person    = this.props.person;
        let self      = this.props.self.data;
        let followSta = () => {
            if (self._id && person.followers.length > 0) {
                for (let i = 0; i < person.followers.length; i++) {
                    if (person.followers[i].userid == self._id) {
                        return 'bg-primary';
                    } else {
                        if (person.followers.length-1 == i) {
                            return 'bg-blue';
                        }
                    }
                }
            } else {
                return 'bg-blue';
            }
        }
        return (
            <li class="inline-items person-suggestion">
                <div class="author-thumb">
                    <img src={person.avatar ? Config.FILES.AVATAR+'/'+person.avatar : '/static/icons/avatar.png'} alt="author"/>
                </div>
                <div class="notification-event">
                    <NavLink to={`/owe/profile/${person.username}`} class="h6 notification-friend">{ person.fname+' '+person.lname }</NavLink>
                    <span class="chat-message-item">@{person.username}</span>
                </div>
                <span class="notification-icon">
                    <a href="javascript:void(0)" class={`accept-request ${followSta()}`} onClick={this.follow.bind(this)}>
                        <span class="icon-add without-text">
                            <svg class="olymp-happy-face-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use></svg>
                        </span>
                    </a>
                </span>
            </li>
        )
    }
}

const mapStateToProps = state => ({
    self: state.self,
    people: state.people
});
export default connect(mapStateToProps)(Person);