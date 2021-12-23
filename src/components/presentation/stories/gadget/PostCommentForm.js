import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import Config from '../../../../utils/Config';
import superagent from 'superagent';
import { setStories } from '../../../../actions/Status';

class PostCommentForm extends Component {
    constructor () {
        super();
        this.state = {
            comment: {
                limit: 150,
                text: ''
            }
        }
    }
    updateComment (e) {
        let comment  = Object.assign({}, this.state.comment);
        let limit    = parseInt(comment.limit);
        comment.text = e.target.value.substring(0, limit)
        this.setState({comment:comment});
    }
    comment (e) {
        e.preventDefault();
        let comment = Object.assign({}, this.state.comment);
        let text    = comment.text.trim();
        if (text.length > 0) {
            let stories = Object.assign([], this.props.status.stories);
            let album   = this.props.album;
            let creator = album.creator;
            let albumid = album.id;
            let index   = album.index;
            let self    = this;
            superagent
                .post(Config.API.URL+'/album/comment')
                .send({albumid:albumid, creator:creator, comment:text})
                .set('x-access-jwt', this.props.self.jwt)
                .set('Accept', 'application/json')
                .end((err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        if (res.body.info.code == 201) {
                            stories[index].album.comments = res.body.payload;
                            comment.text                  = '';
                            self.setState({comment:comment});
                            self.props.dispatch(setStories(stories));
                        }
                    }
                });
        }
    }
    render () {
        let avatar = this.props.self.data.avatar;
        //let album  = this.props.album;
        return (
            <form class="comment-form inline-items" onSubmit={this.comment.bind(this)}>
                <div class="post__author author vcard inline-items">
                    <img src={avatar ? Config.FILES.AVATAR+'/'+avatar : '/static/icons/avatar.png'} alt="author"/>
                    <div class="form-group">{/* with-icon-right */}
                        <input type="text" class="form-control" placeholder="Press enter to comment" value={this.state.comment.text} onChange={this.updateComment.bind(this)} />
                        {/*<div class="add-options-message">
                            <button class="options-message">
                                <svg class="olymp-camera-icon">
                                    <use href="/static/svg-icons/sprites/icons.svg#olymp-camera-icon"></use>
                                </svg>
                            </button>
                        </div>*/}
                    </div>
                </div>
                {/*
                <button class="btn btn-md-2 btn-primary">Comment</button>
                <button class="btn btn-md-2 btn-border-think c-grey btn-transparent custom-color">Cancel</button>
                */}
            </form>
        )
    }
}

const mapStateToProps = state => ({
    status : state.status,
    self : state.self
});
export default connect(mapStateToProps)(withRouter(PostCommentForm));