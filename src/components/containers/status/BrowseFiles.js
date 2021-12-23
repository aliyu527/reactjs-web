import React, { Component } from 'react';
import { Config } from '../../../utils';
import { setFiles, setAlbumTitle } from '../../../actions/Status';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class BrowseFiles extends Component {
    componentDidMount() {
        document.getElementById('status-file-upload').addEventListener('change', this.StatusFileUpload.bind(this));
        document.getElementById('browse-your-computer').addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('status-file-upload').click();
        }, false);
        if (localStorage.getItem('files')) {
            let files = JSON.parse(localStorage.getItem('files'));
            this.props.dispatch(setFiles(files));
            this.props.dispatch(setAlbumTitle('Untitled Album'));
        }
        $('.ui.progress.upload').progress({percent: '0'});
    }
    StatusFileUpload (e) {
        let self = this;
        if (e.target.value.length > 0) {
            let form     = document.getElementById('status-file-upload-form');
            let formData = new FormData(form);
            let files    = e.target.files;
            for (var i = 0; i < files.length; i++) {
                formData.append(e.target.name, URL.createObjectURL(files[i])); 
            }
            let xmlhttp = new XMLHttpRequest();
            xmlhttp.addEventListener('readystatechange', function() {
                if (this.readyState === 0 || this.readyState === 4) {
                    if (this.status === 200) {
                        e.target.value = '';
                        let res = JSON.parse(this.response);
                        if (res.info.code === 201) {
                            if (localStorage.getItem('files')) {
                                let prev = JSON.parse(localStorage.getItem('files'));
                                for (var i = 0; i < res.files.length; i++) {
                                    prev.unshift(res.files[i]);
                                    if (res.files.length-1 == i) {
                                        self.props.dispatch(setFiles(prev));
                                        localStorage.setItem('files', JSON.stringify(prev));
                                    }
                                }
                            } else {
                                self.props.dispatch(setFiles(res.files));
                                localStorage.setItem('files', JSON.stringify(res.files));
                            }
                            $('#browse-files').modal('hide');
                            setTimeout(()=> {
                                $('#create-album').modal('show');
                            }, 500);
                        }
                    }
                    $('.ui.progress.upload').progress({percent: '0'});
                }
            });
            xmlhttp.upload.addEventListener('progress', function(event) {
                if (event.lengthComputable === true) {
                    let percent = Math.round((event.loaded / event.total) * 100);
                    $('.ui.progress.upload').progress({percent: percent});
                }
            });
            xmlhttp.open('post', Config.API.URL+'/album/save');
            xmlhttp.send(formData);
        }
    }
    render () {
        return (
            <div class="modal fade" id="browse-files" tabIndex="-1" role="dialog" aria-labelledby="browse-files" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered window-popup update-header-photo" role="document">
                    <div class="modal-content">
                        <a href="#" class="close icon-close" data-dismiss="modal" aria-label="Close">
                            <svg class="olymp-close-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-close-icon"></use></svg>
                        </a>
                        <div class="modal-header">
                            <h6 class="title">Upload Status Media</h6>
                        </div>
                        <div class="ui bottom attached progress upload">
                            <div class="bar"></div>
                        </div>
                        <div class="modal-body">
                            <form method="post" action="javascript:void(0)" encType="multipart/form-data" id="status-file-upload-form">
                                <a href="javascript:void(0)" class="upload-photo-item" id="browse-your-computer">
                                    <svg class="olymp-computer-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-computer-icon"></use></svg>
                                    <h6>Upload Audio, Video, Photo or GIF</h6>
                                    <span>Browse from your device.</span>
                                </a>
                                <div class="file-upload">
                                    <input type="file" id="status-file-upload" class="file-upload__input" name="files" accept="image/*, audio/mp3, audio/mpeg, video/mp4, video/x-m4v, video/*" multiple />
                                </div>

                                {/*<a href="javascript:void(0)" class="upload-photo-item" data-toggle="modal" data-target="#choose-from-my-photo">
                                    <svg class="olymp-photos-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-photos-icon"></use></svg>
                                    <h6>Choose from My Albums</h6>
                                    <span>Choose from your albums</span>
                                </a>*/}
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>   
        )
    }
}

const mapStateToProps = state => ({
    status: state.status
});

export default connect(mapStateToProps)(withRouter(BrowseFiles));