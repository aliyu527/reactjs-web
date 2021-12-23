import React, { Component } from 'react';
import './Splash.css';

class Splash extends Component {
    render() {
        return (
            <div class="gistoneer-splash">
                <div class="gistoneer-splash-content">
                    <img class="gistoneer-splash-icon-size" src="/static/logo/icon-120px/default-stroke.png" alt="Gistoneer" />
                    <h1 class="gistoneer-splash-logo">Gistoneer</h1>
                    <img class="gistoneer-splash-loader" src={`/static/spinner/home.gif`} alt="Loading..." /><br />{this.props.stage}
                </div>
            </div>
        )
    }
}
export default Splash;