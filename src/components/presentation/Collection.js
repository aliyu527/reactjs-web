import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Config from '../../utils/Config';
import moment from 'moment';

class Collection extends Component {
    render () {
        let collection = this.props.collection;
        //console.log(collection);
        return (
            <div class="photo-item col-4-width">
                <img src={collection.cover ? Config.FILES.ALBUMS+'/'+collection.folder+'/cover/'+collection.cover: '/static/icons/audio-file-large.png'} alt="photo"/>
                <div class="overlay overlay-dark"></div>
                <a href="#" class="more"><svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg></a>
                <a href="#" class="post-add-icon inline-items">
                    <svg class="olymp-heart-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-heart-icon"></use></svg>
                    <span>15K</span>
                </a>
                <a href="#" data-toggle="modal" data-target="#open-photo-popup-v1" class="  full-block"></a>
                <div class="content">
                    <a href="#" class="h6 title">{ collection.title }</a>
                    <time class="published" dateTime={collection.created_at}>{ moment(collection.created_at).fromNow() }</time>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    profile: state.profile
});
export default connect(mapStateToProps)(Collection);