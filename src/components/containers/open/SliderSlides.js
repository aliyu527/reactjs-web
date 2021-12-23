import React, { Component } from 'react';
import { connect } from 'react-redux';

class SliderSlides extends Component {
    render () {
        let album = this.props.album;
        //console.log(album);
        return (
            <div class="slider-slides">
                {album.files.slice(0, 9).map((file, i) => { //console.log(file);
                    return (
                        <a href="#" class="slides-item" key={i}>
                            <img src="/static/img/photo-tabs1.jpg" alt="slide"/>
                            <div class="overlay overlay-dark"></div>
                        </a>
                    )
                })}

                {/*<!--Prev Next Arrows-->*/}
                <svg class="btn-next olymp-popup-right-arrow"><use href="/static/svg-icons/sprites/icons.svg#olymp-popup-right-arrow"></use></svg>
                <svg class="btn-prev olymp-popup-left-arrow"><use href="/static/svg-icons/sprites/icons.svg#olymp-popup-left-arrow"></use></svg>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    home: state.home
});
export default connect(mapStateToProps)(SliderSlides);