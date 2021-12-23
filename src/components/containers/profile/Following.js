import React, { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Config from '../../../utils/Config';
import superagent from 'superagent';
import { setProfileFollowing } from '../../../actions/Profile';
//import { Person } from '../../presentation';


import Loading from '../../layout/Loading';
const Person = lazy(() => import('../../presentation/Person'));


class Following extends Component {
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
            .get(Config.API.URL+'/user/profile/friends')
            .set('x-access-jwt', localStorage.getItem('jwt'))
            .set('x-access-user', this.props.match.params.username)
            .set('x-access-action', 'following')
            .set('Accept', 'application/json')
            .end((err, res) => {
                self.setState({loading: 'hide'});
                if (err) {
                    console.log(err);
                } else {
                    if (res.body.info.code == 200) {
                        self.props.dispatch(setProfileFollowing(res.body.data));
                    } else if (res.body.info.code == 401 || res.body.info.code == 403) {
                        self.props.history.push('/join');
                    }
                }
            });
    }

    async follow (person) {
        let self      = this;
        let index     = person.index;
        let following = Object.assign([], this.props.profile.following);
        //people.splice(index, 1);

        superagent
            .post(Config.API.URL+'/user/follow')
            .send({id:person._id})
            .set('x-access-jwt', localStorage.getItem('jwt'))
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    if (res.body.info.code == 201) {
                        following[index].followers = res.body.payload.followers;
                        self.props.dispatch(setProfileFollowing(following));
                    }
                }
            });
    }
    render() {
        let loading = () => {
            if (this.props.profile.following.length == 0 && (!this.state.loading || this.state.loading == 'show')) {
                return (
                    <div class="container">
                        <div class="ui-block">
                            <div class="ui-block-title"><img class="inner-loader" src="/static/spinner/busy.gif" alt="Gistoneer" /></div>
                        </div>
                    </div>
                )
            } else {
                if (this.props.profile.following.length == 0) {
                    return (
                        <div class="container">
                            <div class="ui-block">
                                <div class="ui-block-title"><div class="h6 title">You're not following anyone yet.</div></div>
                            </div>
                        </div>
                    )
                }
            }
        };
        return (
            <div>
                { loading() }
                {this.props.profile.following.length > 0 ?
                    /*<div class="container">
                        <div class="row">
                            <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div class="ui-block responsive-flex">
                                    <div class="ui-block-title">
                                        <div class="h6 title">Following</div>
                                        <form class="w-search">
                                            <div class="form-group with-button">
                                                <input class="form-control" type="text" placeholder="Search Contact..." />
                                                <button><svg class="olymp-magnifying-glass-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-magnifying-glass-icon"></use></svg></button>
                                            </div>
                                        </form>
                                        <a href="#" class="more"><svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>*/
                ''
                : ''}

                {/*<!-- Friends -->*/}

                <div class="container">
                    <div class="row">

                        <Suspense fallback={<Loading stage="Loading..." />}>
                            {this.props.profile.following.map((person, i) => {
                                return <Person key={i} index={i} person={person} onFollow={this.follow.bind(this)} />
                            })}
                        </Suspense>
                    </div>
                </div>
                {/*<!-- ... end Friends -->*/}
            </div>
        )
    }
}
const mapStateToProps = state => ({
    profile : state.profile
});
export default connect(mapStateToProps)(withRouter(Following));;