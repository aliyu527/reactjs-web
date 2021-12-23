import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PostAuthor, PostReactions, PostControls, CommentsList, CommentForm } from '../containers/open';
import { changeCurrentAlbum, setAlbumData, changeCurrentAlbumType } from '../../actions/Album';
import Config from '../../utils/Config';

let modelVideo      = document.createElement('video');
let modelAudio      = new Audio();
let modelPhoto      = new Image();
let modelAudioCover = new Image();
let modelLoading    = new Image(), wrapper, modelPlayer;
modelLoading.src    = '/static/spinner/busy.gif';

class OpenAlbumPopupV2 extends Component {
    constructor () {
        super();
        this.state = {
            player: {
                playPause   : 'play',
                muteUnmute  : 'sound',
                currentTime : '00:00',
                duration    : '00:00',
                sliderMax   : '100',
                sliderValue : '0'
            }
        }
    }
    componentDidUpdate () {
        this.scrollCommentsToBottom();
    }
    componentDidMount () {
        let self  = this;
        $('#open-photo-popup-v2').on('shown.bs.modal', () => {
            self.addPlayer(0);
        }).on('hidden.bs.modal', () => {
            self.props.dispatch(changeCurrentAlbum({ start: 0, end: 1 }));
            self.props.dispatch(setAlbumData({user:{}, album:{files:[],likes:[],comments:[],shares:[]}}));
            self.props.dispatch(changeCurrentAlbumType('photo'));

            modelVideo.currentTime = 0; 
            modelVideo.src         = null;
            modelAudio.currentTime = 0;
            modelAudio.src         = null;
            modelAudioCover.src    = null;
        });
        
        $('.mCustomScrollbar').perfectScrollbar({wheelPropagation:false});
    }
    scrollCommentsToBottom () {
        if (this.commentsList) {
            this.commentsList.scrollTop = this.commentsList.scrollHeight;
        }
    }
    updatePlayer (player) {
        this.setState({ player:player });
    }
    prev () {
        let current = Object.assign({}, this.props.album.current);
        this.props.dispatch(changeCurrentAlbum({start: current.start-1, end: current.end-1}));
        this.addPlayer(current.start-1);
    }
    next () {
        let current = Object.assign({}, this.props.album.current);
        this.props.dispatch(changeCurrentAlbum({start: current.start+1, end: current.end+1}));
        this.addPlayer(current.start+1);
    }
    addPlayer (current) {
        let self    = this;
        let files   = Object.assign([], this.props.album.data.album.files).reverse();
        wrapper     = document.querySelector('#model-content-wrapper span');
        modelPlayer = document.querySelector('#model-audio-player-wrapper');
        if (files[current]) {
            this.props.dispatch(changeCurrentAlbumType(files[current].type));
            if (files[current]) {
                let album  = this.props.album.data.album;
                let file   = files[current];
                let player = Object.assign({}, this.state.player);
                modelVideo.currentTime = 0;
                modelVideo.src         = null
                modelAudio.currentTime = 0;
                modelAudio.src         = null;
                modelAudioCover.src    = null;
                modelPlayer.classList.add("d-none");
                wrapper.innerHTML      = '';
                if (file.type == 'video') {
                    modelVideo.src    = Config.FILES.ALBUMS+'/'+album.folder+'/'+file.filename;
                    modelVideo.muted  = true;
                    player.muteUnmute = 'no-sound';
                    modelVideo.classList.add("d-none");
                    modelLoading.classList.remove("d-none");
                    wrapper.appendChild(modelLoading);
                    wrapper.appendChild(modelVideo);
                    modelVideo.addEventListener('play', this.playing.bind(this), false);
                    modelVideo.addEventListener('pause', this.pause.bind(this), false);
                    modelVideo.addEventListener('timeupdate', self.updateProgress.bind(self), false);
                    modelVideo.addEventListener('loadedmetadata', (e) => {
                        modelLoading.classList.add("d-none");
                        modelVideo.classList.remove("d-none");
                        modelPlayer.classList.remove("d-none");
                        modelVideo.play();
                        self.updatePlayer(player);
                    });
                } else if (file.type == 'audio') {
                    modelAudio.src      = Config.FILES.ALBUMS+'/'+album.folder+'/'+file.filename;
                    modelAudioCover.src = file.cover ? Config.FILES.ALBUMS+'/'+album.folder+'/cover/'+file.cover: '/static/icons/audio-file-large.png';
                    
                    player.muteUnmute   = 'sound';
                    modelAudioCover.classList.add("d-none");
                    modelLoading.classList.remove("d-none");
                    
                    wrapper.appendChild(modelLoading);
                    wrapper.appendChild(modelAudioCover);
                    modelAudio.addEventListener('play', this.playing.bind(this), false);
                    modelAudio.addEventListener('pause', this.pause.bind(this), false);
                    modelAudio.addEventListener('timeupdate', this.updateProgress.bind(this), false);
                    modelAudioCover.onload = (e) => {
                        modelLoading.classList.add("d-none");
                        modelAudioCover.classList.remove("d-none");
                    }
                    modelAudio.addEventListener('loadedmetadata', (e) => {
                        modelAudio.play();
                        modelPlayer.classList.remove("d-none");
                        self.updatePlayer(player);
                    });
                } else {
                    modelPhoto.src = file.filename ? Config.FILES.ALBUMS+'/'+album.folder+'/'+file.filename: '/static/icons/audio-file-large.png';
                    modelPhoto.classList.add("d-none");
                    modelLoading.classList.remove("d-none");
                    wrapper.appendChild(modelLoading);
                    wrapper.appendChild(modelPhoto);

                    modelPhoto.onload = (e) => {
                        modelLoading.classList.add("d-none");
                        modelPlayer.classList.add("d-none");
                        modelPhoto.classList.remove("d-none");
                        self.updatePlayer(player);
                    }
                }
            }
        }
    }
    updateProgress (e) {
        let files          = Object.assign([], this.props.album.data.album.files).reverse();
        let current        = this.props.album.current;
        let player         = Object.assign({}, this.state.player);
        player.currentTime = this.smartTime(Math.floor((e.target.currentTime / 60)))+':'+this.smartTime(Math.floor((e.target.currentTime % 60)));
        player.sliderValue = Math.floor(e.target.currentTime);
        if (e.target.duration) {
            player.duration  = this.smartTime(Math.floor((e.target.duration / 60)))+':'+this.smartTime(Math.floor((e.target.duration % 60)));
            player.sliderMax = Math.floor(e.target.duration);
        }
        this.updatePlayer(player);
        if (e.target.ended) {
            //player.muteUnmute = 'no-sound';
            if (files.length > 0 && current.start < files.length-1) {
                this.next();
            }
        }
    }
    playing (e) {
        let player       = Object.assign({}, this.state.player);
        player.playPause = 'pause';
        this.updatePlayer(player);
    }
    pause (e) {
        let player = Object.assign({}, this.state.player);
        player.playPause = 'play';
        this.updatePlayer(player);
    }
    playPause () {
        if (this.props.album.type == 'video') {
            if (!modelVideo.paused && !modelVideo.ended) {
                modelVideo.pause();
            } else {
                modelVideo.play();
            }
        } else if (this.props.album.type == 'audio') {
            if (!modelAudio.paused && !modelAudio.ended) {
                modelAudio.pause();
            } else {
                modelAudio.play();
            }
        }
    }
    muteUnmute () {
        let player = Object.assign({}, this.state.player);
        if (this.props.album.type == 'video') {
            if (modelVideo.muted) {
                modelVideo.muted  = false;
                player.muteUnmute = 'sound';
            } else {
                modelVideo.muted  = true;
                player.muteUnmute = 'no-sound';
            }
        } else if (this.props.album.type == 'audio') {
            if (modelAudio.muted) {
                modelAudio.muted  = false;
                player.muteUnmute = 'sound';
            } else {
                modelAudio.muted  = true;
                player.muteUnmute = 'no-sound';
            }
        }
        this.updatePlayer(player);
    }
    seekAudio (e) {
        let player = Object.assign({}, this.state.player), currentMinutes, currentSeconds;
        if (this.props.album.type == 'video') {
            modelVideo.currentTime = e.target.value;
            currentMinutes         = this.smartTime(Math.floor((modelVideo.currentTime / 60)));
            currentSeconds         = this.smartTime(Math.floor((modelVideo.currentTime % 60)));
        } else if (this.props.album.type == 'audio') {
            modelAudio.currentTime = e.target.value;
            currentMinutes         = this.smartTime(Math.floor((modelAudio.currentTime / 60)));
            currentSeconds         = this.smartTime(Math.floor((modelAudio.currentTime % 60)));
        }
        player.currentTime = currentMinutes+':'+currentSeconds;
        this.updatePlayer(player);
    }
    smartTime (time) {
        return time < 10 ? '0'+time.toString().trim() : time; 
    }
    render () {
        let album    = this.props.album.data.album;
        let user     = this.props.album.data.user;
        let files    = Object.assign([], album.files).reverse();
        let activity = album.activity;
        let current  = this.props.album.current;
        let btnPrev  = () => {
            var display = '';
            if (files.length == 1) {
                display = 'd-none';
            } else {
                if (current.start == 0) {
                    display = 'd-none';
                }
            }
            return (<svg class={`btn-prev olymp-popup-left-arrow ${display}`} onClick={this.prev.bind(this)}><use href="/static/svg-icons/sprites/icons.svg#olymp-popup-left-arrow"></use></svg>)
        }
        let btnNext  = () => {
            var display = '';
            if (files.length == 1) {
                display = 'd-none';
            } else {
                if (current.start == files.length-1) {
                    display = 'd-none';
                }
            }
            return (<svg class={`btn-next olymp-popup-right-arrow ${display}`} onClick={this.next.bind(this)}><use href="/static/svg-icons/sprites/icons.svg#olymp-popup-right-arrow"></use></svg>)
        }
        return (
            <div class="modal fade" id="open-photo-popup-v2" tabIndex="-1" role="dialog" aria-labelledby="open-photo-popup-v2" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered window-popup open-photo-popup open-photo-popup-v2" role="document">
                    <div class="modal-content">
                        <a href="#" class="close icon-close" data-dismiss="modal" aria-label="Close">
                            <svg class="olymp-close-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-close-icon"></use></svg>
                        </a>
                        <div class="modal-body row no-gutters">
                            <div class="open-photo-thumb col-12 col-xs-12 col-sm-12 col-md-8 col-lg-8">
                                <div class="swiper-container">
                                    <div class="swiper-wrapper">
                                        {files.slice(current.start).map((file, i) => {
                                            return (
                                                <div class="swiper-slide" key={i}>
                                                    <div id="model-content-wrapper" key={i} class="photo-item"> {/* data-swiper-parallax="-300" data-swiper-parallax-duration="500" */}
                                                        <span key={i}></span>
                                                        {/*<a href="#" class="more"><svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg></a>
                                                        <a href="#" class="tag-friends" data-toggle="tooltip" data-placement="top" data-original-title="TAG YOUR FRIENDS">
                                                            <svg class="olymp-happy-face-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use></svg>
                                                        </a>*/}

                                                        <div class="content">
                                                            <a href="javascript:void(0)" class="h6 title">{ file.title }</a>
                                                            {/*<time class="published" dateTime="2017-03-24T18:18">2 weeks ago</time>*/}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        <div class={`audio-player-wrapper ${this.props.album.type == 'photo' ? 'd-none' : ''}`} id="model-audio-player-wrapper">
                                            <div class="audio-player row no-gutters">
                                                <div class="audio-time">
                                                    <time class="current-time">{this.state.player.currentTime}</time>
                                                    <time class="duration">{this.state.player.duration}</time>
                                                </div>
                                                <div class="audio-controls col-2 col-xs-1 col-sm-1 col-md-1 col-lg-1">
                                                    <button class="play-pause" onClick={this.playPause.bind(this)}><svg class={`olymp-${this.state.player.playPause}-icon`}><use href={`/static/svg-icons/sprites/icons.svg#olymp-${this.state.player.playPause}-icon`}></use></svg></button>
                                                </div>
                                                <div class="audio-progress-bar-wrapper col-8 col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                                    <input type="range" class="custom-range audio-progress" value={this.state.player.sliderValue} min="0" max={this.state.player.sliderMax} onChange={this.seekAudio.bind(this)} />
                                                </div>
                                                <div class="audio-mute-wrapper col-2 col-xs-1 col-sm-1 col-md-1 col-lg-1">
                                                    <button class="mute-unmute" onClick={this.muteUnmute.bind(this)}><svg class={`olymp-music-${this.state.player.muteUnmute}-icon`}><use href={`/static/svg-icons/sprites/icons-music.svg#olymp-music-${this.state.player.muteUnmute}-icon`}></use></svg></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    { btnPrev() } { btnNext() }
                                </div>
                            </div>
                            <div class="open-photo-content col-12 col-xs-12 col-sm-12 col-md-4 col-lg-4">
                                <article class="hentry post">
                                    <PostAuthor user={user} updated_at={album.updated_at} />
                                    <p>{ activity ? activity : '' }</p>
                                    {/*<p>With: <a href="#">Jessy Owen</a>, <a href="#">Marina Valentine</a></p>*/}
                                    <PostReactions data={{id:album._id,creator:album.creator,likes:album.likes,comments:album.comments,shares:album.shares }} />
                                    <PostControls data={{id:album._id,creator:album.creator,likes:album.likes,comments:album.comments,shares:album.shares }} />
                                </article>

                                <div class="mCustomScrollbar" ref={(ref) => this.commentsList = ref} data-mcs-theme="dark">
                                    <CommentsList data={{id:album._id,creator:album.creator,comments:album.comments }} />
                                </div>
                                <CommentForm data={{id:album._id,creator:album.creator }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    album: state.album,
    self: state.self
});
export default connect(mapStateToProps)(OpenAlbumPopupV2);