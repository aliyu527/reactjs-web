import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import Config from '../../../utils/Config';

class PrivateTopHeader extends Component {
    componentDidMount() {
        document.querySelector('#browse-avatar-open').addEventListener('click', (e) => {
            $('#edit-avatar').modal('hide');
            $('#browse-avatar').modal('show');
        });
        document.querySelector('#browse-cover-open').addEventListener('click', (e) => {
            $('#edit-cover').modal('hide');
            $('#browse-cover').modal('show');
        });
        let coverLoader  = document.querySelector('.cover-loading');
        let cover        = document.querySelector('.cover-image');
        let avatarLoader = document.querySelector('.avatar-loading');
        let avatar       = document.querySelector('.avatar-image');
        cover.classList.add("d-none");
        coverLoader.classList.remove("d-none");
        avatar.classList.add("d-none");
        avatarLoader.classList.remove("d-none");
        cover.onload = (e) => {
            coverLoader.classList.add("d-none");
            cover.classList.remove("d-none");
        }
        avatar.onload = (e) => {
            avatarLoader.classList.add("d-none");
            avatar.classList.remove("d-none");
        }
    }
    render() {
        let header = this.props.profile.header;
        let data   = this.props.profile.data;
        return (
            <div class="container">
                <div class="row">
                    <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="ui-block">
                            <div class="top-header top-header-favorit">
                                <div class="top-header-thumb">
                                    <div class="cover-loading"><img src={`/static/spinner/busy.gif`} alt="Loading..." /></div>
                                    <img class="cover-image d-none" src={header.cover ? Config.FILES.COVER+'/'+header.cover : `/static/cover/${Config.gen_cover}.png`} alt="nature"/>
                                    <div class="top-header-author">
                                        <div class="author-thumb no-border">
                                            <img class="avatar-loading" src={`/static/spinner/busy.gif`} alt="Loading..." />
                                            <img class="avatar-image d-none" src={header.avatar ? Config.FILES.AVATAR+'/'+header.avatar : '/static/icons/avatar.png'} alt="author"/>
                                        </div>
                                        <div class="author-content">
                                            <NavLink to={`/owe/profile/${header.username}`} class="h3 author-name">{ header.fname+' '+header.lname }</NavLink>
                                            <div class="country">@{ header.username }  |  { header.country.name+', '+data.country.iso2.toUpperCase() }</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="profile-section">
                                    <div class="row">
                                        <div class="col col-xl-8 m-auto col-lg-8 col-md-12">
                                            <ul class="profile-menu">
                                                <li><NavLink to={`/owe/profile/${data.username}/albums`} class="friend-count-item"><div class="h6">{ data.albums.length }</div><div class="title">Media</div></NavLink></li>{/* class="active" */}
                                                <li><NavLink to={`/owe/profile/${data.username}/followers`} class="friend-count-item"><div class="h6">{ data.followers.length }</div><div class="title">Followers</div></NavLink></li>
                                                <li><NavLink to={`/owe/profile/${data.username}/following`} class="friend-count-item"><div class="h6">{ data.following.length }</div> <div class="title">Following</div></NavLink></li>
                                                {/*<li><NavLink to={`/owe/profile/${data.username}/about`} class="friend-count-item"><div class="h6">40%</div><div class="title">About</div></NavLink></li>*/}
                                                
                                                {/*<li>
                                                    <div class="more">
                                                        <svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
                                                        <ul class="more-dropdown more-with-triangle">
                                                            <li><a href="#">Report Profile</a></li>
                                                            <li><a href="#">Block Profile</a></li>
                                                        </ul>
                                                    </div>
                                                </li>*/}
                                            </ul>
                                        </div>
                                    </div>
            
                                    <div class="control-block-button">
                                        <div class="btn btn-control bg-primary more">
                                            <svg class="olymp-settings-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-settings-icon"></use></svg>
                                            <ul class="more-dropdown more-with-triangle triangle-bottom-right">
                                                <li><a href="javascript:void(0)" id="browse-avatar-open">Update Profile Photo</a></li>
                                                <li><a href="javascript:void(0)" id="browse-cover-open">Update Header Photo</a></li>
                                                {/*<li><NavLink to="/owe/settings">Account Settings</NavLink></li>*/}
                                            </ul>
                                        </div>
            
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    profile : state.profile
});
export default connect(mapStateToProps)(withRouter(PrivateTopHeader));;