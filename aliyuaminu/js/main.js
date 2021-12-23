/*!
 * Item: Flexi
 * Description: Personal Portfolio HTML5 Template
 * Author/Developer: Exill
 * Author/Developer URL: https://themeforest.net/user/exill
 * Version: v1.0.2
 * License: Themeforest Standard Licenses: http://themeforest.net/licenses
 */

(function($) {
    'use strict';

    /*=================================
    =            Preloader            =
    =================================*/
    $(window).on('load', function() {
        $('.preloader-icon').fadeOut(400);
        $('.preloader').delay(500).fadeOut('slow');
    });

    /*===================================
    =            Navbar Area            =
    ===================================*/
    // Navbar's sidebar toggler button
    $('#navBtn').on('click', function() {
        $('#navBtn').toggleClass('is-active');
        $('#sidebar').toggleClass('toggle');
    });

    // Sidebar's inner toggler button
    $('#sidebarBtn').on('click', function() {
        $('#navBtn').trigger('click');
    });

    // These elements gets hidden if the user clicks outside of them
    $(document).on('mouseup', function(event) {
        // Sidebar
        if ($('#sidebar').hasClass('toggle')) {
            var sidebar = $('#sidebar');
            if (!sidebar.is(event.target) && sidebar.has(event.target).length === 0) {
                $('#navBtn').trigger('click');
            }
        }
        if ($('#navbarSupportedContent').hasClass('show')) {
            // The mobile version of Bootstrap's Navbar Dropdown
            var navbarToggler = $('.navbar-toggler');
            if (!navbarToggler.is(event.target) && navbarToggler.has(event.target).length === 0) {
                navbarToggler.trigger('click');
            }
        }
    });

    // Triggers the second style of the navbar if the user scrolls down
    $(window).on('scroll', function() {
        var navbar = '#navbar';
        if ($(navbar).offset().top > 75) {
            $(navbar).addClass('scrolled');
        } else {
            $(navbar).removeClass('scrolled');
        }
    });

    // Scrolling animation if the user clicks on a Hash link that has 'data-scroll' attribute
    $(document).on('click', 'a[data-scroll][href^="#"]', function(e) {
        var navbarHeight = $('#navbar').height();
        var id = $(this).attr('href');
        var $id = $(id);
        if ($id.length === 0) {
            return;
        }
        e.preventDefault();
        $('body, html').animate({
            scrollTop: $id.offset().top - navbarHeight
        }, 750);
    });
    // Navbar Scrollspy
    $('#navbar').onePageNav({
        currentClass: 'active',
        navItems: '.nav-item > .nav-link',
        scrollSpeed: 500, // Scroll speed
        scrollThreshold: 0.5, // Scroll speed when nearing the beginning or end of the section
        easing: 'swing'
    });

    /*===================================
    =            Header Area            =
    ===================================*/
    // Set animation timing
    var animationDelay = 2500,
        // Clip effect 
        revealDuration = 600,
        revealAnimationDelay = 1500;

    initHeadline();


    function initHeadline() {
        // Initialise headline animation
        animateHeadline($('.cd-headline'));
    }

    function animateHeadline($headlines) {
        var duration = animationDelay;
        $headlines.each(function() {
            var headline = $(this);
            if (headline.hasClass('clip')) {
                var spanWrapper = headline.find('.cd-words-wrapper'),
                    newWidth = spanWrapper.width() + 10;
                spanWrapper.css('width', newWidth);
            }

            //trigger animation
            setTimeout(function() {
                hideWord(headline.find('.is-visible').eq(0));
            }, duration);
        });
    }

    function hideWord($word) {
        var nextWord = takeNext($word);

        if ($word.parents('.cd-headline').hasClass('clip')) {
            $word.parents('.cd-words-wrapper').animate({
                width: '2px'
            }, revealDuration, function() {
                switchWord($word, nextWord);
                showWord(nextWord);
            });

        }
    }

    function showWord($word, $duration) {
        if ($word.parents('.cd-headline').hasClass('clip')) {
            $word.parents('.cd-words-wrapper').animate({
                'width': $word.width() + 10
            }, revealDuration, function() {
                setTimeout(function() {
                    hideWord($word);
                }, revealAnimationDelay);
            });
        }
    }


    function takeNext($word) {
        return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
    }

    function takePrev($word) {
        return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
    }

    function switchWord($oldWord, $newWord) {
        $oldWord.removeClass('is-visible').addClass('is-hidden');
        $newWord.removeClass('is-hidden').addClass('is-visible');
    }

    /*==================================
    =            About Area            =
    ==================================*/
    // Sidebar Toggler for 'More Details' button
    $('.about-area .btn.details').on('click', function() {
        $('#navBtn').toggleClass('is-active');
        $('#sidebar').toggleClass('toggle');
    });

    /*======================================
    =            Portfolio Area            =
    ======================================*/
    var Shuffle = window.Shuffle;

    var shufflejs = function(element) {
        this.element = element;

        this.shuffle = new Shuffle(element, {
            itemSelector: '.js-item',
            sizer: element.querySelector('.sizer-element'),
        });

        this._activeFilters = [];

        this.addFilterButtons();
    };

    shufflejs.prototype.addFilterButtons = function() {
        var options = document.querySelector('.filter-control');

        if (!options) {
            return;
        }

        var filterButtons = Array.from(options.children);

        filterButtons.forEach(function(button) {
            button.addEventListener('click', this._handleFilterClick.bind(this), false);
        }, this);
    };

    shufflejs.prototype._handleFilterClick = function(evt) {
        var btn = evt.currentTarget;
        var btnGroup = btn.getAttribute('data-group');
        this.shuffle.filter(btnGroup);
    };


    window.shufflejs = new shufflejs(document.getElementById('shufflejs'));

    $('.portfolio-area .filter-control li').on('click', function() {
        $(this).addClass('tab-active').siblings().removeClass('tab-active');
    });

    /*=========================================
    =            Testimonials Area            =
    =========================================*/
    $('.testimonials-area .owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        margin: 0,
        nav: false,
        smartSpeed: 400,
    });

    /*====================================
    =            Contact Area            =
    ====================================*/
    $('#contact-form').on('submit', function(event) {
        var form = $(this);
        var submitBtn = form.find('#contact-submit');
        var feedbackErr = form.find('.feedback-error');
        event.preventDefault();
        // Waiting for the response from the server
        submitBtn.html('Wait...').addClass('wait').prop('disabled', true);
        setTimeout(function() {
            // Posts the Form's data to the server using Ajax
            $.ajax({
                    url: form.attr('action'),
                    type: 'POST',
                    data: form.serialize(),
                })
                // Getting a response from the server
                .done(function(response) {
                    // If the PHP file succeed sending the message
                    if (response == 'success') {
                        // Feedback to the user
                        submitBtn.removeClass('wait').html('Success').addClass('success');
                        setTimeout(function() {
                            submitBtn.html('Submit').removeClass('success').prop('disabled', false);
                        }, 6000);
                        // Clears the Form
                        form[0].reset();
                        // If something is wrong
                    } else {
                        // Feedback to the user
                        submitBtn.removeClass('wait').html('Error').addClass('error');
                        feedbackErr.fadeIn(200);
                        setTimeout(function() {
                            submitBtn.html('Submit').removeClass('error').prop('disabled', false);
                            feedbackErr.fadeOut(200);
                        }, 6000);
                        // Clears the form
                        form[0].reset();
                    }
                });
        }, 1000);
    });
}(jQuery));