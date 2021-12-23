import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import Config from '../../../utils/Config';

class CommentsList extends Component {
    render () {
        let album    = this.props.album.data.album;
        let albumid  = album._id;
        let comments = album.comments;
        //console.log(album);
        return (
            <ul class="comments-list">
                { comments.map((comment, i) => {
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
                {/*
                <li class="comment-item">
                    <div class="post__author author vcard inline-items">
                        <img src="/static/img/avatar48-sm.jpg" alt="author"/>
                        <div class="author-date">
                            <a class="h6 post__author-name fn" href="#">Marina Valentine</a>
                            <div class="post__date">
                                <time class="published" dateTime="2017-03-24T18:18">46 mins ago</time>
                            </div>
                        </div>
                        <a href="#" class="more"><svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg></a>
                    </div>

                    <p>I had a great time too!! We should do it again!</p>

                    <a href="#" class="post-add-icon inline-items">
                        <svg class="olymp-heart-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-heart-icon"></use></svg>
                        <span>8</span>
                    </a>
                    <a href="#" class="reply">Reply</a>
                </li>

                <li class="comment-item">
                    
                    <div class="post__author author vcard inline-items">
                        <img src="/static/img/avatar4-sm.jpg" alt="author"/>

                        <div class="author-date">
                            <a class="h6 post__author-name fn" href="#">Chris Greyson</a>
                            <div class="post__date">
                                <time class="published" dateTime="2017-03-24T18:18">
                                    1 hour ago
                                </time>
                            </div>
                        </div>
                        <a href="#" class="more"><svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg></a>
                    </div>

                    <p>Dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.</p>

                    <a href="#" class="post-add-icon inline-items">
                        <svg class="olymp-heart-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-heart-icon"></use></svg>
                        <span>7</span>
                    </a>
                    <a href="#" class="reply">Reply</a>

                </li>
                */}
            </ul>
        )
    }
}

const mapStateToProps = state => ({
    album: state.album
});
export default connect(mapStateToProps)(CommentsList);