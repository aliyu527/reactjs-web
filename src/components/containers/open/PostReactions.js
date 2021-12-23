import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAlbumData } from '../../../actions/Album';
import superagent from 'superagent';
import Config from '../../../utils/Config';

class PostReactions extends Component {
    like () {
        let data    = Object.assign({}, this.props.album.data);
        let album   = data.album;
        let creator = album.creator;
        let albumid = album._id;
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
                        data.album.likes = res.body.payload;
                        self.props.dispatch(setAlbumData(data));
                    }
                }
            });
    }
    render () {
        let album    = this.props.data;
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
                <div class="comments-shared">
                    <a href="#" class="post-add-icon inline-items">
                        <svg class="olymp-speech-balloon-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-speech-balloon-icon"></use></svg>
                        <span>{ comments.length }</span>
                    </a>
                    {/*
                    <a href="#" class="post-add-icon inline-items">
                        <svg class="olymp-share-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-share-icon"></use></svg>
                        <span>32</span>
                    </a>
                    */}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    self: state.self,
    album: state.album
});
export default connect(mapStateToProps)(PostReactions);