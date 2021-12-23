import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
//import Config from '../../utils/Config';
//import { Person } from '../presentation';
//import { setPeopleList } from '../../actions/People';
//import superagent from 'superagent';

let CRUMINA = {};

class Settings extends Component {
    componentDidMount() {
        CRUMINA.Materialize = function () {
            $.material.init();
            $('.checkbox > label').on('click', function () {
                $(this).closest('.checkbox').addClass('clicked');
            })
        };
        
        $(document).ready(function () {
            CRUMINA.Materialize();
        });

        //Scroll to top.
        jQuery('.back-to-top').on('click', function () {
            $('html,body').animate({
                scrollTop: 0
            }, 1200);
            return false;
        });
        localStorage.setItem('current-path', this.props.match.url);
        let self = this;

        /* -----------------------------
        * Replace select tags with bootstrap dropdowns
        * Script file: theme-plugins.js
        * Documentation about used plugin:
        * https://silviomoreto.github.io/bootstrap-select/
        * ---------------------------*/
        $('.selectpicker').selectpicker();

        /* -----------------------------
        * Date time picker input field
        * Script file: daterangepicker.min.js, moment.min.js
        * Documentation about used plugin:
        * https://v4-alpha.getbootstrap.com/getting-started/introduction/
        * ---------------------------*/
        var date_select_field = $('input[name="datetimepicker"]');
        if (date_select_field.length) {
            var start = moment().subtract(29, 'days');

            date_select_field.daterangepicker({
                startDate: start,
                autoUpdateInput: false,
                singleDatePicker: true,
                showDropdowns: true,
                locale: {
                    format: 'DD/MM/YYYY'
                }
            });
            date_select_field.on('focus', function () {
                $(this).closest('.form-group').addClass('is-focused');
            });
            date_select_field.on('apply.daterangepicker', function (ev, picker) {
                $(this).val(picker.startDate.format('DD/MM/YYYY'));
                $(this).closest('.form-group').addClass('is-focused');
            });
            date_select_field.on('hide.daterangepicker', function () {
                if ('' === $(this).val()){
                    $(this).closest('.form-group').removeClass('is-focused');
                }
            });

        }
        $(".profile-settings-open").on('click', function () {
            $('.profile-settings-responsive').toggleClass('open');
            return false
        });
    
        $(".js-expanded-menu").on('click', function () {
            $('.header-menu').toggleClass('expanded-menu');
            return false
        });
    }
    
