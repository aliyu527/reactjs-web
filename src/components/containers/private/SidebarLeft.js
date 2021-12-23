import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SidebarLeft extends Component {
    componentDidMount () {
        let $window   = $(window)
		let $document = $(document)
		let $body     = $('body');
        let $sidebar  = $('.fixed-sidebar');

        // Toggle aside panels
        $(".js-sidebar-open").on('click', function () {
            var mobileWidthApp = $('body').outerWidth();
            if(mobileWidthApp <= 560) {
                $(this).closest('body').find('.popup-chat-responsive').removeClass('open-chat');
            }

            $(this).toggleClass('active');
            $(this).closest($sidebar).toggleClass('open');
            return false;
        });

        // Close on "Esc" click
        $window.keydown(function (eventObject) {
            if (eventObject.which == 27 && $sidebar.is(':visible')) {
                $sidebar.removeClass('open');
            }
        });

        // Close on click outside elements.
        $document.on('click', function (event) {
            if (!$(event.target).closest($sidebar).length && $sidebar.is(':visible')) {
                $sidebar.removeClass('open');
            }
        });
    }
    render () {
        return (
            <div class="fixed-sidebar">
                <div class="fixed-sidebar-left sidebar--small" id="sidebar-left">
                    <Link to="/owe" class="logo">
                        <div class="img-wrap">
                            <img src="/static/logo/icon-50x50/white-50px.png" alt="Gistoneer" />
                        </div>
                    </Link>
                    <div class="mCustomScrollbar" data-mcs-theme="dark">
                        <ul class="left-menu">
                            <li>
                                <a href="javascript:void(0)" class="js-sidebar-open">
                                    <svg class="olymp-menu-icon left-menu-icon"  data-toggle="tooltip" data-placement="right" data-original-title="OPEN MENU">
                                        <use href="/static/svg-icons/sprites/icons.svg#olymp-menu-icon"></use>
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <Link to="/owe">
                                    <svg class="olymp-newsfeed-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="STATUS">
                                        <use href="/static/svg-icons/sprites/icons.svg#olymp-newsfeed-icon"></use>
                                    </svg>
                                </Link>
                            </li>

                            {/*<li>
                                <a href="/audios">
                                    <svg class="olymp-headphones-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="AUDIO & PLAYLISTS">
                                        <use href="/static/svg-icons/sprites/icons.svg#olymp-headphones-icon"></use>
                                    </svg>
                                </a>
                            </li>*/}
                            
                        </ul>
                    </div>
                </div>

                <div class="fixed-sidebar-left sidebar--large" id="sidebar-left-1">
                    <Link to="/owe" class="logo">
                        <div class="img-wrap">
                            <img src="/static/logo/icon-50x50/white-50px.png" alt="Gistoneer" />
                        </div>
                        <div class="title-block">
                            <h6 class="logo-title custome-logo">Gistoneer</h6>
                            {/*<h6 class="logo-title">
                                <img src="/static/logo/g33.png" alt="Gistoneer" />
                            </h6>*/}
                        </div>
                    </Link>

                    <div class="mCustomScrollbar" data-mcs-theme="dark">
                        <ul class="left-menu">
                            <li>
                                <a href="javascript:void(0)" class="js-sidebar-open">
                                    <svg class="olymp-close-icon left-menu-icon">
                                        <use href="/static/svg-icons/sprites/icons.svg#olymp-close-icon"></use>
                                    </svg>
                                    <span class="left-menu-title">Collapse Menu</span>
                                </a>
                            </li>
                            <li>
                                <Link to="/owe">
                                    <svg class="olymp-newsfeed-icon left-menu-icon" data-toggle="tooltip" data-placement="right" data-original-title="STATUS">
                                        <use href="/static/svg-icons/sprites/icons.svg#olymp-newsfeed-icon"></use>
                                    </svg>
                                    <span class="left-menu-title">Status</span>
                                </Link>
                            </li>
                            {/*<li>
                                <a href="/audios">
                                    <svg class="olymp-headphones-icon left-menu-icon"  data-toggle="tooltip" data-placement="right" data-original-title="AUDIOS & PLAYLISTS">
                                        <use href="/static/svg-icons/sprites/icons.svg#olymp-headphones-icon"></use>
                                    </svg>
                                    <span class="left-menu-title">Audio & Playlist</span>
                                </a>
                            </li>*/}
                        </ul>
                        {/*<!--
                        <div class="profile-completion">
                            <div class="skills-item">
                                <div class="skills-item-info">
                                    <span class="skills-item-title">Profile Completion</span>
                                    <span class="skills-item-count"><span class="count-animate" data-speed="1000" data-refresh-interval="50" data-to="76" data-from="0"></span><span class="units">76%</span></span>
                                </div>
                                <div class="skills-item-meter">
                                    <span class="skills-item-meter-active bg-primary" style="width: 76%"></span>
                                </div>
                            </div>
                            <span>Complete <a href="#">your profile</a> so people can know more about you!</span>
                        </div>-->*/}
                    </div>
                </div>
                
            </div>
        )
    }
}

export default SidebarLeft;