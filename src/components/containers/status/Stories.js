import React, { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setStories } from '../../../actions/Status';
import { Config } from '../../../utils';
import { setAlbumData } from '../../../actions/Album';
import superagent from 'superagent';

import './Stories.css';


import Loading from '../../layout/Loading';

const Album = lazy(() => import('../../presentation/stories/Album'));
const Audio = lazy(() => import('../../presentation/stories/Audio'));
const GIF   = lazy(() => import('../../presentation/stories/GIF'));
const Photo = lazy(() => import('../../presentation/stories/Photo'));
const Video = lazy(() => import('../../presentation/stories/Video'));
const Reply = lazy(() => import('../../presentation/stories/Reply'));

let storyAudio, storyVideo, mediaIndex;

class Stories extends Component {
    openAlbum (index) {
        let self  = this;
        let story = Object.assign({}, this.props.status.stories[index]);
        //this.props.history.push(`/owe/status/${story.album._id}`);
        superagent
            .get(Config.API.URL+'/album/comments/'+story.postid)
            .set('x-access-jwt', localStorage.getItem('jwt'))
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    if (res.body.info.code == 200) {
                        story.album.comments = res.body.payload;
                        self.props.dispatch(setAlbumData(story));

                        //self.props.history.push(`/owe/status/${story.album._id}`);
                        $('#open-photo-popup-v2').modal('show');
                    } else if (res.body.info.code == 401 || res.body.info.code == 403) {
                        self.props.history.push('/join');
                    }
                }
            });
    }
    playMedia (index) {
        let story  = Object.assign({}, this.props.status.stories[index]);
        let album  = story.album;
        let file   = album.files[0];
        mediaIndex = index;
        if (file.type == 'video') {
            storyVideo  = document.getElementById(story._id);
            if (!storyVideo.paused && !storyVideo.ended) {
                storyVideo.pause();
            } else {
                storyVideo.play();
            }
            storyVideo.addEventListener('play', this.playing.bind(this), false);
            storyVideo.addEventListener('pause', this.pause.bind(this), false);
            storyVideo.addEventListener('timeupdate', this.updateProgress.bind(this), false);
        } else if (file.type == 'audio') {
            storyAudio   = document.getElementById(story._id);
            if (!storyAudio.paused && !storyAudio.ended) {
                storyAudio.pause();
            } else {
                storyAudio.play();
            }
            storyAudio.addEventListener('play', this.playing.bind(this), false);
            storyAudio.addEventListener('pause', this.pause.bind(this), false);
            storyAudio.addEventListener('timeupdate', this.updateProgress.bind(this), false);
        }
    }
    playing (e) {
        let stories = Object.assign([], this.props.status.stories);
        stories[mediaIndex].player.playPause = 'pause';
        this.props.dispatch(setStories(stories));
    }
    pause (e) {
        let stories = Object.assign([], this.props.status.stories);
        stories[mediaIndex].player.playPause = 'play';
        this.props.dispatch(setStories(stories));
    }
    updateProgress (e) {
        //console.log('')
        let stories        = Object.assign([], this.props.status.stories);
        let player         = Object.assign({}, stories[mediaIndex].player);
        player.currentTime = this.smartTime(Math.floor((e.target.currentTime / 60)))+':'+this.smartTime(Math.floor((e.target.currentTime % 60)));
        player.sliderValue = Math.floor(e.target.currentTime);
        if (e.target.duration) {
            player.duration  = this.smartTime(Math.floor((e.target.duration / 60)))+':'+this.smartTime(Math.floor((e.target.duration % 60)));
            player.sliderMax = Math.floor(e.target.duration);
        }
        stories[mediaIndex].player = player;
        this.props.dispatch(setStories(stories));
    }
    smartTime (time) {
        return time < 10 ? '0'+time.toString().trim() : time; 
    }
    seekMedia (e) {
        let stories = Object.assign([], this.props.status.stories);
        if (mediaIndex >= 0) {
            let player = Object.assign({}, stories[mediaIndex].player);
            let album  = stories[mediaIndex].album;
            let file   = album.files[0], currentMinutes, currentSeconds;
            if (file.type == 'video') {
                if (storyVideo) {
                    storyVideo.currentTime = e.target.value;
                    currentMinutes         = this.smartTime(Math.floor((storyVideo.currentTime / 60)));
                    currentSeconds         = this.smartTime(Math.floor((storyVideo.currentTime % 60)));
                }
            } else if (file.type == 'audio') {
                if (storyAudio) {
                    storyAudio.currentTime = e.target.value;
                    currentMinutes         = this.smartTime(Math.floor((storyAudio.currentTime / 60)));
                    currentSeconds         = this.smartTime(Math.floor((storyAudio.currentTime % 60)));
                }
            }
            player.currentTime         = currentMinutes+':'+currentSeconds;
            stories[mediaIndex].player = player;
            this.props.dispatch(setStories(stories));
        }
    }
    muteUnmute () {
        let stories = Object.assign([], this.props.status.stories);
        if (mediaIndex >= 0) {
            let player  = Object.assign({}, stories[mediaIndex].player);
            let album   = stories[mediaIndex].album;
            let file    = album.files[0];
            if (file.type == 'video') {
                if (storyVideo.muted) {
                    storyVideo.muted  = false;
                    player.muteUnmute = 'sound';
                } else {
                    storyVideo.muted  = true;
                    player.muteUnmute = 'no-sound';
                }
            } else if (file.type == 'audio') {
                if (storyAudio.muted) {
                    storyAudio.muted  = false;
                    player.muteUnmute = 'sound';
                } else {
                    storyAudio.muted  = true;
                    player.muteUnmute = 'no-sound';
                }
            }
            stories[mediaIndex].player = player;
            this.props.dispatch(setStories(stories));
        }
    }
    render () {
        // this.props.loading
        let loading = () => {
            if (this.props.status.stories.length == 0 && (!this.props.loading || this.props.loading == 'show')) {
                return (
                    <div class="ui-block">
                        <div class="ui-block-title"><img class="inner-loader" src="/static/spinner/busy.gif" alt="Gistoneer" /></div>
                    </div>
                )
            } else {
                if (this.props.status.stories.length == 0) {
                    return (
                        <div class="ui-block">
                            <div class="ui-block-title"><div class="h6 title">You haven't post anything yet, and you're not following someone that post album.</div></div>
                        </div>
                    )
                }
            }
        };
        return (
            <div id="newsfeed-items-grid">
                {loading()}
                <Suspense fallback={<Loading stage="Loading..." />}>
                    {this.props.status.stories.map((story, i) => {
                        let album = story.album;
                        if (story.type == 'album') {
                            if (album.files.length == 1) {
                                if (album.files[0].type == 'audio') {
                                    return <Audio key={i} index={i} onClick={this.openAlbum.bind(this)} onPlay={this.playMedia.bind(this)} onSeeking={this.seekMedia.bind(this)} unMuteMute={this.muteUnmute.bind(this)} story={story} />
                                } else if (album.files[0].type == 'video') {
                                    return <Video key={i} index={i} onClick={this.openAlbum.bind(this)} onPlay={this.playMedia.bind(this)} onSeeking={this.seekMedia.bind(this)} unMuteMute={this.muteUnmute.bind(this)} story={story} />
                                } else if (album.files[0].type == 'photo') {
                                    return <Photo key={i} index={i} onClick={this.openAlbum.bind(this)} story={story} />
                                } else if (album.files[0].type == 'gif') {
                                    return <GIF key={i} index={i} onClick={this.openAlbum.bind(this)} story={story} />
                                } 
                            } else if (album.files.length > 1) {
                                return <Album key={i} index={i} onClick={this.openAlbum.bind(this)} story={story} />
                            }
                        } else if (story.type == 'reply') {
                            return <Reply key={i} index={i} onClick={this.openAlbum.bind(this)} story={story} />
                        } /*else if (story.type == 'avatar' || story.type == 'cover') {
                            return <Photo key={i} index={i} onClick={this.openAlbum.bind(this)} story={story} />
                        }*/
                    })}
                </Suspense>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    status: state.status,
    self: state.self
});

export default connect(mapStateToProps)(withRouter(Stories));