    render() {
        return (
            <div>
                {/*<!-- Profile Settings Responsive -->*/}

                <div class="profile-settings-responsive">

                    <a href="#" class="js-profile-settings-open profile-settings-open">
                        <i class="fa fa-angle-right" aria-hidden="true"></i>
                        <i class="fa fa-angle-left" aria-hidden="true"></i>
                    </a>
                    <div class="mCustomScrollbar" data-mcs-theme="dark">
                        <div class="ui-block">
                            <div class="your-profile">
                                <div class="ui-block-title ui-block-title-small">
                                    <h6 class="title">Your PROFILE</h6>
                                </div>

                                <div id="accordion1" role="tablist" aria-multiselectable="true">
                                    <div class="card">
                                        <div class="card-header" role="tab" id="headingOne-1">
                                            <h6 class="mb-0">
                                                <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne-1" aria-expanded="true" aria-controls="collapseOne">
                                                    Profile Settings
                                                    <svg class="olymp-dropdown-arrow-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-dropdown-arrow-icon"></use></svg>
                                                </a>
                                            </h6>
                                        </div>

                                        <div id="collapseOne-1" class="collapse show" role="tabpanel" aria-labelledby="headingOne">
                                            <ul class="your-profile-menu">
                                                <li><a href="">Personal Information</a></li>
                                                {/*
                                                <li><a href="">Account Settings</a></li>
                                                <li><a href="">Change Password</a></li>
                                                */}
                                                <li><a href="">Hobbies and Interests</a></li>
                                                {/*<li><a href="">Education and Employement</a></li>*/}
                                            </ul>
                                        </div>
                                    </div>
                                </div>


                                <div class="ui-block-title">
                                    <a href="" class="h6 title">Notifications</a>
                                    <a href="#" class="items-round-little bg-primary">8</a>
                                </div>
                                {/*<div class="ui-block-title">
                                    <a href="" class="h6 title">Chat / Messages</a>
                                </div>*/}
                            </div>
                        </div>
                    </div>
                </div>

                {/*<!-- ... end Profile Settings Responsive -->*/}

                {/*<!-- Your Account Personal Information -->*/}

                <div class="container">
                    <div class="row">
                        <div class="col col-xl-9 order-xl-2 col-lg-9 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
                            <div class="ui-block">
                                <div class="ui-block-title">
                                    <h6 class="title">Personal Information</h6>
                                </div>
                                <div class="ui-block-content">

                                    
                                    {/*<!-- Personal Information Form  -->*/}
                                    
                                    <form>
                                        <div class="row">
                                    
                                            <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
                                                <div class="form-group label-floating">
                                                    <label class="control-label">First Name</label>
                                                    <input class="form-control" placeholder="" type="text" defaultValue="James" />
                                                </div>
                                    
                                                <div class="form-group label-floating">
                                                    <label class="control-label">Your Email</label>
                                                    <input class="form-control" placeholder="" type="email" defaultValue="jspiegel@yourmail.com" />
                                                </div>
                                    
                                                <div class="form-group date-time-picker label-floating">
                                                    <label class="control-label">Your Birthday</label>
                                                    <input name="datetimepicker" defaultValue="10/24/1984" />
                                                    <span class="input-group-addon">
                                                        <svg class="olymp-month-calendar-icon icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-month-calendar-icon"></use></svg>
                                                    </span>
                                                </div>
                                            </div>
                                    
                                            <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
                                                <div class="form-group label-floating">
                                                    <label class="control-label">Last Name</label>
                                                    <input class="form-control" placeholder="" type="text" defaultValue="Spiegel" />
                                                </div>
                                    
                                                <div class="form-group label-floating">
                                                    <label class="control-label">Your Website</label>
                                                    <input class="form-control" placeholder="" type="email" defaultValue="daydreamzagency.com" />
                                                </div>
                                    
                                    
                                                <div class="form-group label-floating is-empty">
                                                    <label class="control-label">Your Phone Number</label>
                                                    <input class="form-control" placeholder="" type="text" />
                                                </div>
                                            </div>
                                    
                                            <div class="col col-lg-4 col-md-4 col-sm-12 col-12">
                                                <div class="form-group label-floating is-select">
                                                    <label class="control-label">Your Country</label>
                                                    <select class="selectpicker form-control">
                                                        <option value="US">United States</option>
                                                        <option value="AU">Australia</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col col-lg-4 col-md-4 col-sm-12 col-12">
                                                <div class="form-group label-floating is-select">
                                                    <label class="control-label">Your State / Province</label>
                                                    <select class="selectpicker form-control">
                                                        <option value="CA">California</option>
                                                        <option value="TE">Texas</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col col-lg-4 col-md-4 col-sm-12 col-12">
                                                <div class="form-group label-floating is-select">
                                                    <label class="control-label">Your City</label>
                                                    <select class="selectpicker form-control">
                                                        <option value="SF">San Francisco</option>
                                                        <option value="NY">New York</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
                                                <div class="form-group label-floating">
                                                    <label class="control-label">Write a little description about you</label>
                                                    <textarea class="form-control" defaultValue="Hi, I’m James, I’m 36 and I work as a Digital Designer for the  “Daydreams” Agency in Pier 56" placeholder=""></textarea>
                                                </div>
                                    
                                                <div class="form-group label-floating is-select">
                                                    <label class="control-label">Your Gender</label>
                                                    <select class="selectpicker form-control">
                                                        <option value="MA">Male</option>
                                                        <option value="FE">Female</option>
                                                    </select>
                                                </div>
                                    
                                                <div class="form-group label-floating is-empty">
                                                    <label class="control-label">Religious Belifs</label>
                                                    <input class="form-control" placeholder="" type="text" />
                                                </div>
                                            </div>
                                            <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
                                                <div class="form-group label-floating is-empty">
                                                    <label class="control-label">Your Birthplace</label>
                                                    <input class="form-control" placeholder="" type="text" />
                                                </div>
                                    
                                                <div class="form-group label-floating">
                                                    <label class="control-label">Your Occupation</label>
                                                    <input class="form-control" placeholder="" type="text" defaultValue="UI/UX Designer" />
                                                </div>
                                    
                                                <div class="form-group label-floating is-select">
                                                    <label class="control-label">Status</label>
                                                    <select class="selectpicker form-control">
                                                        <option value="MA">Married</option>
                                                        <option value="FE">Not Married</option>
                                                    </select>
                                                </div>
                                    
                                                <div class="form-group label-floating">
                                                    <label class="control-label">Political Incline</label>
                                                    <input class="form-control" placeholder="" type="text" defaultValue="Democrat" />
                                                </div>
                                            </div>
                                            {/*
                                            <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group with-icon label-floating">
                                                    <label class="control-label">Your Facebook Account</label>
                                                    <input class="form-control" type="text" defaultValue="www.facebook.com/james-spiegel95321" />
                                                    <i class="fab fa-facebook-f c-facebook" aria-hidden="true"></i>
                                                </div>
                                                <div class="form-group with-icon label-floating">
                                                    <label class="control-label">Your Twitter Account</label>
                                                    <input class="form-control" type="text" defaultValue="www.twitter.com/james_spiegelOK" />
                                                    <i class="fab fa-twitter c-twitter" aria-hidden="true"></i>
                                                </div>
                                            </div>
                                            
                                            <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
                                                <button class="btn btn-secondary btn-lg full-width">Restore all Attributes</button>
                                            </div>
                                            <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
                                                <button class="btn btn-primary btn-lg full-width">Save all Changes</button>
                                            </div>*/}

                                            <div class="col col-lg-12 col-md-12 col-sm-12 col-12">
                                                <button class="btn btn-primary btn-lg full-width">Save all Changes</button>
                                            </div>
                                    
                                        </div>
                                    </form>
                                    
                                    {/*<!-- ... end Personal Information Form  -->*/}
                                </div>
                            </div>
                        </div>

                        <div class="col col-xl-3 order-xl-1 col-lg-3 order-lg-1 col-md-12 order-md-2 col-sm-12  responsive-display-none">
                            <div class="ui-block">
                                {/*<!-- Your Profile  -->*/}
                                <div class="your-profile">
                                    <div class="ui-block-title ui-block-title-small">
                                        <h6 class="title">Your PROFILE</h6>
                                    </div>
                                
                                    <div id="accordion" role="tablist" aria-multiselectable="true">
                                        <div class="card">
                                            <div class="card-header" role="tab" id="headingOne">
                                                <h6 class="mb-0">
                                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                        Profile Settings
                                                        <svg class="olymp-dropdown-arrow-icon"><use href="/static/svg-icons/sprites/icons.svg#olymp-dropdown-arrow-icon"></use></svg>
                                                    </a>
                                                </h6>
                                            </div>
                                
                                            <div id="collapseOne" class="collapse show" role="tabpanel" aria-labelledby="headingOne">
                                                <ul class="your-profile-menu">
                                                    <li><a href="">Personal Information</a></li>
                                                    {/*
                                                    <li><a href="">Account Settings</a></li>
                                                    <li><a href="">Change Password</a></li>
                                                    */}
                                                    <li><a href="">Hobbies and Interests</a></li>
                                                    {/*<li><a href="">Education and Employement</a></li>*/}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                
                                    <div class="ui-block-title">
                                        <a href="#" class="h6 title">Notifications</a>
                                        <a href="#" class="items-round-little bg-primary">8</a>
                                    </div>
                                    {/*<div class="ui-block-title">
                                        <a href="" class="h6 title">Chat / Messages</a>
                                    </div>*/}
                                </div>
                                
                                {/*<!-- ... end Your Profile  -->*/}
                                

                            </div>
                        </div>
                    </div>
                </div>

                {/*<!-- ... end Your Account Personal Information -->*/}



            </div>
        )
    }
}
const mapStateToProps = state => ({
    people : state.people,
});
export default connect(mapStateToProps)(withRouter(Settings));;