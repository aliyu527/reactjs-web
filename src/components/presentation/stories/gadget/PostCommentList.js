import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import Config from '../../../../utils/Config';
import superagent from 'superagent';
import moment from 'moment';

class PostCommentList extends Component {
    componentDidMount () {
        //this.getComments();
    }
    comments (callback) {
        //let stories = Object.assign([], this.props.status.stories);
        let album   = this.props.album;
        //let index   = album.index;
        //let self    = this;
        superagent
            .get(Config.API.URL+'/album/comments/'+this.props.album.id)
            .set('x-access-jwt', localStorage.getItem('jwt'))
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    callback(err, []);
                } else {
                    if (res.body.info.code == 200) {
                        callback(null, res.body.payload);
                        //console.log(res.body.payload);
                        //stories[index].album.comments = res.body.payload;
                        //self.props.dispatch(setStories(stories));
                    } else {
                        callback(err, []);
                    }
                }
            });
    }
    render () {
        let album    = this.props.album;
        let comments = album.comments;
        return (
            <div>{/* class={comments.length <= 0 ? 'd-none' : ''} */}
                <ul class="comments-list">
                    
                    {comments.slice(0, 5).map((comment, i) => {
                        return (
                            <li class="comment-item" key={i}>
                                <div class="post__author author vcard inline-items">
                                    <img src={comment.user.avatar ? Config.FILES.AVATAR+'/'+comment.user.avatar : '/static/icons/avatar.png'} alt="author"/>
                                    <div class="author-date">
                                        <NavLink class="h6 post__author-name fn" to={`/owe/profile/${comment.user.username}`}>{comment.user.fname+ ' ' +comment.user.lname}</NavLink>
                                        <div class="post__date">
                                            <time class="published" dateTime={comment.datetime}>{ moment(comment.datetime).fromNow() }</time>
                                        </div>
                                    </div>
                        
                                    {/*<a href="javascript:void(0)" class="more"><svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg></a>*/}
                                </div>
                                <p>{ comment.text }</p>
                                {/*<a href="#" class="post-add-icon inline-items">
                                    <svg class="olymp-heart-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-heart-icon"></use></svg>
                                    <span>3</span>
                                </a>
                                <a href="#" class="reply">Reply</a>*/}
                            </li>
                        )
                    })}
                </ul>
                {/*<a href="javascript:void(0)" class="more-comments">View more comments <span>+</span></a>*/}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    status : state.status,
    self : state.self
});
export default connect(mapStateToProps)(withRouter(PostCommentList));