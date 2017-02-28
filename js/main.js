/**
 *  Site object that controls all dynamic functionality
 */
function Site(config) {
  'use strict';

  var config  = config || {},
    $window = $(window),
    modal   = new Modal({
      selector: '#modal'
    });

  //-- Boot up the site
  init();

  //-- Attach all event handlers to the page
  function _attachEventHandlers() {

    $('#sec1').on('click', '#arrow-pulser', function() {
      $("html, body").animate({ scrollTop: $('#main-section').offset().top }, 1000);
    });

  }

  /* ===============================================================
    ANIMATION
     =============================================================== */

  function _animateMainSection() {
    //Animate pop-down from top of section
    new Waypoint({
      element: document.getElementById('main-section'),
      handler: function() {
          var me = document.querySelectorAll('.top-popper');
                 Array.prototype.forEach.call(me, function(el, index) {
                   setTimeout(function() {
                     $(el).addClass('active');
                   }, (10));

              });
        },
        offset: '65%'
      });

    // Animate Title
    new Waypoint({
      element: document.getElementById('main-section'),
      handler: function() {
          _animateTitle('main-section');
      },
      offset: '70%'
    });


    // Animate Body
    new Waypoint({
      element: document.getElementById('main-section'),
      handler: function(direction) {
        _animateBody('main-section');
        var meIcons = document.querySelectorAll('.colleen .split-circle');
               Array.prototype.forEach.call(meIcons, function(el, index) {
                 setTimeout(function() {
                   $(el).addClass('active');
                 }, (500*index));
               });
      }, //end handler
      offset: '65%'
    });

    //Animate side-popper
    new Waypoint({
      element: document.getElementById('main-section'),
      handler: function() {
        var me = document.querySelectorAll('.side-popper');
               Array.prototype.forEach.call(me, function(el, index) {
                 setTimeout(function() {
                   $(el).addClass('active');
                 }, (1000));

            });
        },
      });

  }


  function _animateSection3() {
    //Animate pop-down from top of section
    new Waypoint({
      element: document.getElementById('section-3'),
      handler: function() {
          var me = document.querySelectorAll('.top-popper');
                 Array.prototype.forEach.call(me, function(el, index) {
                   setTimeout(function() {
                     $(el).addClass('active');
                   }, (10));

              });
        },
        offset: '65%'
      });

    // Animate Title
    new Waypoint({
      element: document.getElementById('section-3'),
      handler: function() {
          _animateTitle('section-3');
      },
      offset: '70%'
    });


    // Animate Body
    new Waypoint({
      element: document.getElementById('section-3'),
      handler: function(direction) {
        _animateBody('section-3');
        var meIcons = document.querySelectorAll('.colleen .split-circle');
               Array.prototype.forEach.call(meIcons, function(el, index) {
                 setTimeout(function() {
                   $(el).addClass('active');
                 }, (500*index));
               });
      }, //end handler
      offset: '65%'
    });

    //Animate side-popper
    new Waypoint({
      element: document.getElementById('section-3'),
      handler: function() {
        var me = document.querySelectorAll('.side-popper');
               Array.prototype.forEach.call(me, function(el, index) {
                 setTimeout(function() {
                   $(el).addClass('active');
                 }, (1000));

            });
        },
      });

  }

  /**
   *  Animate the title and body in for each section
   */
  function _animateTitle(pageID) {
    $('h3', '#' + pageID).addClass('active');
  }

  function _animateBody(pageID) {
    $('p', '#' + pageID).addClass('active');
  }

  /**
   *  Render the page styles after the window has loaded
   */
  function _renderPage() {
    $(window).load(function() {
      _animateIntroPage();
    });
  }

  /**
   *  Boot up the site
   */
  function init() {
   _attachEventHandlers();
    _renderPage();
    _animateMainSection();
    _animateSection3();
  }
}

/**
 *  Letter Modal
 */
