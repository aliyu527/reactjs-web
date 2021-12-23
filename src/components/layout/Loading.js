import React, { Component } from 'react';
import './Loading.css';

class Splash extends Component {
    render() {
        return (
            <div class="gistoneer-splash">
                <div class="gistoneer-splash-content">
                    <img class="gistoneer-splash-loader" src={`/static/spinner/house.gif`} alt="Loading..." /><br />{this.props.stage}
                </div>
            </div>
        )
    }
}
export default Splash;