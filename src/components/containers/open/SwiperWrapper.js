import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Config from '../../../utils/Config';

class SwiperWrapper extends Component {
    render () {
        let current = this.props.album.current;
        let album   = this.props.album_p;
        let files   = Object.assign([], album.files).reverse(); // current.start, current.end
        let display = (file) => {
            if (file.type == 'photo') {
                return (<img src={file.filename ? Config.FILES.ALBUMS+'/'+album.folder+'/'+file.filename: '/static/icons/audio-file-large.png'} alt="photo"/>)
            } else if (file.type == 'audio') {
                return (<img src={file.cover ? Config.FILES.ALBUMS+'/'+album.folder+'/cover/'+file.cover: '/static/icons/audio-file-large.png'} alt="photo"/>)
            } else if (file.type == 'video') {
                return (<video src={file.filename ? Config.FILES.ALBUMS+'/'+album.folder+'/'+file.filename: ''}></video>)
            }
        }
        return (
            <div class="swiper-wrapper">
                {files.slice(current.start).map((file, i) => {
                    return (
                        <div class="swiper-slide" key={i}>
                            <div id="model-video-player" class="photo-item"> {/* data-swiper-parallax="-300" data-swiper-parallax-duration="500" */}
                                <span key={i}>{ display(file) }</span>
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
                <div class={`audio-player-wrapper ${this.props.album.type == 'photo' ? 'd-none' : ''}`}>
                    <div class="audio-player row no-gutters">
                        <div class="audio-time">
                            <time class="current-time">00:00</time>
                            <time class="duration">00:00</time>
                        </div>
                        <div class="audio-controls col-2 col-xs-1 col-sm-1 col-md-1 col-lg-1">
                            <button class="play-pause"><svg class="olymp-play-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-play-icon"></use></svg></button>
                        </div>
                        <div class="audio-progress-bar-wrapper col-6 col-xs-8 col-sm-8 col-md-8 col-lg-8">
                            <div class="audio-progress-bar">
                                <div class="audio-progress"></div>
                            </div>
                        </div>
                        <div class="audio-mute-wrapper col-2 col-xs-1 col-sm-1 col-md-1 col-lg-1">
                            <button class="mute-unmute"><svg class="olymp-music-sound-icon"><use href="/static/svg-icons/sprites/icons-music.svg#olymp-music-sound-icon"></use></svg></button>
                        </div>
                        <div class="audio-volume-controls col-2 col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            <div class="audio-vol-bar">
                                <div class="audio-vol-progress"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    album: state.album
});
export default connect(mapStateToProps)(SwiperWrapper);