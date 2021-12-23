import React, { Component } from 'react';
import Config from '../../../utils/Config';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

class Person extends Component {
    componentDidMount () {
        $('.js-zoom-gallery').each(function () {
            $(this).magnificPopup({
                delegate: 'a',
                type: 'image',
                gallery: {
                    enabled: true
                },
                removalDelay: 500, //delay removal by X to allow out-animation
                callbacks: {
                    beforeOpen: function () {
                        // just a hack that adds mfp-anim class to markup
                        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                        this.st.mainClass    = 'mfp-zoom-in';
                    }
                },
                closeOnContentClick: true,
                midClick: true
            });
        });
    }
    follow (e) {
        e.preventDefault();
        this.props.onFollow(Object.assign({}, this.props.person, {index: this.props.index}));
    }
    render () {
        let person    = this.props.person;
        let self      = this.props.self.data;
        let followSta = () => {
            if (self._id) {
                if (person._id == self._id) {
                    return 'd-none';
                } else {
                    if (person.followers.length > 0) {
                        for (let i = 0; i < person.followers.length; i++) {
                            if (person.followers[i].userid == self._id) {
                                return 'bg-primary';
                            } else {
                                if (person.followers.length-1 == i) {
                                    return 'btn-blue';
                                }
                            }
                        }
                    } else {
                        return 'bg-blue';
                    }
                }
            } else {
                return 'bg-blue';
            }
        }
        return (
            <div class="ui-block">
                <article class="hentry post searches-item">
                    <div class="post__author author vcard inline-items">
                        <img src={person.avatar ? Config.FILES.AVATAR+'/'+person.avatar : '/static/icons/avatar.png'} alt="author" />
                        <div class="author-date">
                            <NavLink class="h6 post__author-name fn" to={`/owe/profile/${person.username}`}>{ person.fname+' '+person.lname }</NavLink>
                            <div class="country">{ '@'+person.username+' - '+ person.country.name+', '+person.country.iso2.toUpperCase() }</div>
                        </div>
                        <span class="notification-icon">
                            <a href="Javascript:void(0)" class={`accept-request ${followSta()}`} onClick={this.follow.bind(this)}>
                                <span class="icon-add without-text">
                                    <svg class="olymp-happy-face-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use></svg>
                                </span>
                            </a>
                            {/*
                            <a href="#" class="accept-request chat-message">
                                <svg class="olymp-chat---messages-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use></svg>
                            </a>
                            */}
                        </span>
                        {/*<div class="more">
                            <svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
                            <ul class="more-dropdown">
                                <li><a href="#">Edit Post</a></li>
                                <li><a href="#">Delete Post</a></li>
                                <li><a href="#">Turn Off Notifications</a></li>
                                <li><a href="#">Select as Featured</a></li>
                            </ul>
                        </div>*/}
                    </div>
                    {/*<p class="user-description">
                        <span class="title">About Me:</span> Hi!, I’m Marina and I’m a Community Manager for “Gametube”. Gamer and full-time mother.
                        <span class="title">Favourite TV Shows:</span> Breaking Good, RedDevil, People of Interest, The...
                    </p>*/}
                    <div class="post-block-photo js-zoom-gallery">
                        {person.collections.slice(0, 3).map((collection, i) => {
                            if (i >= 0 && i <= 1)  {
                                return (
                                    <a key={i} href={collection.cover ? Config.FILES.ALBUMS+'/'+collection.folder+'/cover/'+collection.cover: '/static/icons/audio-file-large.png'} class="col grid-3-width">
                                        <img src={collection.cover ? Config.FILES.ALBUMS+'/'+collection.folder+'/cover/'+collection.cover: '/static/icons/audio-file-large.png'} alt="photo" />
                                    </a>
                                )
                            } else {
                                return (
                                    <a key={i} href={collection.cover ? Config.FILES.ALBUMS+'/'+collection.folder+'/cover/'+collection.cover: '/static/icons/audio-file-large.png'} class="more-photos grid-3-width">
                                        <img src={collection.cover ? Config.FILES.ALBUMS+'/'+collection.folder+'/cover/'+collection.cover: '/static/icons/audio-file-large.png'} alt="photo" />
                                        <span class="h2">+{person.collections.length-3}</span>
                                    </a>
                                )
                            }
                        })}
                    </div>
                    <div class="post-additional-info">
                        <ul class="friends-harmonic d-none">
                            <li><a href="#"><img src="/static/img/friend-harmonic9.jpg" alt="friend" /></a></li>
                            <li><a href="#"><img src="/static/img/friend-harmonic10.jpg" alt="friend" /></a></li>
                            <li><a href="#"><img src="/static/img/friend-harmonic7.jpg" alt="friend" /></a></li>
                            <li><a href="#"><img src="/static/img/friend-harmonic8.jpg" alt="friend" /></a></li>
                            <li><a href="#"><img src="/static/img/friend-harmonic11.jpg" alt="friend" /></a></li>
                        </ul>
                        <div class="names-people-likes d-none">
                            You and Marina have <a href="#">4 Friends in Common</a>
                        </div>
                
                        <div class="friend-count">
                            <a href="#" class="friend-count-item">
                                <div class="h6">{ person.collections.length }</div>
                                <div class="title">Media</div>
                            </a>
                            <a href="#" class="friend-count-item">
                                <div class="h6">{ person.followers.length }</div>
                                <div class="title">Follower</div>
                            </a>
                            <a href="#" class="friend-count-item">
                                <div class="h6">{ person.following.length }</div>
                                <div class="title">Following</div>
                            </a>
                        </div>
                    </div>
                </article>
                {/*<!-- ... end Search Result -->*/}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    self: state.self,
    status: state.status
});
export default connect(mapStateToProps)(Person);