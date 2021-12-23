import React, { Component, lazy } from 'react';

const PostAuthor   = lazy(() => import('./gadget/PostAuthor'));
const PostCaption  = lazy(() => import('./gadget/PostCaption'));
const PostFooter   = lazy(() => import('./gadget/PostFooter'));
//const PostControls = lazy(() => import('./gadget/PostControls'));

class GIF extends Component {
    openAlbum () {
        this.props.onClick(this.props.index);
    }
    render () {
        let story = this.props.story;
        let album = story.album;
        let user  = story.user;
        let last  = album.files.length-1;
        return (
            <div class="ui-block">
                <article class="hentry post has-post-thumbnail">
                    <PostAuthor files={album.files} user={user} updated_at={story.updated_at} type={story.type} />
                    <PostCaption activity={album.activity} />
                
                    <div class="post-thumb" onClick={this.openAlbum.bind(this)}>
                        <img class="gif-play-image" data-mode="video" data-mp4="/static/videos/post_video.mp4" src="/static/img/post__thumb3.jpg"  alt="gif"/>
                    </div>
                
                    <PostFooter onComment={this.openAlbum.bind(this)} album={{id:album._id,creator:album.creator,likes:album.likes,comments:album.comments,shares:album.shares,index:this.props.index }} />
                    {/*<PostControls album={{id:album._id,creator:album.creator,likes:album.likes,comments:album.comments,shares:album.shares,index:this.props.index }} />*/}
                </article>
            </div>
        )
    }
}

export default GIF;