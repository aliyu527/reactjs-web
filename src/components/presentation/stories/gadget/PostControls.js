import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Config from '../../../../utils/Config';
import superagent from 'superagent';
import { setStories } from '../../../../actions/Status';

class PostControls extends Component {
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
            <div class="control-block-button post-control-button">
                <a href="javascript:void(0)" onClick={this.like.bind(this)} class={`btn ${liked()} btn-control`}>
                    <svg class="olymp-like-post-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-like-post-icon"></use></svg>
                </a>
                {/*
                <a href="#" class="btn btn-control">
                    <svg class="olymp-comments-post-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use></svg>
                </a>
                
                <a href="#" class="btn btn-control">
                    <svg class="olymp-share-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-share-icon"></use></svg>
                </a>
                */}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    status: state.status,
    self: state.self
});

export default connect(mapStateToProps)(withRouter(PostControls));