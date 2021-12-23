import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cropper from 'cropperjs';
import Config from '../../../utils/Config';
import { setProfileHeader } from '../../../actions/Profile';

class EditCover extends Component {
    constructor() {
        super();
        this.state = {
            submit: {
                label : 'Done',
                status : false
            }
        }
    }
    componentDidMount () {
        let cropBoxData, canvasData, cropper, edit_cover_wrap, edit_cover_img, self = this;
        let submit = Object.assign({}, this.state.submit);
        $('#edit-cover').on('hidden.bs.modal', () => {
            cropper.reset();
            cropBoxData = cropper.getCropBoxData();
            canvasData  = cropper.getCanvasData();
            cropper.destroy();
            edit_cover_img.remove();
        });
        $('#edit-cover').on('shown.bs.modal', () => {
            edit_cover_wrap    = document.querySelector('#edit-cover .photo-edit-item.editor');
            edit_cover_img     = document.createElement("img");
            edit_cover_img.src = self.props.profile.temp_cover;
            edit_cover_wrap.appendChild(edit_cover_img);
            cropper = new Cropper(edit_cover_img, {
                dragMode: 'move', autoCropArea: 1, checkCrossOrigin: false, checkOrientation: false, aspectRatio: 341/118,
                crop(e) { 
                    //console.log([ {x: e.detail.x}, {y: e.detail.y},{height: e.detail.height},{width: e.detail.width},{rotate: e.detail.rotate},{scaleX: e.detail.scaleX}, {scaleY: e.detail.scaleY }]); 
                }, ready() { 
                    cropper.setCropBoxData(cropBoxData).setCanvasData(canvasData);
                }
            });
        });
        $('#cover-editor-ctrl button').on('click', function (e) { 
            let data = $(this).data(); 
            if (data.method == 'zoom') { 
                cropper.zoom(data.option); 
            } else if (data.method == 'move') { 
                cropper.move(data.option, data.secondOption); 
            } else if (data.method == 'rotate') { 
                cropper.rotate(data.option); 
            } else if (data.method == 'scaleX') { 
                cropper.scaleX(-data.option); data.option = data.option == '-1' ? 1 : -1; 
            } else if (data.method == 'scaleY') { 
                cropper.scaleY(-data.option); data.option = data.option == '-1' ? 1 : -1; 
            } else if (data.method == 'reset') { 
                cropper.reset(); 
            }
        });
        document.querySelector('#crop-cover-done').addEventListener('click', (e) => {
            submit.status = true;
            submit.label  = 'Please Wait...';
            self.setState({submit});
            
            e.preventDefault();
            cropper.getCroppedCanvas().toBlob((blob) => {
                let formData = new FormData();
                let xmlhttp  = new XMLHttpRequest();
                formData.append('cover', blob);
                formData.append('old', this.props.profile.header.cover);
                xmlhttp.addEventListener('readystatechange', function() {
                    if (this.readyState === 0 || this.readyState === 4) {
                        submit.status = false;
                        submit.label  = 'Done';
                        if (this.status === 200) {
                            let res = JSON.parse(this.response);
                            //console.log(res);
                            if (res.info.code === 201) {
                                let profile = Object.assign({}, res.profile);
                                delete profile.contacts;
                                delete profile.followers;
                                delete profile.following;
                                delete profile.notifications;
                                delete profile.otp;
                                delete profile.albums;
                                delete profile.logins;
                                delete profile.role;
                                self.props.dispatch(setProfileHeader(profile));
                                $('#edit-cover').modal('hide');
                                $('#browse-cover').modal('hide');
                            } else if (res.info.code == 401 || res.info.code == 403) {
                                $('#edit-cover').modal('hide');
                                $('#browse-cover').modal('hide');
                                self.props.history.push('/join');
                            }
                        }
                        self.setState({submit});
                    }
                });
                xmlhttp.upload.addEventListener('progress', function(event) {
                    if (event.lengthComputable === true) {
                        let percent = Math.round((event.loaded / event.total) * 100);
                        console.log(percent);
                    }
                });
                xmlhttp.open('post', Config.API.URL+'/user/cover/save');
                xmlhttp.setRequestHeader('x-access-jwt', this.props.self.jwt);
                xmlhttp.send(formData);
            });
        });
    }

    render () {
        return (
            <div class="modal fade" id="edit-cover" tabIndex="-1" role="dialog" aria-labelledby="update-status" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered window-popup faqs-popup" role="document">
                    <div class="modal-content">
                        <a href="#" class="close icon-close" data-dismiss="modal" aria-label="Close">
                            <svg class="olymp-close-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-close-icon"></use></svg>
                        </a>
                        <div class="modal-header"><h6 class="title">Upload Your Album</h6></div>
                        <div class="modal-body">
                            <div class="photo-edit-wrap" id="photo-edit-wrap">
                                <div class="photo-edit-item editor-ctrl" id="cover-editor-ctrl">
                                    <button type="button" title="Zoom In" class="btn" data-method="zoom" data-option="0.1"><span class="fa fa-search-plus"></span></button>
                                    <button type="button" title="Zoom Out" class="btn" data-method="zoom" data-option="-0.1"><span class="fa fa-search-minus"></span></button>
                                    <button type="button" title="Move Left" class="btn" data-method="move" data-option="-10" data-second-option="0"><span class="fa fa-arrow-left"></span></button>
                                    <button type="button" title="Move Right" class="btn" data-method="move" data-option="10" data-second-option="0"><span class="fa fa-arrow-right"></span></button>
                                    <button type="button" title="Move Up" class="btn" data-method="move" data-option="0" data-second-option="-10"><span class="fa fa-arrow-up"></span></button>
                                    <button type="button" title="Move Down" class="btn" data-method="move" data-option="0" data-second-option="10"><span class="fa fa-arrow-down"></span></button>
                                    <button type="button" title="Rotate Left" class="btn" data-method="rotate" data-option="-22.5"><span class="fa fa-rotate-left"></span></button>
                                    <button type="button" title="Rotate Right" class="btn" data-method="rotate" data-option="22.5"><span class="fa fa-rotate-right"></span></button>
                                    <button type="button" title="Flip Horizontal" class="btn" data-method="scaleX" data-option="1"><span class="fa fa-arrows-h"></span></button>
                                    <button type="button" title="Flip Vertical" class="btn" data-method="scaleY" data-option="1"><span class="fa fa-arrows-v"></span> </button>
                                    <button type="button" title="Reset" class="btn" data-method="reset"><span class="fa fa-refresh"></span> </button>
                                </div>
                                <div class="photo-edit-item editor">{/*<img src="/static/img/post__thumb1.jpg" alt="Photo" />*/}</div>
                            </div>
                            <div class="modal-footer">
                                <button class="btn btn-purple btn-lg full-width" disabled={this.state.submit.status} id="crop-cover-done">{this.state.submit.label}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    self: state.self,
    profile: state.profile
});
export default connect(mapStateToProps)(EditCover);