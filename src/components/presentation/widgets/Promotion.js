import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Promotion extends Component {
    render () {
        return (
            <div class="ui-block">
				<div class="widget w-birthday-alert w-action">{/*w-action */}
					<img src="/static/logo/icon-50x50/white-50px.png" alt="Gistoneer" />
					<div class="content">
						<h4 class="title gistoneer-splash-logo">Gistoneer</h4>
						<span>Free mp3, mp4 and images sharing social networking service. However, we intend not to limit our services to music.</span>
						{/*<a href="" class="btn btn-bg-secondary btn-md">Register Now!</a>*/}
					</div>
				</div>
			</div>
        )
    }
}
const mapStateToProps = state => ({
    self: state.self,
    status: state.status
});

export default connect(mapStateToProps)(withRouter(Promotion));