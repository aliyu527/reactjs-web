import React, { Component } from 'react';
import { connect } from 'react-redux';

class OpenAlbumPopupV1 extends Component {
    render () {
        return (
            <div class="modal fade" id="open-album-popup-v1" tabIndex="-1" role="dialog" aria-labelledby="open-album-popup-v1" aria-hidden="true">
                <div class="modal-dialog window-popup open-photo-popup open-photo-popup-v1" role="document">
                    <div class="modal-content">
                        <a href="#" class="close icon-close" data-dismiss="modal" aria-label="Close">
                            <svg class="olymp-close-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-close-icon"></use></svg>
                        </a>

                        <div class="modal-body">
                            <div class="open-photo-thumb">
                                <div class="swiper-container" data-slide="fade">
                                    <div class="swiper-wrapper">

                                        <div class="swiper-slide">
                                            <div class="photo-item">
                                                <img src="/static/img/open-photo1.jpg" alt="photo"/>
                                                <div class="overlay"></div>
                                                <a href="#" class="more"><svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg></a>
                                                <a href="#" class="tag-friends" data-toggle="tooltip" data-placement="top"   data-original-title="TAG YOUR FRIENDS">
                                                    <svg class="olymp-happy-face-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use></svg>
                                                </a>

                                                <div class="content">
                                                    <a href="#" class="h6 title">Photoshoot 2016</a>
                                                    <time class="published" dateTime="2017-03-24T18:18">2 weeks ago</time>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="swiper-slide">
                                            <div class="photo-item">
                                                <img src="/static/img/open-photo1.jpg" alt="photo"/>
                                                <div class="overlay"></div>
                                                <a href="#" class="more"><svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg></a>
                                                <a href="#" class="tag-friends" data-toggle="tooltip" data-placement="top"   data-original-title="TAG YOUR FRIENDS">
                                                    <svg class="olymp-happy-face-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use></svg>
                                                </a>

                                                <div class="content">
                                                    <a href="#" class="h6 title">Photoshoot 2016</a>
                                                    <time class="published" dateTime="2017-03-24T18:18">2 weeks ago</time>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="swiper-slide">
                                            <div class="photo-item">
                                                <img src="/static/img/open-photo1.jpg" alt="photo"/>
                                                <div class="overlay"></div>
                                                <a href="#" class="more"><svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg></a>
                                                <a href="#" class="tag-friends" data-toggle="tooltip" data-placement="top"   data-original-title="TAG YOUR FRIENDS">
                                                    <svg class="olymp-happy-face-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use></svg>
                                                </a>

                                                <div class="content">
                                                    <a href="#" class="h6 title">Photoshoot 2016</a>
                                                    <time class="published" dateTime="2017-03-24T18:18">2 weeks ago</time>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    {/*<!--Prev Next Arrows-->*/}

                                    <svg class="btn-next-without olymp-popup-right-arrow"><use href="/static/svg-icons/sprites/icons.svg#olymp-popup-right-arrow"></use></svg>
                                    <svg class="btn-prev-without olymp-popup-left-arrow"><use href="/static/svg-icons/sprites/icons.svg#olymp-popup-left-arrow"></use></svg>
                                </div>
                            </div>

                            <div class="open-photo-content">

                                <article class="hentry post">

                                    <div class="post__author author vcard inline-items">
                                        <img src="/static/img/author-page.jpg" alt="author"/>

                                        <div class="author-date">
                                            <a class="h6 post__author-name fn" href="02-ProfilePage.html">James Spiegel</a>
                                            <div class="post__date">
                                                <time class="published" dateTime="2017-03-24T18:18">
                                                    2 hours ago
                                                </time>
                                            </div>
                                        </div>

                                        <div class="more"><svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
                                            <ul class="more-dropdown">
                                                <li>
                                                    <a href="#">Edit Post</a>
                                                </li>
                                                <li>
                                                    <a href="#">Delete Post</a>
                                                </li>
                                                <li>
                                                    <a href="#">Turn Off Notifications</a>
                                                </li>
                                                <li>
                                                    <a href="#">Select as Featured</a>
                                                </li>
                                            </ul>
                                        </div>

                                    </div>

                                    <p>Here’s a photo from last month’s photoshoot. We really had a great time and got a batch of incredible shots for the new catalog.</p>

                                    <p>With: <a href="#">Jessy Owen</a>, <a href="#">Marina Valentine</a></p>

                                    <div class="post-additional-info inline-items">

                                        <a href="#" class="post-add-icon inline-items">
                                            <svg class="olymp-heart-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-heart-icon"></use></svg>
                                            <span>148</span>
                                        </a>

                                        <ul class="friends-harmonic">
                                            <li>
                                                <a href="#">
                                                    <img src="/static/img/friend-harmonic7.jpg" alt="friend"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <img src="/static/img/friend-harmonic8.jpg" alt="friend"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <img src="/static/img/friend-harmonic9.jpg" alt="friend"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <img src="/static/img/friend-harmonic10.jpg" alt="friend"/>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <img src="/static/img/friend-harmonic11.jpg" alt="friend"/>
                                                </a>
                                            </li>
                                        </ul>

                                        <div class="names-people-likes">
                                            <a href="#">Diana</a>, <a href="#">Nicholas</a> and
                                            <br/>13 more liked this
                                        </div>


                                        <div class="comments-shared">
                                            <a href="#" class="post-add-icon inline-items">
                                                <svg class="olymp-speech-balloon-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-speech-balloon-icon"></use></svg>
                                                <span>61</span>
                                            </a>

                                            <a href="#" class="post-add-icon inline-items">
                                                <svg class="olymp-share-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-share-icon"></use></svg>
                                                <span>32</span>
                                            </a>
                                        </div>


                                    </div>

                                    <div class="control-block-button post-control-button">

                                        <a href="#" class="btn btn-control">
                                            <svg class="olymp-like-post-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-like-post-icon"></use></svg>
                                        </a>

                                        <a href="#" class="btn btn-control">
                                            <svg class="olymp-comments-post-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use></svg>
                                        </a>

                                        <a href="#" class="btn btn-control">
                                            <svg class="olymp-share-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-share-icon"></use></svg>
                                        </a>

                                    </div>

                                </article>

                                <div class="mCustomScrollbar" data-mcs-theme="dark">

                                    <ul class="comments-list">
                                        <li class="comment-item">
                                            <div class="post__author author vcard inline-items">
                                                <img src="/static/img/avatar48-sm.jpg" alt="author"/>

                                                <div class="author-date">
                                                    <a class="h6 post__author-name fn" href="#">Marina Valentine</a>
                                                    <div class="post__date">
                                                        <time class="published" dateTime="2017-03-24T18:18">
                                                            46 mins ago
                                                        </time>
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
                                    </ul>

                                </div>

                                <form class="comment-form inline-items">

                                    <div class="post__author author vcard inline-items">
                                        <img src="/static/img/author-page.jpg" alt="author"/>

                                        <div class="form-group with-icon-right ">
                                            <textarea class="form-control" placeholder="Press Enter to post..."></textarea>
                                            <div class="add-options-message">
                                                <a href="#" class="options-message">
                                                    <svg class="olymp-camera-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-camera-icon"></use></svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    self: state.self
});
export default connect(mapStateToProps)(OpenAlbumPopupV1);