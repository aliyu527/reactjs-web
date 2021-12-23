import React, { Component } from 'react';
import Config from '../../../utils/Config';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import superagent from 'superagent';

class HappeningNow extends Component {
    render () {
        return (
            <div class="ui-block">
                <div class="ui-block-title">
                    <h6 class="title">Happening Now</h6>
                    <a href="#" class="more"><svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg></a>
                </div>
                {/*<!-- W-Activity-Feed -->*/}
                
                <ul class="widget w-activity-feed notification-list">
                    <li>
                        <div class="author-thumb no-border">
                            <img src="/static/img/avatar49-sm.jpg" alt="author"/>
                        </div>
                        <div class="notification-event">
                            <a href="#" class="h6 notification-friend">Marina Polson</a> commented on Jason Mark’s <a href="#" class="notification-link">photo.</a>.
                            <span class="notification-date"><time class="entry-date updated" dateTime="2004-07-24T18:18">2 mins ago</time></span>
                        </div>
                    </li>
                
                    <li>
                        <div class="author-thumb no-border">
                            <img src="/static/img/avatar9-sm.jpg" alt="author"/>
                        </div>
                        <div class="notification-event">
                            <a href="#" class="h6 notification-friend">Jake Parker </a> liked Nicholas Grissom’s <a href="#" class="notification-link">status update.</a>.
                            <span class="notification-date"><time class="entry-date updated" dateTime="2004-07-24T18:18">5 mins ago</time></span>
                        </div>
                    </li>
                
                    <li>
                        <div class="author-thumb no-border">
                            <img src="/static/img/avatar50-sm.jpg" alt="author"/>
                        </div>
                        <div class="notification-event">
                            <a href="#" class="h6 notification-friend">Mary Jane Stark </a> added 20 new photos to her <a href="#" class="notification-link">gallery album.</a>.
                            <span class="notification-date"><time class="entry-date updated" dateTime="2004-07-24T18:18">12 mins ago</time></span>
                        </div>
                    </li>
                
                    <li>
                        <div class="author-thumb no-border">
                            <img src="/static/img/avatar51-sm.jpg" alt="author"/>
                        </div>
                        <div class="notification-event">
                            <a href="#" class="h6 notification-friend">Nicholas Grissom </a> updated his profile <a href="#" class="notification-link">photo</a>.
                            <span class="notification-date"><time class="entry-date updated" dateTime="2004-07-24T18:18">1 hour ago</time></span>
                        </div>
                    </li>
                    <li>
                        <div class="author-thumb no-border">
                            <img src="/static/img/avatar48-sm.jpg" alt="author"/>
                        </div>
                        <div class="notification-event">
                            <a href="#" class="h6 notification-friend">Marina Valentine </a> commented on Chris Greyson’s <a href="#" class="notification-link">status update</a>.
                            <span class="notification-date"><time class="entry-date updated" dateTime="2004-07-24T18:18">1 hour ago</time></span>
                        </div>
                    </li>
                
                    <li>
                        <div class="author-thumb no-border">
                            <img src="/static/img/avatar52-sm.jpg" alt="author"/>
                        </div>
                        <div class="notification-event">
                            <a href="#" class="h6 notification-friend">Green Goo Rock </a> posted a <a href="#" class="notification-link">status update</a>.
                            <span class="notification-date"><time class="entry-date updated" dateTime="2004-07-24T18:18">1 hour ago</time></span>
                        </div>
                    </li>
                    <li>
                        <div class="author-thumb no-border">
                            <img src="/static/img/avatar10-sm.jpg" alt="author"/>
                        </div>
                        <div class="notification-event">
                            <a href="#" class="h6 notification-friend">Elaine Dreyfuss  </a> liked your <a href="#" class="notification-link">blog post</a>.
                            <span class="notification-date"><time class="entry-date updated" dateTime="2004-07-24T18:18">2 hours ago</time></span>
                        </div>
                    </li>
                
                    <li>
                        <div class="author-thumb no-border">
                            <img src="/static/img/avatar10-sm.jpg" alt="author"/>
                        </div>
                        <div class="notification-event">
                            <a href="#" class="h6 notification-friend">Elaine Dreyfuss  </a> commented on your <a href="#" class="notification-link">blog post</a>.
                            <span class="notification-date"><time class="entry-date updated" dateTime="2004-07-24T18:18">2 hours ago</time></span>
                        </div>
                    </li>
                
                    <li>
                        <div class="author-thumb no-border">
                            <img src="/static/img/avatar53-sm.jpg" alt="author"/>
                        </div>
                        <div class="notification-event">
                            <a href="#" class="h6 notification-friend">Bruce Peterson </a> changed his <a href="#" class="notification-link">profile picture</a>.
                            <span class="notification-date"><time class="entry-date updated" dateTime="2004-07-24T18:18">15 hours ago</time></span>
                        </div>
                    </li>
                
                </ul>
                
                {/*<!-- .. end W-Activity-Feed -->*/}
            </div>
        )
    }
}
const mapStateToProps = state => ({
    self: state.self,
    status: state.status
});

export default connect(mapStateToProps)(withRouter(HappeningNow));