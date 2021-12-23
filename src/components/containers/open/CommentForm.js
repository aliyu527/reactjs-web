import React, { Component } from 'react';
import { connect } from 'react-redux';
import Config from '../../../utils/Config';
import superagent from 'superagent';
import { setAlbumData } from '../../../actions/Album';

class CommentForm extends Component {
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
            let data    = this.props.album.data;
            let album   = data.album;
            let creator = album.creator;
            let albumid = album._id;
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
                            data.album.comments           = res.body.payload;
                            comment.text                  = '';
                            self.setState({comment:comment});
                            self.props.dispatch(setAlbumData(data));
                        }
                    }
                });
        }
    }
    render () {
        let avatar = this.props.self.data.avatar;
        return (
            <form class="comment-form inline-items" onSubmit={this.comment.bind(this)}>
                <div class="post__author author vcard inline-items">
                    <span class="bordered-author"><img src={avatar ? Config.FILES.AVATAR+'/'+avatar : '/static/icons/avatar.png'} alt="author"/></span>
                    <div class="form-group "> {/* with-icon-right */}
                        <input type="text" class="form-control" placeholder="Press enter to comment" value={this.state.comment.text} onChange={this.updateComment.bind(this)} />
                        {/*<div class="add-options-message">
                            <a href="#" class="options-message">
                                <svg class="olymp-camera-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-camera-icon"></use></svg>
                            </a>
                        </div>*/}
                    </div>
                </div>
            </form>
        )
    }
}

const mapStateToProps = state => ({
    self : state.self,
    album : state.album
});
export default connect(mapStateToProps)(CommentForm);