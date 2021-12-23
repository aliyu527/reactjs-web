import React, { Component } from 'react';
import { Config } from '../../../utils';
import { setProfileTempAvatar } from '../../../actions/Profile';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class BrowseAvatar extends Component {
    componentDidMount() {
        document.getElementById('avatar-file-upload').addEventListener('change', this.avatarBrowse.bind(this));
        document.getElementById('browse-your-computer-avatar').addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('avatar-file-upload').click();
        }, false);
    }
    avatarBrowse (e) {
        if (e.target.value.length > 0) {
            let file = e.target.files[0];
            if (this.isImageFile(file)) {
                this.props.dispatch(setProfileTempAvatar(URL.createObjectURL(file)));
                $('#browse-avatar').modal('hide');
                setTimeout(()=> { $('#edit-avatar').modal('show'); e.target.value = ''; }, 500);
            }
        }
    }
    isImageFile (file) {
        if (file.type) {
            return /^image\/\w+$/.test(file.type);
        } else {
            return /\.(jpg|jpeg|png|gif)$/.test(file);
        }
    }
    render () {
        return (
            <div class="modal fade" id="browse-avatar" tabIndex="-1" role="dialog" aria-labelledby="browse-avatar" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered window-popup update-header-photo" role="document">
                    <div class="modal-content">
                        <a href="#" class="close icon-close" data-dismiss="modal" aria-label="Close">
                            <svg class="olymp-close-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-close-icon"></use></svg>
                        </a>
                        <div class="modal-header">
                            <h6 class="title">Browse Avatar</h6>
                        </div>
                        <div class="modal-body">
                            <form method="post" action="javascript:void(0)" encType="multipart/form-data" id="avatar-file-upload-form">
                                <a href="javascript:void(0)" class="upload-photo-item" id="browse-your-computer-avatar">
                                    <svg class="olymp-computer-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-computer-icon"></use></svg>
                                    <h6>Upload Avatar</h6>
                                    <span>Browse your computer.</span>
                                </a>
                                <div class="file-upload">
                                    <input type="file" id="avatar-file-upload" class="file-upload__input" name="avatar" accept="image/*" />
                                </div>
                                {/*
                                <a href="javascript:void(0)" class="upload-photo-item" data-toggle="modal" data-target="#choose-from-my-photo">
                                    <svg class="olymp-photos-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-photos-icon"></use></svg>
                                    <h6>Choose from My Albums</h6>
                                    <span>Choose from your albums</span>
                                </a>
                                */}
                            </form>
                        </div>
                        <div class="ui bottom attached progress upload">
                            <div class="bar"></div>
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

export default connect(mapStateToProps)(withRouter(BrowseAvatar));