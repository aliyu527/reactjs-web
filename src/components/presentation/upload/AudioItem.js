import React, { Component } from 'react';
import Config from '../../../utils/Config';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setFiles } from '../../../actions/Status';
import superagent from 'superagent';

class AudioItem extends Component {
    handleClick (e) {
        this.props.onClick(this.props.i);
        //this.props.onSelect(this.props.files[e.target.getAttribute('i')]);
    }
    updateAbout (e) {
        let index    = this.props.i;
        let file     = Object.assign({}, this.props.file);
        let files    = Object.assign([], this.props.status.files); 
        file.title   = e.target.value.substring(0, this.props.status.ablimit);
        files[index] = file;
        this.props.dispatch(setFiles(files));
    }
    remove (e) {
        let index = this.props.i;
        let files = Object.assign([], this.props.status.files);
        files.splice(index, 1);
        let self = this;
        superagent
            .post(Config.API.URL+'/album/discard')
            .send([this.props.file])
            .set('x-access-jwt', this.props.self.jwt)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    if (res.body.info.code == 204) {
                        self.props.dispatch(setFiles(files));
                        localStorage.setItem('files', JSON.stringify(files));
                        if (files.length <= 0) {
                            $('#create-album').modal('hide');
                            $('#browse-files').modal('show');
                        }
                    }
                }
            });
    }
    render () {
        let title = this.props.file.title.substring(0, this.props.status.ablimit);
        let limit = this.props.status.ablimit;
        return (
            <div class="photo-album-item-wrap col-3-width" >
                <div class="photo-album-item" data-mh="album-item">
                    <div class="form-group audio-wrap">
                        <div class="video-player">
                            <img src={ this.props.file.icon ? Config.FILES.TEMP+'/icons/'+this.props.file.icon : '/static/icons/audio-file.png' } />
                            <a class="play-video play-video--small" onClick={this.handleClick.bind(this)}>
                                <svg class="olymp-settings-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-settings-icon"></use></svg>
                            </a>
                            <div class="overlay overlay-dark"></div>
                    
                            <div onClick={this.remove.bind(this)} class="more"><svg class="olymp-close-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-close-icon"></use></svg></div>
                        </div>
                        <textarea class="form-control" maxLength={limit} onChange={this.updateAbout.bind(this)} value={title} placeholder="Write something about this file..."></textarea>
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

export default connect(mapStateToProps)(withRouter(AudioItem));