function Modal(config) {

  var config = config || {},
    $selector = $(config.selector),
    animateLetterIntro = new svgAnimator({
      selector: '#dear-colleen'
    });

  init();

  function _attachEventHandlers() {

    /**
     *  Handle form submit
     */
    $('#talk-to-me-form').submit(function(e) {

      // Let's ensure there's a message there
      if($('#message').val() != '') {
        $('.letter-submit', this).prop('disabled', true);

        payload = {};
        payload.message = $('#message').val();
        payload.email = $('#email').val();

        $.ajax({
          url: "mail.php",
          data: payload,
          type: "POST",
          dataType: "json",
          beforeSend: function(x) {
            if (x && x.overrideMimeType) {
             x.overrideMimeType("application/j-son;charset=UTF-8");
            }
          },
          success: function(data) {
              // Reset the form
              console.log(data);
              if(data == "Mail sent successfully."){
                  $('.letter-submit').prop('disabled', false);
                  $('#message').val('');
                  $('#email').val('');
                  $('#message-sent').addClass('active');
                  setTimeout(function() {
                    $('#message-sent').removeClass('active');
                  }, 3000);
            }
          },
          error: function(e){

            $('.letter-submit').prop('disabled', false);
            $('#message-not-sent').addClass('active');
            setTimeout(function() {
              $('#message-not-sent').removeClass('active');
            }, 5000);
            console.log(e);
          }
        });
      }
      return false;
    });


    /**
     *  Open the modal
     */
    $('#send-message-envelope').click(function() {
      $(this).addClass('active');
      $('#message').focus();
      $selector.toggleClass('active');
      $selector.removeClass('leave');
      animateLetterIntro.init();
      setTimeout(function() {
        animateLetterIntro.animate();
      }, 100);
    })

    /**
     *  Handle Keyevents
     */
    $(document).keyup(function(e) {
      if(e.which === 27) {
        closeModal();
      }
    })

    /**
     *  Click on the overlay will close the modal
     */
    $('.modal-overlay, .modal-body .close').click(function() {
      closeModal();
    });
  }

  function closeModal() {
    $('#send-message-envelope').removeClass('active');
    $selector.removeClass('active');
    $selector.addClass('leave');
  }

  function init() {
    _attachEventHandlers();
    autosize($('#message'));
  }
}

/**
 *  Function to animate SVG paths
 */
function svgAnimator(config) {
  init();

  function init() {
     $(config.selector).each(function() {
      var delay,
        length,
        path,
        paths,
        previousStrokeLength,
        speed,
        _i,
        _len,
        _results;

      paths = $('path, circle, rect', this);
      delay = 0;
      _results = [];
      for (_i = 0, _len = paths.length; _i < _len; _i++) {
        path = paths[_i];
        length = path.getTotalLength();
        previousStrokeLength = speed || 0;
        speed = 120;
        delay += previousStrokeLength + 20;
        _results.push($(path)
                .css('transition', 'none')
                .attr('data-length', length)
                .attr('data-speed', speed)
                .attr('data-delay', delay)
                .attr('stroke-dashoffset', length)
                .attr('stroke-dasharray', length + ',' + length)
              );
      }
      return _results;

    });
  }

  function animate() {
    $(config.selector).each(function() {
      var delay,
        length,
        path,
        paths,
        speed,
        _i,
        _len,
        _results;

      paths = $('path, circle, rect', this);
      _results = [];
      for (_i = 0, _len = paths.length; _i < _len; _i++) {
        path = paths[_i];
        length = $(path).attr('data-length');
        speed = $(path).attr('data-speed');
        delay = $(path).attr('data-delay');
        _results.push($(path)
                .css('transition', 'stroke-dashoffset ' + speed + 'ms ' + delay + 'ms linear')
                .attr('stroke-dashoffset', '0')
        );
      }
      return _results;
    });
  }

  return {
    animate: animate,
    init: init
  }
}
