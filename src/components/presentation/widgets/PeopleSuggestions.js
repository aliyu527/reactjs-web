import React, { Component, lazy, Suspense } from 'react';
import Config from '../../../utils/Config';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setPeopleSuggestions } from '../../../actions/Suggestions';
import superagent from 'superagent';
import Loading from '../../presentation/Loading';
//import { Person } from '../suggestions';

const Person = lazy(() => import('../suggestions/Person'));

class PeopleSuggestions extends Component {
    componentDidMount () {
        this.suggestions();
    }
    suggestions () {
        let self = this;
        superagent
            .get(Config.API.URL+'/user/suggestions/all')
            .set('x-access-jwt', localStorage.getItem('jwt'))
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    if (res.body.info.code == 200) {
                        let payload = res.body.payload;
                        self.props.dispatch(setPeopleSuggestions(payload));
                    }
                }
            });
    }
    async follow (person) {
        let self   = this;
        let index  = person.index;
        let people = Object.assign([], this.props.suggestions.people);
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
                        self.props.dispatch(setPeopleSuggestions(people));
                    }
                }
            });
    }
    render () {
        let people = this.props.suggestions.people;
        return (
            <div class="ui-block">
                <div class="ui-block-title">
                    <h6 class="title">People Suggestions</h6>
                    {/*<a href="#" class="more"><svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg></a>*/}
                </div>
                <ul class="widget w-friend-pages-added notification-list friend-requests">
                    <Suspense fallback={<Loading />}>
                        {people.map((person, i) => {
                            return (
                                <Person key={i} index={i} person={person} onFollow={this.follow.bind(this)} />
                            )
                        })}
                    </Suspense>
                </ul>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    suggestions: state.suggestions,
    self: state.self,
    status: state.status
});

export default connect(mapStateToProps)(withRouter(PeopleSuggestions));