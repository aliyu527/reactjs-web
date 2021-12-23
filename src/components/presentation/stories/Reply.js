import React, { Component, lazy } from 'react';
import Config from '../../../utils/Config';

const PostAuthor   = lazy(() => import('./gadget/PostAuthor'));
const PostCaption  = lazy(() => import('./gadget/PostCaption'));
const PostFooter   = lazy(() => import('./gadget/PostFooter'));
//const PostControls = lazy(() => import('./gadget/PostControls'));


class Reply extends Component {
    openAlbum () {
        this.props.onClick(this.props.index);
    }
    render () {
        return (
            <div class="ui-block">
                <article class="hentry post video">
                    <PostAuthor />
                    <PostCaption />
                
                    <div class="post-video" onClick={this.openAlbum.bind(this)} data-toggle="modal" data-target="#open-photo-popup-v2">
                        <div class="video-thumb">
                            <img src="/static/img/video-youtube1.jpg" alt="photo"/>
                            <a href="/https://youtube.com/watch?v=excVFQ2TWig" class="play-video">
                                <svg class="olymp-play-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-play-icon"></use></svg>
                            </a>
                        </div>
                
                        <div class="video-content">
                            <a href="#" class="h4 title">Iron Maid - ChillGroves</a>
                            <p>Lorem ipsum dolor sit amet, consectetur ipisicing elit, sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua...
                            </p>
                            <a href="#" class="link-site">YOUTUBE.COM</a>
                        </div>
                    </div>
                
                    <PostFooter  />
                </article>
            </div>
        )
    }
}

export default Reply;