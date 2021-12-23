import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Config from '../../../utils/Config';
import superagent from 'superagent';
import { setProfileContacs } from '../../../actions/Profile';
import { Person } from '../../presentation';

class Contacts extends Component {
    componentDidMount() {
        localStorage.setItem('last-path', this.props.match.url);
        localStorage.setItem('current-path', this.props.match.url);
        let self = this;
        superagent
            .get(Config.API.URL+'/user/profile/friends')
            .set('x-access-jwt', localStorage.getItem('jwt'))
            .set('x-access-user', this.props.match.params.username)
            .set('x-access-action', 'contacts')
            .set('Accept', 'application/json')
            .end((err, res) => {
                console.log(res.body);
                if (err) {
                    console.log(err);
                } else {
                    if (res.body.info.code == 200) {
                        self.props.dispatch(setProfileContacs(res.body.data));
                    }
                }
            });
    }

    async follow (person) {
        //console.log(person);
        let self     = this;
        let index    = person.index;
        let contacts = Object.assign([], this.props.profile.contacts);
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
                        if (res.body.payload.action == 'follow') {
                            self.props.dispatch(setProfileFollowers(followers));
                        }
                    }
                    // console.log(res.body);
                }
            });
    }
    render() {
        return (
            <div>
                {this.props.profile.contacts.length > 0 ?
                    <div class="container">
                        <div class="row">
                            <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div class="ui-block responsive-flex">
                                    <div class="ui-block-title">
                                        <div class="h6 title">Contacts</div>
                                        <form class="w-search">
                                            <div class="form-group with-button">
                                                <input class="form-control" type="text" placeholder="Search Contact..." />
                                                <button>
                                                    <svg class="olymp-magnifying-glass-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-magnifying-glass-icon"></use></svg>
                                                </button>
                                            </div>
                                        </form>
                                        {/*<a href="#" class="more"><svg class="olymp-three-dots-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg></a>*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                : ''}

                {/*<!-- Friends -->*/}

                <div class="container">
                    <div class="row">
                        {this.props.profile.contacts.map((person, i) => {
                            return <Person key={i} index={i} person={person} onFollow={this.follow.bind(this)} />
                        })}
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
export default connect(mapStateToProps)(withRouter(Contacts));;