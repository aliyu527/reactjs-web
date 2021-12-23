import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Config from '../../utils/Config';

import './Album.css';

class Album extends Component {
    componentDidMount () {
        let album       = this.props.album;
        let albumLoader = document.getElementById(`album-loading-${album._id}`);
        let albumImage  = document.getElementById(`album-image-${album._id}`);
        albumImage.classList.add("d-none");
        albumLoader.classList.remove("d-none");
        albumImage.onload = (e) => {
            albumLoader.classList.add("d-none");
            albumImage.classList.remove("d-none");
        }
    }
    openAlbum () {
        this.props.onClick(this.props.index);
    }
    render () {
        let album = this.props.album;
        let last  = album.files.length-1;
        return (
            <div class="photo-album-item-wrap col-4-width">
                <div class="photo-album-item" data-mh="album-item">
                    <div class="photo-item">
                        <div id={`album-loading-${album._id}`} class="album-loading"><img src={`/static/spinner/home.gif`} alt="Loading..." /></div>
                        <img id={`album-image-${album._id}`} class="album-image d-none" src={album.files[last].cover ? Config.FILES.ALBUMS+'/'+album.folder+'/cover/'+album.files[last].cover: '/static/icons/audio-file-large.png'} alt="photo"/>
                        <div class="overlay overlay-dark"></div>
                        {/*<a href="#" class="more"><svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg></a>*/}
                        
                        <a href="#" class="post-add-icon">
                            <svg class="olymp-heart-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-heart-icon"></use></svg>
                            <span>{ album.likes.length }</span>
                        </a>
                        <a href="javascript:void(0)" onClick={this.openAlbum.bind(this)} class="full-block"></a> {/* data-toggle="modal" data-target="#open-photo-popup-v2" */}
                    </div>
                
                    <div class="content">
                        {/*
                        <div class="more">
                            <svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
                            <ul class="more-dropdown">
                                <li><a href="#">Promote</a></li>
                                <li><a href="#">Delete</a></li>
                            </ul>
                        </div>
                        */}
                        <a href="javascript:void(0)" onClick={this.openAlbum.bind(this)} class="title h5">{ (album.album && album.album.trim().length > 0) ? album.album : 'Untitled Album' }</a> {/* data-toggle="modal" data-target="#open-photo-popup-v2" */}
                        <span class="sub-title">Since: { moment(album.created_at).fromNow() }</span>
                        <ul class="friends-harmonic">
                            {album.files.slice(0, 9).map((file, i) => {
                                return (
                                    <li key={i}><a href="javascript:void(0);"><img src={file.cover ? Config.FILES.ALBUMS+'/'+album.folder+'/cover/'+file.cover: '/static/icons/audio-file-large.png'} alt="friend"/></a></li>
                                )
                            })}
                        {album.files.length > 9 ? <li><a href="javascript:void(0);" class="all-users">+{album.files.length-9}</a></li> : ''}
                        </ul>
                        <div class="friend-count" data-swiper-parallax="-500">
                            <a href="#" class="friend-count-item">
                                <div class="h6">{album.files.length}</div>
                                <div class="title">Media</div>
                            </a>
                            <a href="#" class="friend-count-item">
                                <div class="h6">{album.comments.length}</div>
                                <div class="title">Comments</div>
                            </a>
                            <a href="#" class="friend-count-item">
                                <div class="h6">{album.likes.length}</div>
                                <div class="title">Likes</div>
                            </a>
                        </div>
                    </div>
                
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    profile: state.profile
});
export default connect(mapStateToProps)(Album);