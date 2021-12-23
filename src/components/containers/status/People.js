import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Config } from '../../../utils';
import { Person } from '../../presentation/stories';
import { setPeople } from '../../../actions/Status';
import superagent from 'superagent';

class People extends Component {
    async follow (person) {
        let self   = this;
        let index  = person.index;
        let people = Object.assign([], this.props.status.people);
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

                        self.props.dispatch(setPeople(people));
                    }
                }
            });
    }
    render () {
        return (
            <div id="newsfeed-items-grid">
                {this.props.status.people.length == 0 ? <div class="ui-block"><div class="ui-block-title"><div class="h6 title">No match person</div></div></div>: ''}
                {this.props.status.people.map((person, i) => {
                    return (
                        <Person key={i} index={i} person={person} onFollow={this.follow.bind(this)} />
                    )
                })}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    status: state.status,
    self: state.self
});

export default connect(mapStateToProps)(withRouter(People));