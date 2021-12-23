import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import $ from "jquery";

class Header extends Component {
    componentDidMount () {
        $(".js-open-responsive-menu").on('click', function () {
            $('.header-menu').toggleClass('open');
            return false
        });
    
        $(".js-close-responsive-menu").on('click', function () {
            $('.header-menu').removeClass('open');
            return false
        });
        
        $(".js-expanded-menu").on('click', function () {
            $('.header-menu').toggleClass('expanded-menu');
            return false
        });
    
    }
    render () {
        return (
            <div>
                <div class="content-bg-wrap"></div>
                <div class="header--standard header--standard-landing" id="header--standard">
                    <div class="container">
                        <div class="header--standard-wrap">

                            <NavLink to="/" class="logo">
                                <div class="img-wrap custome-logo">Gistoneer</div>
                            </NavLink>

                            <a href="#" class="open-responsive-menu js-open-responsive-menu">
                                <svg class="olymp-menu-icon">
                                    <use href="/static/svg-icons/sprites/icons.svg#olymp-menu-icon"></use>
                                </svg>
                            </a>

                            <div class="nav nav-pills nav1 header-menu">
                                <div class="mCustomScrollbar">
                                    <ul>
                                        <li class="nav-item">
                                            <a href="#" class="nav-link">Home</a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="#" class="nav-link">Privacy Policy</a>
                                        </li>
                                        <li class="close-responsive-menu js-close-responsive-menu">
                                            <svg class="olymp-close-icon">
                                                <use href="/static/svg-icons/sprites/icons.svg#olymp-close-icon"></use>
                                            </svg>
                                        </li>
                                        <li class="nav-item js-expanded-menu">
                                            <a href="#" class="nav-link">
                                                <svg class="olymp-menu-icon">
                                                    <use href="/static/svg-icons/sprites/icons.svg#olymp-menu-icon"></use>
                                                </svg>
                                                <svg class="olymp-close-icon">
                                                    <use href="/static/svg-icons/sprites/icons.svg#olymp-close-icon"></use>
                                                </svg>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;