import React, { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setSearchKeywords } from '../../actions/Search';
import { setStories, setPeople } from '../../actions/Status';
import superagent from 'superagent';
import Config from '../../utils/Config';
import Loading from './Loading';

const Stories         = lazy(() => import('../containers/status/Stories'));
const People          = lazy(() => import('../containers/status/People'));

const WidgetsLeft     = lazy(() => import('../containers/status/WidgetsLeft'));
const WidgetsRight    = lazy(() => import('../containers/status/WidgetsRight'));

const CreateAlbum     = lazy(() => import('../containers/status/CreateAlbum'));
const ChooseFromPhoto = lazy(() => import('../containers/status/ChooseFromPhoto'));
const ChatPopup       = lazy(() => import('../containers/status/ChatPopup'));
const BrowseFiles     = lazy(() => import('../containers/status/BrowseFiles'));

class Status extends Component {
    componentDidMount() {
        //Scroll to top.
        jQuery('.back-to-top').on('click', function () {
            $('html,body').animate({
                scrollTop: 0
            }, 1200);
            return false;
        });
        this.props.dispatch(setSearchKeywords(this.props.match.params.keywords));
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

        superagent
            .get(Config.API.URL+'/status/search/'+this.props.match.params.keywords)
            .set('x-access-jwt', localStorage.getItem('jwt'))
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    if (res.body.info.code == 200) {
                        self.props.dispatch(setStories(res.body.payload.stories));
                        self.props.dispatch(setPeople(res.body.payload.people));
                    } else if (res.body.info.code == 401 || res.body.info.code == 403) {
                        self.props.history.push('/join');
                    }
                }
            });
    }
    render () {
        return (
            <div>
                <div class="container">
                    <div class="row">
                        <main class="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                            <div class="ui-block ">
                                <div class="ui-block-title">
                                    <div class="h6 title">Searching result: {/*“<span class="c-primary">Aliyu Aminu</span>”*/}</div>
                                    
                                    <ul class="nav nav-tabs photo-gallery" role="tablist">
                                        <li class="nav-item">
                                            <a class="nav-link active" data-toggle="tab" href="#people-result" role="tab">
                                                <svg class="olymp-happy-face-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-happy-face-icon"></use></svg>
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" data-toggle="tab" href="#stories-result" role="tab">
                                                <svg class="olymp-newsfeed-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-newsfeed-icon"></use></svg>
                                            </a>
                                        </li>
                                    </ul>
                                    <a href="#" class="more display-nothing"><svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg></a>
                                </div>
                            </div>
                            <Suspense fallback={<Loading stage="Loading..." />}>
                                <div class="tab-content">
                                    <div class="tab-pane active" id="people-result" role="tabpanel">
                                        <People />
                                    </div>
                                    <div class="tab-pane" id="stories-result" role="tabpanel">
                                        <Stories />
                                    </div>
                                </div>
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
                    <button class="floating-btn post-status"><span class="ion-compose back-icon"></span></button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    status: state.status
});

export default connect(mapStateToProps)(withRouter(Status));