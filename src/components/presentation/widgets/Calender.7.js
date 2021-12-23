import React, { Component } from 'react';
import Config from '../../../utils/Config';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import superagent from 'superagent';

class Calender extends Component {
    render () {
        return (
            null
        )
    }
}
const mapStateToProps = state => ({
    self: state.self,
    status: state.status
});

export default connect(mapStateToProps)(withRouter(Calender));