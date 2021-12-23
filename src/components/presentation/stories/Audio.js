import React, { Component, lazy } from 'react';
import Config from '../../../utils/Config';

const PostAuthor   = lazy(() => import('./gadget/PostAuthor'));
const PostCaption  = lazy(() => import('./gadget/PostCaption'));
const PostFooter   = lazy(() => import('./gadget/PostFooter'));
//const PostControls = lazy(() => import('./gadget/PostControls'));


class Audio extends Component {
    componentDidMount() {
        let self     = this;
        let story    = this.props.story;
        let loader   = document.getElementById('loader-'+story._id);
        let player   = document.getElementById('player-'+story._id);
        let wrapper  = document.getElementById('media-wrapper-'+story._id);
        let duration = player.querySelector('.duration');
        player.classList.add("d-none");
        wrapper.classList.add("d-none");
        loader.classList.remove("d-none");
        document.getElementById(story._id).addEventListener('loadedmetadata', (e) => {
            duration.innerText = self.smartTime(Math.floor((e.target.duration / 60)))+':'+self.smartTime(Math.floor((e.target.duration % 60)));
        });
        document.getElementById('audio-cover-'+story._id).onload = (e) => {
            loader.classList.add("d-none");
            player.classList.remove("d-none");
            wrapper.classList.remove("d-none");
        }
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
                <article class="hentry post video">
                    <PostAuthor files={album.files} user={user} updated_at={story.updated_at} type={story.type} />
                    <PostCaption activity={album.activity} />
                    <div class="post-video">
                        <div class="story-loading" id={`loader-${story._id}`}><img src={`/static/spinner/busy.gif`} alt="Loading..." /></div>
                        <div class="video-thumb f-none d-none" id={`media-wrapper-${story._id}`} onClick={this.startPlaying.bind(this)}>
                            <audio class="f-none" id={story._id} src={Config.FILES.ALBUMS+'/'+album.folder+'/'+album.files[last].filename}></audio>
                            <img id={`audio-cover-${story._id}`} src={album.files[last].cover ? Config.FILES.ALBUMS+'/'+album.folder+'/cover/'+album.files[last].cover: '/static/icons/audio-file-large.png'} alt="photo" /> {/* data-toggle="modal" data-target="#open-photo-popup-v2" */}
                            <button class="play-video" >
                                <svg class={`olymp-${player.playPause}-icon`}><use href={`/static/svg-icons/sprites/icons.svg#olymp-${player.playPause}-icon`}></use></svg>
                            </button>
                        </div>
                        <div class="audio-player-wrapper d-none"  id={`player-${story._id}`}>
                            <div class="audio-player row no-gutters">
                                <div class="audio-time">
                                    <time class="current-time">{player.currentTime}</time>
                                    <time class="duration">{player.duration}</time>
                                </div>
                                <div class="audio-controls col-2 col-xs-1 col-sm-1 col-md-1 col-lg-1">
                                    <button class="play-pause" onClick={this.startPlaying.bind(this)}><svg class={`olymp-${player.playPause}-icon`}><use href={`/static/svg-icons/sprites/icons.svg#olymp-${player.playPause}-icon`}></use></svg></button>
                                </div>
                                <div class="audio-progress-bar-wrapper col-8 col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                    <input type="range" class="custom-range audio-progress" value={player.sliderValue} min="0" max={player.sliderMax} onChange={this.seekAudio.bind(this)} />
                                </div>
                                <div class="audio-mute-wrapper col-2 col-xs-1 col-sm-1 col-md-1 col-lg-1">
                                    <button onClick={this.muteUnmute.bind(this)} class="mute-unmute"><svg class={`olymp-music-${player.muteUnmute}-icon`}><use href={`/static/svg-icons/sprites/icons-music.svg#olymp-music-${player.muteUnmute}-icon`}></use></svg></button>
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <PostFooter onComment={this.openAlbum.bind(this)} album={{id:album._id,creator:album.creator,likes:album.likes,comments:album.comments,shares:album.shares,index:this.props.index }} />
                    {/*<PostControls album={{id:album._id,creator:album.creator,likes:album.likes,comments:album.comments,shares:album.shares,index:this.props.index }} />*/}
                </article>
            </div>
        )
    }
}

export default Audio;