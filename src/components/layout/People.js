import React, { Component, lazy, Suspense  } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Config from '../../utils/Config';
//import { Person } from '../presentation';
import { setPeopleList } from '../../actions/People';
import superagent from 'superagent';
import Loading from './Loading';

const Person = lazy(() => import('../presentation/Person'));

class People extends Component {
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
        let self    = this;
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.addEventListener('readystatechange', function () {
            if (this.readyState === 0 || this.readyState === 4) {
                self.setState({loading: 'hide'});
                if (this.status === 200) {
                    let res = JSON.parse(this.response);
                    if (res.info.code === 200) {
                        self.props.dispatch(setPeopleList(res.data));
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
        xmlhttp.open('get', Config.API.URL+'/user', true);
        xmlhttp.setRequestHeader('x-access-jwt', localStorage.getItem('jwt'));
        xmlhttp.setRequestHeader('Content-Type', 'application/json');
        xmlhttp.send();
    }
    async follow (person) {
        let self   = this;
        let index  = person.index;
        let people = Object.assign([], this.props.people.list);
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
                        people[index].followers = res.body.payload.followers;
                        self.props.dispatch(setPeopleList(people));
                    } else if (res.body.info.code == 401 || res.body.info.code == 403) {
                        self.props.history.push('/join');
                    }
                }
            });
    }
    render() {
        let loading = () => {
            if (this.props.people.list.length == 0 && (!this.state.loading || this.state.loading == 'show')) {
                return (
                    <div class="container">
                        <div class="ui-block">
                            <div class="ui-block-title"><img class="inner-loader" src="/static/spinner/busy.gif" alt="Gistoneer" /></div>
                        </div>
                    </div>
                )
            } else {
                if (this.props.people.list.length == 0) {
                    return (
                        <div class="container">
                            <div class="ui-block">
                                <div class="ui-block-title"><div class="h6 title">We couldn't found any friend for you.</div></div>
                            </div>
                        </div>
                    )
                }
            }
        };
        return (
            <div>
                { loading() }
                {/*
                <div class="container">
                    <div class="row">
                        <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div class="ui-block responsive-flex">
                                <div class="ui-block-title">
                                    <div class="h6 title">People</div>
                                    <form class="w-search">
                                        <div class="form-group with-button">
                                            <input class="form-control" type="text" placeholder="Search People..." />
                                            <button>
                                                <svg class="olymp-magnifying-glass-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-magnifying-glass-icon"></use></svg>
                                            </button>
                                        </div>
                                    </form>
                                    <a href="#" class="more"><svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                */}

                <div class="container">
                    <div class="row">
                        <Suspense fallback={<Loading stage="Loading..." />}>
                            {this.props.people.list.map((person, i) => {
                                return <Person key={i} index={i} person={person} onFollow={this.follow.bind(this)} />
                            })}
                        </Suspense>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    people : state.people,
});
export default connect(mapStateToProps)(withRouter(People));;