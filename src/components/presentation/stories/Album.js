import React, { Component, lazy } from 'react';
import Config from '../../../utils/Config';

const PostAuthor   = lazy(() => import('./gadget/PostAuthor'));
const PostCaption  = lazy(() => import('./gadget/PostCaption'));
const PostFooter   = lazy(() => import('./gadget/PostFooter'));
//const PostControls = lazy(() => import('./gadget/PostControls'));

const imagesLoaded = require('imagesloaded');

class Album extends Component {
    componentDidMount () {
        let story   = this.props.story;
        let loader  = document.getElementById('loader-'+story._id);
        let wrapper = document.getElementById('gallery-wrapper-'+story._id);
        wrapper.classList.add("d-none");
        loader.classList.remove("d-none");
        imagesLoaded('#gallery-wrapper-'+story._id).on('done', (e) => {
            loader.classList.add("d-none");
            wrapper.classList.remove("d-none");
        });
    }
    openAlbum () {
        this.props.onClick(this.props.index);
    }
    render () {
        let story = this.props.story;
        let album = story.album;
        let files = Object.assign([], album.files).reverse();
        let user  = story.user;
        let grid  = () => {
            if (files.length == 2) {
                return (
                    <div id={`gallery-wrapper-${story._id}`} class="post-block-photo js-zoom-gallery" onClick={this.openAlbum.bind(this)}>
                        {files.map((file, i) => {
                            return (
                                <span key={i} class="half-width">
                                    <img src={file.cover ? Config.FILES.ALBUMS+'/'+album.folder+'/cover/'+file.cover: '/static/icons/audio-file-large.png'} alt="photo"/>
                                </span>
                            )
                        })}
                    </div>
                )
            } else if (files.length == 3) {
                return (
                    <div id={`gallery-wrapper-${story._id}`} class="post-block-photo js-zoom-gallery" onClick={this.openAlbum.bind(this)}>
                        {files.map((file, i) => {
                            return (
                                <span key={i} class="col grid-3-width">
                                    <img src={file.cover ? Config.FILES.ALBUMS+'/'+album.folder+'/cover/'+file.cover: '/static/icons/audio-file-large.png'} alt="photo"/>
                                </span>
                            )
                        })}
                    </div>
                )
            } else if (files.length == 4) {
                return (
                    <div id={`gallery-wrapper-${story._id}`} class="post-block-photo js-zoom-gallery" onClick={this.openAlbum.bind(this)}>
                        {files.map((file, i) => {
                            return (
                                <span key={i} class="half-width">
                                    <img src={file.cover ? Config.FILES.ALBUMS+'/'+album.folder+'/cover/'+file.cover: '/static/icons/audio-file-large.png'} alt="photo"/>
                                </span>
                            )
                        })}
                    </div>
                )
            } else if (files.length == 5) {
                return (
                    <div id={`gallery-wrapper-${story._id}`} class="post-block-photo js-zoom-gallery" onClick={this.openAlbum.bind(this)}>
                        {files.map((file, i) => {
                            if (i == 0 || i == 1)  {
                                return (
                                    <span key={i} class="half-width">
                                        <img src={file.cover ? Config.FILES.ALBUMS+'/'+album.folder+'/cover/'+file.cover: '/static/icons/audio-file-large.png'} alt="photo"/>
                                    </span>
                                )
                            } else {
                                return(
                                    <span key={i} class="col grid-3-width">
                                        <img src={file.cover ? Config.FILES.ALBUMS+'/'+album.folder+'/cover/'+file.cover: '/static/icons/audio-file-large.png'} alt="photo"/>
                                    </span>
                                )
                            } 
                        })}
                    </div>
                )
            } else if (files.length > 5) {
                return (
                    <div id={`gallery-wrapper-${story._id}`} class="post-block-photo js-zoom-gallery" onClick={this.openAlbum.bind(this)}>
                        {files.slice(0, 5).map((file, i) => {
                            if (i >= 0 && i <= 1)  {
                                return (
                                    <span key={i} class="half-width">
                                        <img src={file.cover ? Config.FILES.ALBUMS+'/'+album.folder+'/cover/'+file.cover: '/static/icons/audio-file-large.png'} alt="photo"/>
                                    </span>
                                )
                            } else if (i >= 2 && i <= 3) {
                                return(
                                    <span key={i} class="col grid-3-width">
                                        <img src={file.cover ? Config.FILES.ALBUMS+'/'+album.folder+'/cover/'+file.cover: '/static/icons/audio-file-large.png'} alt="photo"/>
                                    </span>
                                )
                            } else {
                                return (
                                    <span key={i} class="more-photos grid-3-width">
                                        <img src={file.cover ? Config.FILES.ALBUMS+'/'+album.folder+'/cover/'+file.cover: '/static/icons/audio-file-large.png'} alt="photo"/>
                                        <span class="h2">+{files.length-5}</span>
                                    </span>
                                )
                            }
                        })}
                    </div>
                )
            }
        } 
        return (
            <div class="ui-block">
                <article class="hentry post">
                    <PostAuthor files={files} user={user} updated_at={story.updated_at} type={story.type} />
                    <PostCaption activity={album.activity} />
                    <div class="story-loading" id={`loader-${story._id}`}><img src={`/static/spinner/busy.gif`} alt="Loading..." /></div>
                    { grid() }
                    <PostFooter onComment={this.openAlbum.bind(this)} album={{id:album._id,creator:album.creator,likes:album.likes,comments:album.comments,shares:album.shares,index:this.props.index }} />
                    {/*<PostControls album={{id:album._id,creator:album.creator,likes:album.likes,comments:album.comments,shares:album.shares,index:this.props.index }} />*/}
                </article>
            </div>
        )
    }
}

export default Album;