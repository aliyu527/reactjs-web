import React, { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Config from '../../../utils/Config';
import superagent from 'superagent';
import { setProfileAlbums, setProfileCollections } from '../../../actions/Profile';
//import { Album, Collection } from '../../presentation';
import { setAlbumData } from '../../../actions/Album';

import Loading from '../../layout/Loading';
const Album = lazy(() => import('../../presentation/Album'));

class Albums extends Component {
    constructor () {
        super();
        this.state = {
            loading: 'show'
        }
    }
    componentDidMount() {
        localStorage.setItem('last-path', this.props.match.url);
        localStorage.setItem('current-path', this.props.match.url);
        let self = this;
        superagent
            .get(Config.API.URL+'/album')
            .set('x-access-jwt', localStorage.getItem('jwt'))
            .set('x-access-user', this.props.match.params.username)
            .set('Accept', 'application/json')
            .end((err, res) => {
                self.setState({loading: 'hide'});
                if (err) {
                    console.log(err);
                } else {
                    //console.log(res.body);
                    if (res.body.info.code == 200) {
                        self.props.dispatch(setProfileAlbums(res.body.data.albums));
                        self.props.dispatch(setProfileCollections(res.body.data.collections));
                    } else if (res.body.info.code == 401 || res.body.info.code == 403) {
                        self.props.history.push('/join');
                    }
                }
            });
    }
    openAlbum (index) {
        let self  = this;
        let album = Object.assign({}, this.props.profile.albums[index]);
        let user  = Object.assign({}, this.props.profile.data);

        //this.props.history.push(`/owe/status/${album._id}`);
        superagent
            .get(Config.API.URL+'/album/comments/'+album._id)
            .set('x-access-jwt', localStorage.getItem('jwt'))
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    if (res.body.info.code == 200) {
                        album.comments = res.body.payload;
                        self.props.dispatch(setAlbumData({user, album}));
                        $('#open-photo-popup-v2').modal('show');
                    }  else if (res.body.info.code == 401 || res.body.info.code == 403) {
                        //self.props.history.push('/join');
                    }
                }
            });
    }
    render() {
        let loading = () => {
            if (this.props.profile.albums.length == 0 && (!this.state.loading || this.state.loading == 'show')) {
                return (
                    <div class="container">
                        <div class="ui-block">
                            <div class="ui-block-title"><img class="inner-loader" src="/static/spinner/busy.gif" alt="Gistoneer" /></div>
                        </div>
                    </div>
                )
            } else {
                if (this.props.profile.albums.length == 0) {
                    return (
                        <div class="container">
                            <div class="ui-block">
                                <div class="ui-block-title"><div class="h6 title">You haven't post anything yet.</div></div>
                            </div>
                        </div>
                    )
                }
            }
        };
        return (
            <div>
                { loading() }
                {/*<div class="container">
                    <div class="row">
                        <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div class="ui-block ">/* responsive-flex *
                                <div class="ui-block-title">
                                    <div class="h6 title">Albums</div>
                                    <div class="block-btn align-right display-nothing">
                                        <a href="#" data-toggle="modal" data-target="#create-photo-album" class="btn btn-primary btn-md-2">Create Album  +</a>
                                        <a href="#" data-toggle="modal" data-target="#update-header-photo" class="btn btn-md-2 btn-border-think custom-color c-grey">Add Photos</a>
                                    </div>
                                    <ul class="nav nav-tabs photo-gallery" role="tablist">
                                        <li class="nav-item">
                                            <a class="nav-link active" data-toggle="tab" href="#albums" role="tab">
                                                <svg class="olymp-albums-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-albums-icon"></use></svg>
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" data-toggle="tab" href="#collections" role="tab">
                                                <svg class="olymp-photos-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-photos-icon"></use></svg>
                                            </a>
                                        </li>
                                    </ul>
                                    <a href="#" class="more display-nothing"><svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>*/}

                {/** End Header */}

                <div class="container">
                    <div class="row">
                        <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            {/*<!-- Tab panes -->*/}
                            <div class="tab-content">
                                <div class="tab-pane active" id="albums" role="tabpanel">
                                    <div class="photo-album-wrapper albums">
                                        <Suspense fallback={<Loading stage="Loading..." />}>
                                            {this.props.profile.albums.map((album, i) => {
                                                return <Album key={i} onClick={this.openAlbum.bind(this)} index={i} album={album} />
                                            })}
                                        </Suspense>
                                    </div>
                                </div>

                                <div class="tab-pane" id="collections" role="tabpanel">
                                    <div class="photo-album-wrapper collections">
                                        {/*this.props.profile.collections.map((collection, i) => {
                                            //return <Collection key={i} index={i} collection={collection} />
                                        })*/}
                                        {/*<a href="#" class="btn btn-control btn-more"><svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg></a>*/}
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

                {/*<!-- Window-popup Open Photo Popup  -->*/}
            </div>
        )
    }
}
const mapStateToProps = state => ({
    profile : state.profile
});
export default connect(mapStateToProps)(withRouter(Albums));;