import React, { Component } from 'react';
import Config from '../../../utils/Config';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import superagent from 'superagent';

class BirthsdayAlert extends Component {
    render () {
        return (
            <div class="ui-block">
                {/*<!-- W-Birthsday-Alert -->*/}
                
                <div class="widget w-birthday-alert">
                    <div class="icons-block">
                        <svg class="olymp-cupcake-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-cupcake-icon"></use></svg>
                        <a href="#" class="more"><svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg></a>
                    </div>
                
                    <div class="content">
                        <div class="author-thumb no-border">
                            <img src="/static/img/avatar48-sm.jpg" alt="author"/>
                        </div>
                        <span>Today is</span>
                        <a href="#" class="h4 title">Marina Valentine’s Birthday!</a>
                        <p>Leave her a message with your best wishes on her profile page!</p>
                    </div>
                </div>
                
                {/*<!-- ... end W-Birthsday-Alert -->*/}			
            </div>
        )
    }
}
const mapStateToProps = state => ({
    self: state.self,
    status: state.status
});

export default connect(mapStateToProps)(withRouter(BirthsdayAlert));