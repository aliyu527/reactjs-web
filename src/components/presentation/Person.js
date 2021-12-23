import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
//import moment from 'moment';
import Config from '../../utils/Config';

import './Person.css';

class Person extends Component {
    componentDidMount () {
        let person       = this.props.person;
        let coverLoader  = document.getElementById(`cover-loading-${person._id}`);
        let cover        = document.getElementById(`cover-image-${person._id}`);
        let avatarLoader = document.getElementById(`avatar-loading-${person._id}`);
        let avatar       = document.getElementById(`avatar-image-${person._id}`);
        cover.classList.add("d-none");
        coverLoader.classList.remove("d-none");
        avatar.classList.add("d-none");
        avatarLoader.classList.remove("d-none");
        cover.onload = (e) => {
            coverLoader.classList.add("d-none");
            cover.classList.remove("d-none");
        }
        avatar.onload = (e) => {
            avatarLoader.classList.add("d-none");
            avatar.classList.remove("d-none");
        }
    }
    follow (e) {
        e.preventDefault();
        this.props.onFollow(Object.assign({}, this.props.person, {index: this.props.index}));
    }
    render () {
        let person    = this.props.person;
        let self      = this.props.self.data;
        let followSta = () => {
            if (self._id && person.followers.length > 0) {
                //console.log(self);
                for (let i = 0; i < person.followers.length; i++) {
                    if (person.followers[i].userid == self._id) {
                        return 'btn-primary';
                    } else {
                        if (person.followers.length-1 == i) {
                            return 'btn-blue';
                        }
                    }
                }
            } else {
                return 'btn-blue';
            }
        }
        return (
            <div class="col col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                <div class="ui-block">
                    <div class="friend-item">
                        <div class="friend-header-thumb">
                            <img id={`cover-loading-${person._id}`} class="cover-loading" src={`/static/spinner/busy.gif`} alt="Loading..." />
                            <img id={`cover-image-${person._id}`} class="cover-image d-none" src={person.cover ? Config.FILES.COVER+'/'+person.cover : `/static/cover/${Config.gen_cover}.png`} alt="Avatar" />
                        </div>
                        <div class="friend-item-content">
                            {/*<div class="more">
                                <svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
                                <ul class="more-dropdown">
                                    <li><a href="#">Report Profile</a></li>
                                    <li><a href="#">Block Profile</a></li>
                                    <li><a href="#">Turn Off Notifications</a></li>
                                </ul>
                            </div>*/}
                            <div class="friend-avatar">
                                <div class="author-thumb no-border">
                                    <img id={`avatar-loading-${person._id}`} class="avatar-loading" src={`/static/spinner/house.gif`} alt="Loading..." />
                                    <img id={`avatar-image-${person._id}`} class="avatar-image d-none" src={person.avatar ? Config.FILES.AVATAR+'/'+person.avatar : '/static/icons/avatar.png'} alt="author"/>
                                </div>
                                <div class="author-content">
                                    <NavLink to={`/owe/profile/${person.username}`} class="h5 author-name">{ person.fname+' '+person.lname }</NavLink>
                                    <div class="country">{ person.country.name+', '+person.country.iso2.toUpperCase() }</div>
                                    <div class="country">@{ person.username }</div>
                                </div>
                            </div>
                    
                            <div class="swiper-container" data-slide="fade">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide">
                                        <div class="friend-count" data-swiper-parallax="-500">
                                            <a href="#" class="friend-count-item">
                                                <div class="h6">{ person.albums.length }</div>
                                                <div class="title">Albums</div>
                                            </a>
                                            <a href="#" class="friend-count-item">
                                                <div class="h6">{ person.followers.length }</div>
                                                <div class="title">Followers</div>
                                            </a>
                                            <a href="#" class="friend-count-item">
                                                <div class="h6">{ person.following.length }</div>
                                                <div class="title">Following</div>
                                            </a>
                                        </div>
                                        <div class="control-block-button" data-swiper-parallax="-100">
                                            <button class={`btn ${followSta()}`} onClick={this.follow.bind(this)}>
                                                <svg class="olymp-happy-face-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use></svg>
                                            </button>
                    
                                            {/*<button class="btn btn-purple">
                                                <svg class="olymp-chat---messages-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use></svg>
                                            </button>*/}
                    
                                        </div>
                                    </div>
                    
                                    {/*<div class="swiper-slide">
                                        <p class="friend-about" data-swiper-parallax="-500">
                                            Hi!, I’m Marina and I’m a Community Manager for “Gametube”. Gamer and full-time mother.
                                        </p>
                    
                                        <div class="friend-since" data-swiper-parallax="-100">
                                            <span>Since:</span>
                                            <div class="h6">{ moment(person.timestamp).fromNow() }</div>
                                        </div>
                                    </div>*/}
                                </div>
                    
                                {/*<!-- If we need pagination -->*/}
                                <div class="swiper-pagination"></div>
                            </div>
                        </div>
                    </div>
                    
                    {/*<!-- ... end Friend Item -->	*/}		
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    self: state.self,
    people: state.people
});
export default connect(mapStateToProps)(Person);