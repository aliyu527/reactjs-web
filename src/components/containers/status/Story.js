import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PostAuthor, PostCaption, PostFooter, PostCommentList, PostCommentForm } from '../../presentation/stories/gadget';
import { changeCurrentAlbum, setAlbumData, changeCurrentAlbumType } from '../../../actions/Album';
import { updateAlbumPlayer } from '../../../actions/Player';
import Config from '../../../utils/Config';
import superagent from 'superagent';

let modelVideo      = document.createElement('video');
let modelAudio      = new Audio();
let modelPhoto      = new Image();
let modelAudioCover = new Image();

class Story extends Component {
    /*constructor () {
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
    }*/
    
    componentDidMount () {
        console.log('componentDidMount...');
        let self = this;
        superagent
            .get(Config.API.URL+'/status/one/'+this.props.match.params.albumid)
            .set('x-access-jwt', localStorage.getItem('jwt'))
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    if (res.body.info.code == 200) {
                        self.props.dispatch(setAlbumData(res.body.payload));
                        self.addPlayer(0);
                    }
                }
            });
    }
    componentWillUnmount () {
        console.log('componentWillUnmount...');
        this.props.dispatch(changeCurrentAlbum({ start: 0, end: 1 }));
        this.props.dispatch(setAlbumData({user:{}, album:{files:[],likes:[],comments:[],shares:[]}}));
        this.props.dispatch(changeCurrentAlbumType('photo'));

        modelVideo.currentTime = 0; 
        modelVideo.src         = null;
        modelAudio.currentTime = 0;
        modelAudio.src         = null;
        modelAudioCover.src    = null;
    }
    updatePlayer (player) {
        //this.setState({ player:player });

        this.props.dispatch(updateAlbumPlayer(player));
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
        let wrapper = document.querySelector('#model-content-wrapper span');
        if (files[current]) {
            this.props.dispatch(changeCurrentAlbumType(files[current].type));
            if (files[current]) {
                let album  = this.props.album.data.album;
                let file   = files[current];
                let player = Object.assign({}, this.props.player.album);
                //let player = Object.assign({}, this.state.player);
                modelVideo.currentTime = 0;
                modelVideo.src         = null
                modelAudio.currentTime = 0;
                modelAudio.src         = null;
                modelAudioCover.src    = null;
                wrapper.innerHTML      = '';
                if (file.type == 'video') {
                    modelVideo.src    = Config.FILES.ALBUMS+'/'+album.folder+'/'+file.filename;
                    modelVideo.play();
                    modelVideo.muted  = true;
                    player.muteUnmute = 'no-sound';
                    wrapper.appendChild(modelVideo);
                    modelVideo.addEventListener('play', this.playing.bind(this), false);
                    modelVideo.addEventListener('pause', this.pause.bind(this), false);
                    modelVideo.addEventListener('timeupdate', self.updateProgress.bind(self), false);
                } else if (file.type == 'audio') {
                    modelAudio.src      = Config.FILES.ALBUMS+'/'+album.folder+'/'+file.filename;
                    modelAudioCover.src = file.cover ? Config.FILES.ALBUMS+'/'+album.folder+'/cover/'+file.cover: '/static/icons/audio-file-large.png';
                    modelAudio.play();
                    player.muteUnmute   = 'sound';
                    wrapper.appendChild(modelAudioCover);
                    modelAudio.addEventListener('play', this.playing.bind(this), false);
                    modelAudio.addEventListener('pause', this.pause.bind(this), false);
                    modelAudio.addEventListener('timeupdate', this.updateProgress.bind(this), false);
                } else {
                    modelPhoto.src = file.filename ? Config.FILES.ALBUMS+'/'+album.folder+'/'+file.filename: '/static/icons/audio-file-large.png';
                    wrapper.appendChild(modelPhoto);
                }
                this.updatePlayer(player);
            }
        }
    }
    updateProgress (e) {
        let files          = Object.assign([], this.props.album.data.album.files).reverse();
        let current        = this.props.album.current;
        let player         = Object.assign({}, this.props.player.album);
        //let player         = Object.assign({}, this.state.player);
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
        let player       = Object.assign({}, this.props.player.album);
        //let player       = Object.assign({}, this.state.player);
        player.playPause = 'pause';
        this.updatePlayer(player);
    }
    pause (e) {
        let player = Object.assign({}, this.props.player.album);
        //let player = Object.assign({}, this.state.player);
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
        let player = Object.assign({}, this.props.player.album);
        //let player = Object.assign({}, this.state.player);
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
        //let player = Object.assign({}, this.state.player),
        
        let player = Object.assign({}, this.props.player.album), currentMinutes, currentSeconds;
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
        let story    = this.props.album.data;
        let album    = story.album;
        let user     = story.user;
        let files    = Object.assign([], album.files).reverse();
        let activity = album.activity;
        let current  = this.props.album.current;
        let player   = this.props.player.album;

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
        } //files.slice(current.start)
        return (
            <div id="newsfeed-items-grid">
                <article class="open-status">
                    <PostAuthor files={album.files} user={user} updated_at={story.updated_at} type={story.type} />
                    <PostCaption activity={activity} />
                    <div class="post-video swiper-container">
                        <div id="model-content-wrapper" class="video-thumb f-none"><span></span></div>
                        { btnPrev() } { btnNext() }
                        <div class={`audio-player-wrapper ${this.props.album.type == 'photo' ? 'd-none' : ''}`}>
                            <div class="audio-player row no-gutters">
                                <div class="audio-time">
                                    <time class="current-time">{player.currentTime}</time>
                                    <time class="duration">{player.duration}</time>
                                </div>
                                <div class="audio-controls col-2 col-xs-1 col-sm-1 col-md-1 col-lg-1">
                                    <button class="play-pause" onClick={this.playPause.bind(this)}><svg class={`olymp-${player.playPause}-icon`}><use href={`/static/svg-icons/sprites/icons.svg#olymp-${player.playPause}-icon`}></use></svg></button>
                                </div>
                                <div class="audio-progress-bar-wrapper col-8 col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                    <input type="range" class="custom-range audio-progress" value={player.sliderValue} min="0" max={player.sliderMax} onChange={this.seekAudio.bind(this)} />
                                </div>
                                <div class="audio-mute-wrapper col-2 col-xs-1 col-sm-1 col-md-1 col-lg-1">
                                    <button class="mute-unmute" onClick={this.muteUnmute.bind(this)}><svg class={`olymp-music-${player.muteUnmute}-icon`}><use href={`/static/svg-icons/sprites/icons-music.svg#olymp-music-${player.muteUnmute}-icon`}></use></svg></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <PostFooter album={{id:album._id,creator:album.creator,likes:album.likes,comments:album.comments,shares:album.shares,index:this.props.index }} />
                </article>

                {/*<!-- Comments --> */}
                <PostCommentList album={{id:album._id,creator:album.creator,comments:album.comments,index:this.props.index }} />
                
                
                {/*<!-- Comment Form  -->*/}
                <PostCommentForm album={{id:album._id,creator:album.creator,index:this.props.index }} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    player: state.player,
    album: state.album,
    self: state.self
});

export default connect(mapStateToProps)(withRouter(Story));