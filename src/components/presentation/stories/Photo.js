import React, { Component, lazy } from 'react';
import Config from '../../../utils/Config';

const PostAuthor   = lazy(() => import('./gadget/PostAuthor'));
const PostCaption  = lazy(() => import('./gadget/PostCaption'));
const PostFooter   = lazy(() => import('./gadget/PostFooter'));
//const PostControls = lazy(() => import('./gadget/PostControls'));

class Photo extends Component {
    componentDidMount() {
        let story   = this.props.story;
        let loader  = document.getElementById('loader-'+story._id);
        let wrapper = document.getElementById('media-wrapper-'+story._id);
        wrapper.classList.add("d-none");
        loader.classList.remove("d-none");
        document.getElementById(story._id).onload = (e) => {
            loader.classList.add("d-none");
            wrapper.classList.remove("d-none");
        };
    }
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
                    <div class="story-loading" id={`loader-${story._id}`}><img src={`/static/spinner/busy.gif`} alt="Loading..." /></div>
                    <div class="post-thumb d-none" id={`media-wrapper-${story._id}`} >
                        <img id={story._id} src={Config.FILES.ALBUMS+'/'+album.folder+'/'+album.files[last].filename} alt="photo"/>
                    </div>

                    <PostFooter onComment={this.openAlbum.bind(this)} album={{id:album._id,creator:album.creator,likes:album.likes,comments:album.comments,shares:album.shares,index:this.props.index }} />
                    {/*<PostControls album={{id:album._id,creator:album.creator,likes:album.likes,comments:album.comments,shares:album.shares,index:this.props.index }} />*/}
                </article>
            </div>

        )
    }
}

export default Photo;