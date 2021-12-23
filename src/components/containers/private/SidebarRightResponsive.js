import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class SidebarRightResponsive extends Component {
    render () {
        return (
            <div class="fixed-sidebar right fixed-sidebar-responsive">
                <div class="fixed-sidebar-right sidebar--small" id="sidebar-right-responsive">
                    <NavLink to="/owe/people" class="olympus-chat inline-items ">{/* js-chat-open */}
                        <div class="olymp-chat---messages-icon custom-icon">
                            <i class="ion-ios-people-outline"></i>
                            {/*<use href="/static/svg-icons/sprites/icons.svg#olymp-chat---messages-icon"></use>*/}
                        </div>
                    </NavLink>
                </div>
            </div>
        )
    }
}

export default SidebarRightResponsive;