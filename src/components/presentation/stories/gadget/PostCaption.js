import React, { Component } from 'react';
//import Config from '../../../utils/Config';

class PostCaption extends Component {
    render () {
        let activity = this.props.activity;
        return (
            activity ? <p>{activity}</p> : ''
        )
    }
}

export default PostCaption;