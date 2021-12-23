import React, { Component } from 'react';
import Config from '../../../../utils/Config';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import superagent from 'superagent';
import { setStories } from '../../../../actions/Status';

class PostFooter extends Component {
    openAlbum () {
        this.props.onComment();
    }
    like () {
        let stories = Object.assign([], this.props.status.stories);
        let album   = this.props.album;
        let creator = album.creator;
        let albumid = album.id;
        let index   = album.index;
        let self    = this;
        superagent
            .post(Config.API.URL+'/album/like')
            .send({albumid,creator})
            .set('x-access-jwt', this.props.self.jwt)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    if (res.body.info.code == 201) {
                        stories[index].album.likes = res.body.payload;
                        self.props.dispatch(setStories(stories));
                    }
                }
            });
    }
    render () {
        let album    = this.props.album;
        let id       = album.id;
        let likes    = album.likes;
        let comments = album.comments;
        let shares   = album.shares;
        let liked    = () => {
            for (let i = 0; i < likes.length; i++) {
                if (likes[i].userid == this.props.self.data._id) {
                    return 'liked';
                }
            }
        }
        return (
            <div class="post-additional-info inline-items">
                <button onClick={this.like.bind(this)} class={`post-add-icon ${liked()} inline-items`}>
                    <svg class="olymp-heart-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-heart-icon"></use></svg>
                    <span>{ likes.length }</span>
                </button>
        
                <ul class="friends-harmonic d-none">
                    <li><a href="#"><img src="/static/img/friend-harmonic9.jpg" alt="friend" /></a></li>
                    <li><a href="#"><img src="/static/img/friend-harmonic10.jpg" alt="friend"/></a></li>
                    <li><a href="#"><img src="/static/img/friend-harmonic7.jpg" alt="friend"/></a></li>
                    <li><a href="#"><img src="/static/img/friend-harmonic8.jpg" alt="friend"/></a></li>
                    <li><a href="#"><img src="/static/img/friend-harmonic11.jpg" alt="friend"/></a></li>
                </ul>
                <div class="names-people-likes d-none">{/*d-sm-block */}
                    <a href="#">Jenny</a>, <a href="#">Robert</a> and<br/>18 more liked this
                </div>
        
                <div class="comments-shared">
                    <button onClick={this.openAlbum.bind(this)} class="post-add-icon inline-items">
                        <svg class="olymp-speech-balloon-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-speech-balloon-icon"></use></svg>
                        <span>{ comments.length }</span>
                    </button>
                    {/*
                    <button class="post-add-icon inline-items">
                        <svg class="olymp-share-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-share-icon"></use></svg>
                        <span>16</span>
                    </button>
                    */}
                </div>
                {/*
                <div class="names-people-likes d-block d-sm-none">
                    <a href="#">Jenny</a>, <a href="#">Robert</a> and<br/>18 more liked this
                </div>
                */}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    status: state.status,
    self: state.self
});

export default connect(mapStateToProps)(withRouter(PostFooter));