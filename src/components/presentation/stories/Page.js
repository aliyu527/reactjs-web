import React, { Component } from 'react';
import Config from '../../../utils/Config';
import { PostAuthor, PostCaption, PostFooter, PostControls, PostCommentList, PostCommentForm } from './gadget';

class Page extends Component {
    componentDidMount() {
        let self     = this;
        let story    = this.props.story;
        let player   = document.getElementById('player-'+story._id);
        let duration = player.querySelector('.duration');
        document.getElementById(story._id).addEventListener('loadedmetadata', (e) => {
            duration.innerText = self.smartTime(Math.floor((e.target.duration / 60)))+':'+self.smartTime(Math.floor((e.target.duration % 60)));
        });
    }
    openAlbum () {
        this.props.onClick(this.props.index);
    }
    startPlaying () {
        this.props.onPlay(this.props.index);
    }
    seekAudio (e) {
        this.props.onSeeking(e);
    }
    muteUnmute (e) {
        this.props.unMuteMute(e);
    }
    smartTime (time) {
        return time < 10 ? '0'+time.toString().trim() : time; 
    }
    render () {
        let story = this.props.story;
        let album = story.album;
        let user  = story.user;
        let last  = album.files.length-1;

        if (!story.player) {
            story.player = {
                playPause   : 'play',
                muteUnmute  : 'sound',
                currentTime : '00:00',
                duration    : '00:00',
                sliderMax   : '100',
                sliderValue : '0'
            };
        }

        let player = story.player;
        return (
            <div class="ui-block">
                <article class="hentry post searches-item">
                    <div class="post__author author vcard inline-items">
                        <img src="/static/img/avatar41-sm.jpg" alt="author" />
                        <div class="author-date">
                            <a class="h6 post__author-name fn" href="02-ProfilePage.html">The Marina Bar</a>
                            <div class="country">Restaurant / Bar</div>
                        </div>
                        <span class="notification-icon">
                            <a href="#" class="accept-request fav-pages">
                                <span class="icon-add without-text">
                                    <svg class="olymp-star-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-star-icon"></use></svg>
                                </span>
                            </a>
                            <a href="#" class="accept-request chat-message">
                                <svg class="olymp-chat---messages-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use></svg>
                            </a>
                        </span>
                        <div class="more">
                            <svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
                            <ul class="more-dropdown">
                                <li><a href="#">Edit Post</a></li>
                                <li><a href="#">Delete Post</a></li>
                                <li><a href="#">Turn Off Notifications</a></li>
                                <li><a href="#">Select as Featured</a></li>
                            </ul>
                        </div>
                    </div>
                    <p class="user-description">
                        <span class="title">Page Intro:</span> We’re a little resto bar that specializes in Seafood. All Saturdays we have Karaoke Night!
                        <span class="title">Based in:</span> Miami, Florida
                        <span class="title">Contact:</span> reservations@marinarestobar.com
                    </p>
                    <div class="post-block-photo js-zoom-gallery">
                        <a href="/static/img/post-photo4.jpg" class="col grid-3-width"><img src="/static/img/post-photo4.jpg" alt="photo"/></a>
                        <a href="/static/img/post-photo7.jpg" class="col grid-3-width"><img src="/static/img/post-photo7.jpg" alt="photo"/></a>
                        <a href="/static/img/post-photo2.jpg" class="more-photos grid-3-width">
                            <img src="/static/img/post-photo2.jpg" alt="photo" />
                            <span class="h2">+988</span>
                        </a>
                    </div>
                    <div class="post-additional-info">
                        <ul class="friends-harmonic">
                            <li><a href="#"><img src="/static/img/friend-harmonic11.jpg" alt="friend" /></a></li>
                            <li><a href="#"><img src="/static/img/friend-harmonic10.jpg" alt="friend" /></a></li>
                            <li><a href="#"><img src="/static/img/friend-harmonic7.jpg" alt="friend" /></a></li>
                            <li><a href="#"><img src="/static/img/friend-harmonic8.jpg" alt="friend" /></a></li>
                            <li><a href="#" class="all-users">+33</a></li>
                        </ul>
                        <div class="names-people-likes">
                            <a href="#">14 Friends</a> Added this Page to Favs
                        </div>
                        <div class="friend-count">
                            <a href="#" class="friend-count-item">
                                <div class="h6">599</div>
                                <div class="title">Fav +</div>
                            </a>
                            <a href="#" class="friend-count-item">
                                <div class="h6">2.8K</div>
                                <div class="title">Posts</div>
                            </a>
                            <a href="#" class="friend-count-item">
                                <div class="h6">35</div>
                                <div class="title">Videos</div>
                            </a>
                        </div>
                    </div>
                </article>
                {/*<!-- ... end Search Result -->*/}
            </div>
        )
    }
}

export default Page;