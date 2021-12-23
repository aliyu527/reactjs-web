import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AudioItem, VideoItem, PhotoItem } from '../../presentation/upload';
import { setAlbumTitle, setPostActivity, setFiles, setStories } from '../../../actions/Status';
import { Config } from '../../../utils';
import superagent from 'superagent';
let CRUMINA = {};

class CreateAlbum extends Component {
    constructor() {
        super();
        this.state = {
            submit: {
                label : 'Post Status',
                status : false
            }
        }
    }
    componentDidMount () {
        let self = this;
        $('#browse-files').on('shown.bs.modal', () => {
            $('#create-album').modal('hide');
        }).on('hidden.bs.modal', () => {
            if (self.props.status.files.length >= 1) {
                //$('#create-album').modal('show');
                //self.props.dispatch(setAlbumTitle('Untitled Album'));
            } else {
                $('#create-album').modal('hide');
            }
        });
        $('.ui.progress.album').progress({percent: '0'});
        CRUMINA.FormValidation = function () {
            $('.needs-validation').each(function () {
                var form = $(this)[0];
                form.addEventListener("submit", function (event) {
                    if (form.checkValidity() == false) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    form.classList.add("was-validated");
                }, false);
            });
        };
        
        $(document).ready(function () {
            CRUMINA.FormValidation();
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
    async handleClick (index) {
        let file = this.props.status.files[index]
        console.log(file);
        /*if (file.type == 'audio') {
            //await this.props.dispatch(setPreview(Preview.audio(file)));
        } else if (file.type == 'video') {
            //await this.props.dispatch(setPreview(Preview.video(file)));
        } else if (file.type == 'photo') {
            //await this.props.dispatch(setPreview(Preview.photo(file)));
        }*/
    }
    discardAll () {
        let self = this;
        superagent
            .post(Config.API.URL+'/album/discard')
            .send(JSON.parse(localStorage.getItem('files')))
            .set('x-access-jwt', this.props.self.jwt)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    if (res.body.info.code == 204) {
                        self.props.dispatch(setFiles([]));
                        self.props.dispatch(setAlbumTitle('Untitled Album'));
                        localStorage.removeItem('files');
                        $('#create-album').modal('hide');
                        $('#browse-files').modal('hide');
                    }
                }
            });
    }
    updateActivity (e) {
        let chlimit  = parseInt(this.props.status.chlimit);
        let activity = e.target.value.substring(0, chlimit);
        let album    = activity.substring(0, 100);
        this.props.dispatch(setPostActivity(activity));
        this.props.dispatch(setAlbumTitle(album));
    }
    postAlbum (e) {
        e.preventDefault();
        let self    = this;
        let stories = Object.assign([], this.props.status.stories);
        let status  = this.props.status;

        let submit  = Object.assign({}, this.state.submit);
        let data    = Object.assign({}, { album: status.album, activity: status.activity }, { files: status.files });
        if (data.files.length == 0) {
            return;
        } else {
            submit.status = true;
            submit.label  = 'Uploading...';
            self.setState({submit});
            
            let xmlhttp = new XMLHttpRequest();
            xmlhttp.addEventListener('readystatechange', function () {
                if (this.readyState === 0 || this.readyState === 4) {
                    submit.status = false;
                    submit.label  = 'Post Status';

                    if (this.status === 200) {
                        let res = JSON.parse(this.response);
                        if (res.info.code === 201) {
                            stories.unshift(res.data);
                            self.props.dispatch(setFiles([]));
                            self.props.dispatch(setPostActivity(''));
                            self.props.dispatch(setAlbumTitle('')); //Untitled Album
                            self.props.dispatch(setStories(stories));
                            localStorage.removeItem('files');
                            $('#create-album').modal('hide');
                            $('#browse-files').modal('hide');
                        }
                    }
                    $('.ui.progress.album').progress({percent: '0'});
                    self.setState({submit});
                }
            });
            xmlhttp.upload.addEventListener('progress', function(event) {
                if (event.lengthComputable === true) {
                    let percent = Math.round((event.loaded / event.total) * 100);
                    $('.ui.progress.album').progress({percent: percent});
                }
            });
            xmlhttp.open('post', Config.API.URL+'/album', true);
            xmlhttp.setRequestHeader('x-access-jwt', this.props.self.jwt);
            xmlhttp.setRequestHeader('Content-Type', 'application/json');
            xmlhttp.send(JSON.stringify(data));
        }
    }
    render () {
        let avatar = this.props.self.data.avatar;
        return (
            <div class="modal fade" id="create-album" tabIndex="-1" role="dialog" aria-labelledby="create-album" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered window-popup create-photo-album" role="document">
                    <div class="modal-content">
                        <a href="#" class="close icon-close" data-dismiss="modal" aria-label="Close">
                            <svg class="olymp-close-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-close-icon"></use></svg>
                        </a>
                        <div class="modal-header"><h6 class="title">Upload Audio, Video, Photo or GIF</h6></div>
                        <div class="modal-body">
                            <form class="needs-validation" noValidate onSubmit={this.postAlbum.bind(this)}>
                                <div class="news-feed-form album-activity">
                                    <div class="author-thumb">
                                        <img src={avatar ? Config.FILES.AVATAR+'/'+avatar : '/static/icons/avatar.png'} alt="author"/>
                                    </div>
                                    <div class="form-group with-icon label-floating is-empty">
                                        <textarea class="form-control" autoComplete="off" onChange={this.updateActivity.bind(this)} value={this.props.status.activity} placeholder="Share what you're thinking of uploading here..."></textarea>
                                    </div>
                                </div>
                                {/*<div class="form-group label-floating d-none">
                                    <label class="control-label">Album Name / Title</label>
                                    <input class="form-control" placeholder="" autoComplete="off" type="text" value={this.props.status.album} required/>
                                </div>*/}
                                <div class="ui top attached progress album"><div class="bar"></div></div>
                                <div class="photo-album-wrapper">
                                    <div class="photo-album-item-wrap col-3-width" data-toggle="modal" data-target="#browse-files" >
                                        <div class="photo-album-item create-album" data-mh="album-item">
                                            <div class="content">
                                                <a href="javascript:void(0)" class="btn btn-control bg-primary"><svg class="olymp-plus-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-plus-icon"></use></svg></a>
                                                <a href="javascript:void(0)" class="title h5">More Media...</a>
                                            </div>
                                        </div>
                                    </div>
                                    {this.props.status.files.map((file, i) => {
                                        if (file.type == 'audio') {
                                            return <AudioItem key={i} i={i} file={file} onClick={this.handleClick.bind(this)} />
                                        } else if (file.type == 'video') {
                                            return <VideoItem key={i} i={i} file={file} onClick={this.handleClick.bind(this)} />
                                        } else if (file.type == 'photo') {
                                            return <PhotoItem key={i} i={i} file={file} onClick={this.handleClick.bind(this)} />
                                        }
                                    })}
                                </div>
                                <div class="ui bottom attached progress album"><div class="bar"></div></div>
                                <button type="button" onClick={this.discardAll.bind(this)} class="btn btn-danger btn-lg btn--half-width">Discard Everything</button>
                                <button class="btn btn-primary btn-lg btn--half-width" disabled={this.state.submit.status}>{this.state.submit.label}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    status: state.status,
    self: state.self
});

export default connect(mapStateToProps)(withRouter(CreateAlbum));