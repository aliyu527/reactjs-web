import React, { Component } from 'react';

class Loader extends Component {
    render () {
        return (
            <img id="loader" src={`/static/spinner/home.gif`} alt="Loading..." />
        )
    }
}

export default Loader;