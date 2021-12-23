import React, { Component, lazy, Suspense } from 'react';
//import { Stories, WidgetsLeft, WidgetsRight, CreateAlbum, ChooseFromPhoto, ChatPopup, BrowseFiles, Story } from '../containers/status';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setStories } from '../../actions/Status';
import { Config } from '../../utils';
import Loading from './Loading';

const Stories         = lazy(() => import('../containers/status/Stories'));
const WidgetsLeft     = lazy(() => import('../containers/status/WidgetsLeft'));
const WidgetsRight    = lazy(() => import('../containers/status/WidgetsRight'));
const CreateAlbum     = lazy(() => import('../containers/status/CreateAlbum'));
const ChooseFromPhoto = lazy(() => import('../containers/status/ChooseFromPhoto'));
const ChatPopup       = lazy(() => import('../containers/status/ChatPopup'));
const BrowseFiles     = lazy(() => import('../containers/status/BrowseFiles'));

class Status extends Component {
    constructor () {
        super();
        this.state = {
            loading: 'show'
        }
    }
    componentDidMount() {
        //Scroll to top.
        jQuery('.back-to-top').on('click', function () {
            $('html,body').animate({
                scrollTop: 0
            }, 1200);
            return false;
        });
        localStorage.setItem('last-path', this.props.match.url);
        localStorage.setItem('current-path', this.props.match.url);
        let self = this;
        document.querySelector('.post-status').addEventListener('click', (e) => {
            if (self.props.status.files.length > 0) {
                $('#browse-files').modal('hide');
                $('#create-album').modal('show');
            } else {
                $('#create-album').modal('hide');
                $('#browse-files').modal('show');
            }
        });
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.addEventListener('readystatechange', function () {
            if (this.readyState === 0 || this.readyState === 4) {
                if (this.status === 200) {
                    self.setState({loading: 'hide'});
                    let res = JSON.parse(this.response);
                    if (res.info.code === 200) {
                        self.props.dispatch(setStories(res.data));
                    } else if (res.info.code == 401 || res.info.code == 403) {
                        self.props.history.push('/join');
                    }
                }
                //$('.ui.progress.album').progress({percent: '0'});
            }
        });
        xmlhttp.upload.addEventListener('progress', function(event) {
            if (event.lengthComputable === true) {
                let percent = Math.round((event.loaded / event.total) * 100);
                //console.log(percent);
                //$('.ui.progress.album').progress({percent: percent});
            }
        });
        xmlhttp.open('get', Config.API.URL+'/status', true);
        xmlhttp.setRequestHeader('x-access-jwt', localStorage.getItem('jwt'));
        xmlhttp.setRequestHeader('Content-Type', 'application/json');
        xmlhttp.send();
    }
    render () {
        let loading = this.state.loading;
        return (
            <div>
                <div class="container">
                    <div class="row">
                        <main class="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                            <Suspense fallback={<Loading stage="Loading..." />}>
                                <Stories loading={loading} />
                            </Suspense>
                            {/*<a id="load-more-button" href="#" class="btn btn-control btn-more" data-load-link="items-to-load.html" data-container="newsfeed-items-grid">
                                <svg class="olymp-three-dots-icon">
                                    <use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
                                </svg>
                            </a>*/}
                        </main>
                        <WidgetsLeft />
                        <WidgetsRight />
                    </div>
                </div>
                <CreateAlbum />
                <BrowseFiles />
                <ChooseFromPhoto />
                <ChatPopup />
                <div class="floating-btn-wraper">
                    <button class="floating-btn back-to-top"><span class="ion-android-arrow-up back-icon"></span></button>
                    <button class="floating-btn post-status"><span class="ion-compose back-icon"></span></button>{/**data-toggle="modal" data-target="#create-photo-album" */ }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    status: state.status
});

export default connect(mapStateToProps)(withRouter(Status));