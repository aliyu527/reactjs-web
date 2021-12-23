import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Preview, PreviewTabs } from '../../presentation/status';
import { setPreview, setAlbumTitle, adjustCharactarLimit } from '../../../actions/Status';

class StatusUpdater extends Component {
    constructor() {
        super()
    }
    componentDidMount () {
        let _this = this;
        $('#update-status').on('shown.bs.modal', function () {
            _this.handleClick(_this.props.status.file);
        });
    }
    imageEdit (image) {
        this.cropper = new Cropper(image, { // document.querySelector('.photo-edit-item.editor img')
            dragMode: 'move', autoCropArea: .9, checkCrossOrigin: false, checkOrientation: false, 
            crop(e) { 
                console.log([ {x: e.detail.x}, {y: e.detail.y},{height: e.detail.height},{width: e.detail.width},{rotate: e.detail.rotate},{scaleX: e.detail.scaleX}, {scaleY: e.detail.scaleY }]); 
            }, ready () { 
                $('.editor-ctrl button').on('click', function (e) { let data = $(this).data(); if (data.method == 'zoom') { cropper.zoom(data.option); } else if (data.method == 'move') { cropper.move(data.option, data.secondOption); } else if (data.method == 'rotate') { cropper.rotate(data.option); } else if (data.method == 'scaleX') { cropper.scaleX(-data.option); data.option = data.option == '-1' ? 1 : -1; } else if (data.method == 'scaleY') { cropper.scaleY(-data.option); data.option = data.option == '-1' ? 1 : -1; } else if (data.method == 'reset') { cropper.reset(); } }); 
            }
        });
    }
    async handleClick (file) {
        if (file.type == 'audio') {
            await this.props.dispatch(setPreview(Preview.audio(file)));
        } else if (file.type == 'video') {
            await this.props.dispatch(setPreview(Preview.video(file)));
        } else if (file.type == 'photo') {
            await this.props.dispatch(setPreview(Preview.photo(file)));
        }
    }
    updatePost (e) {
        let chleft     = document.querySelector('.charactar-limit');
        let chlimit    = parseInt(this.props.status.chlimit);
        e.target.value = e.target.value.substring(0, chlimit);
        let length     = parseInt(e.target.value.length);
        this.props.dispatch(setAlbumTitle(e.target.value));
        this.props.dispatch(adjustCharactarLimit(chlimit - length));
        if (length > chlimit) { chleft.style.color = 'red'; } else { chleft.style.color = '#444'; }
    }
    albumPost (e) {
        e.preventDefault();
        let self  = this;
        let album = Object.assign({}, { album: this.props.status.album }, { files: this.props.status.files });
        console.log(album);
            /*let xmlhttp = new XMLHttpRequest();
            xmlhttp.addEventListener('readystatechange', function() {
                if (this.readyState === 0 || this.readyState === 4) {
                    if (this.status === 200) {
                        e.target.value = '';
                        let res = JSON.parse(this.response);
                        if (res.info.code === 201) {
                            //self.props.dispatch(setFiles(res.files));
                            //$('#browse-status').modal('hide');
                            //console.log(res.files);
                        }
                    }
                }
            });
            xmlhttp.upload.addEventListener('progress', function(event) {
                if (event.lengthComputable === true) {
                    let percent = Math.round((event.loaded / event.total) * 100);
                    console.log(percent);
                }
            });
            xmlhttp.open('post', Config.API.URL+'/status/post');
            xmlhttp.send(formData);*/
    }
    render () {
        return (
            <div class="modal fade" id="update-status" tabIndex="-1" role="dialog" aria-labelledby="update-status" aria-hidden="true">
                <div class="modal-dialog window-popup faqs-popup" role="document">
                    <div class="modal-content">
                        <a href="#" class="close icon-close" data-dismiss="modal" aria-label="Close">
                            <svg class="olymp-close-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-close-icon"></use></svg>
                        </a>
                        <div class="modal-header">
                            <h6 class="title">Upload Your Album</h6>
                        </div>
                        <div class="modal-body">
                            <div class="news-feed-form">
                                <form>
                                    <div class="author-thumb">
                                        <img src="/static/img/author-page.jpg" alt="author"/>
                                    </div>
                                    <div class="form-group with-icon label-floating is-empty">
                                        <textarea class="form-control" onChange={this.updatePost.bind(this)} placeholder="Album title here..."></textarea>
                                    </div>
                                </form>
                            </div>
                            { /*this.props.status.files.length > 0 ? this.props.status.preview : null*/ }
                            { /*this.props.status.files.length > 0 ? <PreviewTabs onSelect={this.handleClick.bind(this)} files={ this.props.status.files } /> : null*/ }
                            <div class="news-feed-form">
                                <form onSubmit={this.albumPost.bind(this)}>
                                    <div class="add-options-message">
                                        <a href="javascript:void(0);" class="options-message" data-toggle="modal" data-target="#browse-status" >
                                            <span class="ion-paperclip" data-toggle="tooltip" data-placement="top" data-original-title="ATTACH FILES"></span>
                                        </a>
                                        <a href="javascript:void(0);" class="options-message">
                                            <span class="ion-ios-location-outline" data-toggle="tooltip" data-placement="top" data-original-title="ADD LOCATION"></span>
                                        </a>
                                        <button class="btn btn-border-think btn-transparent c-grey">Post Status</button>
                                        <span class="charactar-limit">{ this.props.status.chleft }</span>
                                    </div>
                                </form>
                            </div>

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

export default connect(mapStateToProps)(withRouter(StatusUpdater));