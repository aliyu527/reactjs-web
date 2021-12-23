import React, { Component } from 'react';

class Loading extends Component {
    render () {
        return (
            <div class="general-loading">
                <img src={`/static/spinner/busy.gif`} alt="Loading..." />
            </div>
        )
    }
}
export default Loading;