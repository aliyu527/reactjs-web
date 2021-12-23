import React, { Component } from 'react';
//import { Signin, Signup, styles } from '../../presentation/home';

class SidebarRight extends Component {
    render () {
        return (
            <div class="fixed-sidebar right">
                <div class="fixed-sidebar-right sidebar--small" id="sidebar-right">
                    <div class="mCustomScrollbar" data-mcs-theme="dark">
                        <ul class="chat-users">
                            <li class="inline-items js-chat-open">
                                <div class="author-thumb">
                                    <img alt="author" src="/static/img/avatar67-sm.jpg" class="avatar" />
                                    <span class="icon-status online"></span>
                                </div>
                            </li>
                            <li class="inline-items js-chat-open">
                                <div class="author-thumb">
                                    <img alt="author" src="/static/img/avatar62-sm.jpg" class="avatar" />
                                    <span class="icon-status online"></span>
                                </div>
                            </li>

                            <li class="inline-items js-chat-open">
                                <div class="author-thumb">
                                    <img alt="author" src="/static/img/avatar68-sm.jpg" class="avatar" />
                                    <span class="icon-status online"></span>
                                </div>
                            </li>

                            <li class="inline-items js-chat-open">
                                <div class="author-thumb">
                                    <img alt="author" src="/static/img/avatar69-sm.jpg" class="avatar" />
                                    <span class="icon-status away"></span>
                                </div>
                            </li>

                            <li class="inline-items js-chat-open">
                                <div class="author-thumb">
                                    <img alt="author" src="/static/img/avatar70-sm.jpg" class="avatar" />
                                    <span class="icon-status disconected"></span>
                                </div>
                            </li>
                            <li class="inline-items js-chat-open">
                                <div class="author-thumb">
                                    <img alt="author" src="/static/img/avatar64-sm.jpg" class="avatar"/>
                                    <span class="icon-status online"></span>
                                </div>
                            </li>
                            <li class="inline-items js-chat-open">
                                <div class="author-thumb">
                                    <img alt="author" src="/static/img/avatar71-sm.jpg" class="avatar" />
                                    <span class="icon-status online"></span>
                                </div>
                            </li>
                            <li class="inline-items js-chat-open">
                                <div class="author-thumb">
                                    <img alt="author" src="/static/img/avatar72-sm.jpg" class="avatar" />
                                    <span class="icon-status away"></span>
                                </div>
                            </li>
                            <li class="inline-items js-chat-open">
                                <div class="author-thumb">
                                    <img alt="author" src="/static/img/avatar63-sm.jpg" class="avatar" />
                                    <span class="icon-status status-invisible"></span>
                                </div>
                            </li>
                            <li class="inline-items js-chat-open">
                                <div class="author-thumb">
                                    <img alt="author" src="/static/img/avatar72-sm.jpg" class="avatar" />
                                    <span class="icon-status away"></span>
                                </div>
                            </li>
                            <li class="inline-items js-chat-open">
                                <div class="author-thumb">
                                    <img alt="author" src="/static/img/avatar71-sm.jpg" class="avatar" />
                                    <span class="icon-status online"></span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div class="search-friend inline-items">
                        <a href="#" class="js-sidebar-open">
                            <svg class="olymp-menu-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-menu-icon"></use></svg>
                        </a>
                    </div>
                    <a href="#" class="olympus-chat inline-items js-chat-open">
                        <svg class="olymp-chat---messages-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use></svg>
                    </a>

                </div>

                <div class="fixed-sidebar-right sidebar--large" id="sidebar-right-1">
                    <div class="mCustomScrollbar" data-mcs-theme="dark">
                        <div class="ui-block-title ui-block-title-small">
                            <a href="#" class="title">Contacts</a>
                            <a href="#">Settings</a>
                        </div>
                        <ul class="chat-users">
                            <li class="inline-items js-chat-open">
                                <div class="author-thumb">
                                    <img alt="author" src="/static/img/avatar67-sm.jpg" class="avatar" />
                                    <span class="icon-status online"></span>
                                </div>

                                <div class="author-status">
                                    <a href="#" class="h6 author-name">Musa Hamisu</a>
                                    <span class="status">ONLINE</span>
                                </div>

                                <div class="more"><svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>

                                    <ul class="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top" data-original-title="START CONVERSATION" class="olymp-comments-post-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use></svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top" data-original-title="ADD TO CONVERSATION" class="olymp-add-to-conversation-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon"></use></svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top" data-original-title="BLOCK FROM CHAT" class="olymp-block-from-chat-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-block-from-chat-icon"></use></svg>
                                        </li>
                                    </ul>

                                </div>

                            </li>
                            <li class="inline-items js-chat-open">
                                <div class="author-thumb">
                                    <img alt="author" src="/static/img/avatar62-sm.jpg" class="avatar"/>
                                    <span class="icon-status online"></span>
                                </div>

                                <div class="author-status">
                                    <a href="#" class="h6 author-name">Musa Hamisu</a>
                                    <span class="status">AT WORK!</span>
                                </div>
                                <div class="more"><svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
                                    <ul class="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top" data-original-title="START CONVERSATION" class="olymp-comments-post-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use></svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top" data-original-title="ADD TO CONVERSATION" class="olymp-add-to-conversation-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon"></use></svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top" data-original-title="BLOCK FROM CHAT" class="olymp-block-from-chat-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-block-from-chat-icon"></use></svg>
                                        </li>
                                    </ul>

                                </div>

                            </li>

                            <li class="inline-items js-chat-open">
                                <div class="author-thumb">
                                    <img alt="author" src="/static/img/avatar68-sm.jpg" class="avatar"/>
                                    <span class="icon-status online"></span>
                                </div>

                                <div class="author-status">
                                    <a href="#" class="h6 author-name">Musa Hamisu</a>
                                    <span class="status">ONLINE</span>
                                </div>

                                <div class="more"><svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>

                                    <ul class="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top" data-original-title="START CONVERSATION" class="olymp-comments-post-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use></svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top" data-original-title="ADD TO CONVERSATION" class="olymp-add-to-conversation-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon"></use></svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top" data-original-title="BLOCK FROM CHAT" class="olymp-block-from-chat-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-block-from-chat-icon"></use></svg>
                                        </li>
                                    </ul>

                                </div>


                            </li>

                            <li class="inline-items js-chat-open">
                                <div class="author-thumb">
                                    <img alt="author" src="/static/img/avatar69-sm.jpg" class="avatar"/>
                                    <span class="icon-status away"></span>
                                </div>

                                <div class="author-status">
                                    <a href="#" class="h6 author-name">Musa Hamisu</a>
                                    <span class="status">AWAY</span>
                                </div>

                                <div class="more"><svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>

                                    <ul class="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top" data-original-title="START CONVERSATION" class="olymp-comments-post-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use></svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top" data-original-title="ADD TO CONVERSATION" class="olymp-add-to-conversation-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon"></use></svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top" data-original-title="BLOCK FROM CHAT" class="olymp-block-from-chat-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-block-from-chat-icon"></use></svg>
                                        </li>
                                    </ul>

                                </div>


                            </li>

                            <li class="inline-items js-chat-open">


                                <div class="author-thumb">
                                    <img alt="author" src="/static/img/avatar70-sm.jpg" class="avatar"/>
                                    <span class="icon-status disconected"></span>
                                </div>

                                <div class="author-status">
                                    <a href="#" class="h6 author-name">Musa Hamisu</a>
                                    <span class="status">OFFLINE</span>
                                </div>

                                <div class="more"><svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>

                                    <ul class="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top" data-original-title="START CONVERSATION" class="olymp-comments-post-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use></svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top" data-original-title="ADD TO CONVERSATION" class="olymp-add-to-conversation-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon"></use></svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top" data-original-title="BLOCK FROM CHAT" class="olymp-block-from-chat-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-block-from-chat-icon"></use></svg>
                                        </li>
                                    </ul>

                                </div>


                            </li>
                        </ul>


                        <div class="ui-block-title ui-block-title-small">
                            <a href="#" class="title">MY FAMILY</a>
                            <a href="#">Settings</a>
                        </div>

                        <ul class="chat-users">
                            <li class="inline-items js-chat-open">

                                <div class="author-thumb">
                                    <img alt="author" src="/static/img/avatar64-sm.jpg" class="avatar"/>
                                    <span class="icon-status online"></span>
                                </div>

                                <div class="author-status">
                                    <a href="#" class="h6 author-name">Musa Hamisu</a>
                                    <span class="status">ONLINE</span>
                                </div>

                                <div class="more"><svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>

                                    <ul class="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top" data-original-title="START CONVERSATION" class="olymp-comments-post-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use></svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top" data-original-title="ADD TO CONVERSATION" class="olymp-add-to-conversation-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon"></use></svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top" data-original-title="BLOCK FROM CHAT" class="olymp-block-from-chat-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-block-from-chat-icon"></use></svg>
                                        </li>
                                    </ul>

                                </div>
                            </li>
                        </ul>


                        <div class="ui-block-title ui-block-title-small">
                            <a href="#" class="title">UNCATEGORIZED</a>
                            <a href="#">Settings</a>
                        </div>

                        <ul class="chat-users">
                            <li class="inline-items js-chat-open">

                                <div class="author-thumb">
                                    <img alt="author" src="/static/img/avatar71-sm.jpg" class="avatar"/>
                                    <span class="icon-status online"></span>
                                </div>

                                <div class="author-status">
                                    <a href="#" class="h6 author-name">Musa Hamisu</a>
                                    <span class="status">ONLINE</span>
                                </div>

                                <div class="more"><svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>

                                    <ul class="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top" data-original-title="START CONVERSATION" class="olymp-comments-post-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use></svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top" data-original-title="ADD TO CONVERSATION" class="olymp-add-to-conversation-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon"></use></svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top" data-original-title="BLOCK FROM CHAT" class="olymp-block-from-chat-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-block-from-chat-icon"></use></svg>
                                        </li>
                                    </ul>

                                </div>


                            </li>
                            <li class="inline-items js-chat-open">

                                <div class="author-thumb">
                                    <img alt="author" src="/static/img/avatar72-sm.jpg" class="avatar"/>
                                    <span class="icon-status away"></span>
                                </div>

                                <div class="author-status">
                                    <a href="#" class="h6 author-name">Musa Hamisu</a>
                                    <span class="status">AWAY</span>
                                </div>

                                <div class="more"><svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
                                    <ul class="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top" data-original-title="START CONVERSATION" class="olymp-comments-post-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use></svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top" data-original-title="ADD TO CONVERSATION" class="olymp-add-to-conversation-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon"></use></svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top" data-original-title="BLOCK FROM CHAT" class="olymp-block-from-chat-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-block-from-chat-icon"></use></svg>
                                        </li>
                                    </ul>

                                </div>

                            </li>
                            <li class="inline-items js-chat-open">

                                <div class="author-thumb">
                                    <img alt="author" src="/static/img/avatar63-sm.jpg" class="avatar"/>
                                    <span class="icon-status status-invisible"></span>
                                </div>

                                <div class="author-status">
                                    <a href="#" class="h6 author-name">Musa Hamisu</a>
                                    <span class="status">INVISIBLE</span>
                                </div>

                                <div class="more"><svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>

                                    <ul class="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top" data-original-title="START CONVERSATION" class="olymp-comments-post-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use></svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top" data-original-title="ADD TO CONVERSATION" class="olymp-add-to-conversation-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon"></use></svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top" data-original-title="BLOCK FROM CHAT" class="olymp-block-from-chat-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-block-from-chat-icon"></use></svg>
                                        </li>
                                    </ul>

                                </div>
                            </li>
                            <li class="inline-items js-chat-open">

                                <div class="author-thumb">
                                    <img alt="author" src="/static/img/avatar72-sm.jpg" class="avatar"/>
                                    <span class="icon-status away"></span>
                                </div>

                                <div class="author-status">
                                    <a href="#" class="h6 author-name">Musa Hamisu</a>
                                    <span class="status">AWAY</span>
                                </div>

                                <div class="more"><svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>

                                    <ul class="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top" data-original-title="START CONVERSATION" class="olymp-comments-post-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use></svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top" data-original-title="ADD TO CONVERSATION" class="olymp-add-to-conversation-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon"></use></svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top" data-original-title="BLOCK FROM CHAT" class="olymp-block-from-chat-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-block-from-chat-icon"></use></svg>
                                        </li>
                                    </ul>

                                </div>
                            </li>
                            <li class="inline-items js-chat-open">

                                <div class="author-thumb">
                                    <img alt="author" src="/static/img/avatar71-sm.jpg" class="avatar"/>
                                    <span class="icon-status online"></span>
                                </div>

                                <div class="author-status">
                                    <a href="#" class="h6 author-name">Musa Hamisu</a>
                                    <span class="status">ONLINE</span>
                                </div>

                                <div class="more"><svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>

                                    <ul class="more-icons">
                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top" data-original-title="START CONVERSATION" class="olymp-comments-post-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use></svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top" data-original-title="ADD TO CONVERSATION" class="olymp-add-to-conversation-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-add-to-conversation-icon"></use></svg>
                                        </li>

                                        <li>
                                            <svg data-toggle="tooltip" data-placement="top" data-original-title="BLOCK FROM CHAT" class="olymp-block-from-chat-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-block-from-chat-icon"></use></svg>
                                        </li>
                                    </ul>

                                </div>
                            </li>
                        </ul>

                    </div>

                    <div class="search-friend inline-items">
                        <form class="form-group" >
                            <input class="form-control" placeholder="Search Friends..." type="text"/>
                        </form>

                        <a href="/29-YourAccount-AccountSettings.html" class="settings">
                            <svg class="olymp-settings-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-settings-icon"></use></svg>
                        </a>

                        <a href="#" class="js-sidebar-open">
                            <svg class="olymp-close-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-close-icon"></use></svg>
                        </a>
                    </div>

                    <a href="#" class="olympus-chat inline-items js-chat-open">

                        <h6 class="olympus-chat-title">Gistoneer Chat</h6>
                        <svg class="olymp-chat---messages-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use></svg>
                    </a>

                </div>
            </div>
        )
    }
}

export default SidebarRight;