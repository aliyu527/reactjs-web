import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAlbumData } from '../../../actions/Album';
import superagent from 'superagent';
import Config from '../../../utils/Config';

class PostControls extends Component {
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
        let album = this.props.data;
        let likes = album.likes;
        let liked = () => {
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
    self: state.self,
    album: state.album
});
export default connect(mapStateToProps)(PostControls);