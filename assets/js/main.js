try {
  //Double range slider input
  let doubleSlider  = $('.payment-range-input, .year-range-input').slider({
    formatter:function() {
      let input = $('[data-slider-id='+ $(this).attr('id') +']');
      var values = input.slider('getValue');
      input.parents('form, .form').find('input.min').val(values[0])
      input.parents('form, .form').find('input.max').val(values[1])
    }
  });

  let payment_initial_values = $('.payment-range-input').slider('getValue');
  let year_initial_values    = $('.year-range-input').slider('getValue');
  let minPayment = payment_initial_values[0]
  let maxPayment = payment_initial_values[1]
  let minYear    = year_initial_values[0]
  let maxYear    = year_initial_values[1]
  //set initial values for Min & Max payment
  $('.filter input#min-payment').val(minPayment)
  $('.filter input#max-payment').val(maxPayment)
  $('.filter input#min-year').val(minYear)
  $('.filter input#max-year').val(maxYear)


  // Single Range slider Input 
  var singleSlider  = $('.single-range-input').slider({
    formatter:function() {
      let input = $('[data-slider-id='+ $(this).attr('id') +']');
      var value = input.slider('getValue');
      // var value = $('.single-range-input').slider('getValue');
      input.parent().find('input[type=number]').val(value)
      input.parent().find('.range-val').text(value)
    }
  });
  //set initial values for Min & Max payment
  var single_initial_value = $('.single-range-input').slider('getValue');
  $('.single-range-input').parent().find('input[type=number]').val(single_initial_value)
} catch (error) {
  console.warn(error);
}

//Navbaar toggler animation
$('.navbar-toggler').click(function() {
  $(this).toggleClass('active')
})
// Make Driver Seats Slider works when click on nav-tabs
$('#driver-seat .nav-tabs .nav-link').each(function() {
  $(this).on('click', function() {
    if($(this).attr('data-toggle') == 'Go to slide 1') {
      $('.swiper-pagination-bullet[aria-label="Go to slide 1"]').click()
    } else if($(this).attr('data-toggle') == 'Go to slide 2') {
      $('.swiper-pagination-bullet[aria-label="Go to slide 2"]').click()
    } else {
      $('.swiper-pagination-bullet[aria-label="Go to slide 3"]').click()
    }

    $(this).addClass('active').parent().siblings().find('.nav-link').removeClass('active')
  })
})

$('.swiper-pagination .swiper-pagination-bullet').each(function() {
  $(this).on('click', function() {
    if($(this).attr('aria-label') == 'Go to slide 1') {
      $('#driver-seat .nav-tabs .nav-link').removeClass('active')
      $('.nav-link[data-toggle="Go to slide 1"]').addClass('active')
    } else if($(this).attr('aria-label') == 'Go to slide 2') {
      $('#driver-seat .nav-tabs .nav-link').removeClass('active')
      $('.nav-link[data-toggle="Go to slide 2"]').addClass('active')
    } else if($(this).attr('aria-label') == 'Go to slide 3') {
      $('#driver-seat .nav-tabs .nav-link').removeClass('active')
      $('.nav-link[data-toggle="Go to slide 3"]').addClass('active')
    }

    // $(this).addClass('active').parent().siblings().find('.nav-link').removeClass('active')
  })
})

//Set initial Values to Monthly Payment & Cash-down based on the range value
// let monthlyInitVal = $('.estimate input[data-type=monthly-payment]').val();
// let cashInitVal    = $('.estimate input[data-type=cash-down]').val();
// $('.estimate #monthly-payment').val(monthlyInitVal);
// $('.estimate #cash-down').val(cashInitVal);

// // /Chanage Monthly Payment & Cash-down when user change range type and visa versa
// $('.estimate input[type=range]').on('input', function() {
//   let target = `#${$(this).attr('data-type')}`;
//   $(target).val($(this).val())
// });
// $('.estimate input[type=number]').on('input', function() {
//   let target = `${$(this).attr('id')}`;
//   $(`[data-type=${target}]`).val($(this).val())
// })

// SET INITAIL VALUES FOR INPUT BASED ON INPUT RANGE VALUE
$('input[type=number]').each(function() {
  let intialVal = $(this).parent().siblings('input[type=range]').val();
  $(this).attr('value', intialVal)
})

$('.range-val').each(function() {
  let intialVal = $(this).parent().siblings('input').val();
  $(this).text(intialVal);
})


// Change input number when changing range value
$('input[type=number]').parents().siblings('input[type=range]').each(function() {
  $(this).on('input', function() {
    $(this).siblings().find('input[type=number]').val($(this).val())
  })
})
$('.range-val').parents().siblings('input[type=range]').each(function() {
  $(this).on('input', function() {
    $(this).siblings().find('.range-val').text($(this).val())
  })
})

//change range input when hardcode input value
$('input[type=number]').each(function() {
  $(this).on('input', function() {
    $(this).parents().siblings('input[type=range]').val($(this).val())
  })
}) 

// Add Class Active to to checkbox container 
$('aside .form-check').on('click', function(e) {
  if($(this).find('input').attr('checked')) {
    $(this).find('input').removeAttr('checked');
    $(this).removeClass('active');
  } else {
    $(this).find('input').attr('checked', 'checked');
    $(this).addClass('active');
  }

  //checked itesms indicator number 
  if($(this).parent('.accordion-body').find('.form-check.active:not(.all)').length < 1) {
    $(this).parents('.make .accordion-item').removeClass('active');
    $(this).parents('.make .accordion-item').find('.filter-num').addClass('d-none')
  } else {
    $(this).parents('.make .accordion-item').addClass('active');
    $(this).parents('.make .accordion-item').find('.filter-num').removeClass('d-none')
    $(this).parents('.make .accordion-item').find('.filter-num').text($(this).parent('.accordion-body').find('.form-check.active:not(.all)').length)
  }

  // Check all models of particular car
  if($(this).hasClass('all')) {
    if($(this).find('input').attr('checked')) {
      $(this).parent('.accordion-body, div').children('.form-check:not(.active)').trigger('click')
    } else {
      $(this).parent('.accordion-body, div').children('.form-check.active').trigger('click')
    }
  }
  //check all models of all cars
  if($(this).hasClass('all-global')) {
    if($(this).find('input').attr('checked')) {
      $(this).siblings('.accordion').find('.accordion-body').children('.form-check.all:not(.active)').trigger('click')
    } else {
      $(this).siblings('.accordion').find('.accordion-body').children('.form-check.all.active').trigger('click')
    }
  }

  // check whether one element at least is unchecked
  if($(this).parent('.accordion-body, div').find('.form-check:not(.all):not(.active)').length == 0) {
    $(this).parent('.accordion-body, div').find('.form-check.all').addClass('active')
    $(this).parent('.accordion-body, div').find('.form-check.all').find('input').attr('checked', 'checked');
    $('.form-check.all-global').addClass('active');
    $('.form-check.all-global').find('input').attr('checked', 'checked')
  } else {
    $(this).parent('.accordion-body, div').find('.form-check.all').removeClass('active');
    $(this).parent('.accordion-body, div').find('.form-check.all').find('input').attr('checked', false);
    $('.form-check.all-global').removeClass('active')
    $('.form-check.all-global').find('input').attr('checked', false)
  }
  
  //remove class checked from "All" in make
  if($(this).parents('.make').find('.form-check:not(.all):not(.active)').length == 0) {
    $('.form-check.all-global').addClass('active')
    $('.form-check.all-global').find('input').attr('checked', 'checked')
  } else {
    $('.form-check.all-global').removeClass('active');
    $('.form-check.all-global').find('input').attr('checked', false)
  }

})

// Show & hide adjust terms box
$('#results .card .adjust-terms').on('click', function(e) {
  e.preventDefault()
  $(this).parents('.card-body').find('.terms-box').addClass('show')
})
$('#results .card .terms-box .arrow-down').on('click', function(e) {
  e.preventDefault()
  $(this).parents('.terms-box').removeClass('show')
});

// Show mobile filter when clicking on "filter button"
$('.mobile-filter #filter').on('click', function() {
  $('aside.filter').addClass('show');
  $('html, body').css('overflow', 'hidden')
})
// Hide mobile filter when clicking on "X" icon
$('aside.filter .filter-head .icon').on('click', function() {
  $('aside.filter').removeClass('show');
  $('html, body').css('overflow-y', 'scroll')
})

$(window).on('scroll', function() {
  // add class "active" to nav item when its associated section comes into view
  $('section').each(function() {
    if($(window).scrollTop() >= $(this).offset().top - 100) {
      var bId = `${$(this).attr('id')}` ;
      $('#vehicle-nav a').removeClass('active');
      $('#vehicle-nav a[href="' + '#' + bId + '"]').addClass('active');
    }
  });

  // Show/hide vehicle-nav & car title on tob of the page
  if($(window).scrollTop() >= $('#hero h3').offset().top - 1) {
    $('#vehicle-nav').addClass('show')
  } else {
    $('#vehicle-nav').removeClass('show')
  }

  //Show/hide sticky "Purchase" button
    if($(window).scrollTop() >= $('#calc-payment').offset().top ) {
      $('#car-details #calc-payment .calc-result').addClass('show')
    }   else {
      $('#car-details #calc-payment .calc-result').removeClass('show')
    }

  // Show & Hide Bottom "Book Now" Button
  // if($(window).scrollTop() > $('#calc-payment .card').offset().top ) {
  //   $('#calc-payment .calc-result').addClass('show')
  // } else {
  //   $('#calc-payment .calc-result').removeClass('show')
  // }
});

// view full details modal on car-details page
// $('#car-details .modal-body_nav .nav-link').click(function() {
//   $(this).parents('.nav-item').siblings().find('.nav-link').removeClass('active');
//   let pos = $(`${$(this).parent('a').attr('data-href')}`).prevAll();
//   pos.each(function() {
//     console.log(pos.offset().top - pos.parents('.modal-body').offset().top);
//   })
//   $(".modal-body").animate({
//     scrollTop: pos.offset().top - pos.parents('.modal-body').offset().top - 73
//   }, 100)
// })

document.querySelectorAll('#car-details .modal-body_nav .nav-link').forEach((e) => {
  e.addEventListener('click', function() {
    document.querySelectorAll('#car-details .modal-body_nav .nav-link').forEach((e) => {
      e.classList.remove('active')
    })
    e.classList.add('active')
    let eleId = `${e.parentElement.getAttribute('data-href')}`;
    let pos   = document.querySelector(eleId).offsetTop - 73
    $('.modal-body').animate({
      scrollTop: pos
    }, 200)
  })
})

// Show/Hide full overview details on report modal
$('.overview_nav #toggle-show').click(function() {
  if($(this).attr('data-hidden') == 'true') {
    $(this).parent().addClass('active');
    $(this).attr('data-hidden', 'false');
    // $(this).text('Show')
  } else {
    $(this).parent().removeClass('active');
    $(this).attr('data-hidden', 'true');
    // $(this).text('Hide')
  }
})
// Select between Finance Providers 
$('.providers li').click( function() {
  $(this).addClass('active').siblings().removeClass('active');
  let dataMonthly = $(this).attr('data-monthly');
  let dataCash = $(this).attr('data-cash');
  $(this).parent().siblings('.card').find('input#monthly-payment, input#monthly-range').val(dataMonthly)
  $(this).parent().siblings('.card, .calc-result').find('span[data-value=monthly-value]').text(dataMonthly);
  $(this).parent().siblings('.card').find('input#cash-down, input#cash-range').val(dataCash)
  $(this).parent().siblings('.card').find('span#cash-value').text(dataCash);
  //show loading spinner for 1s
  $('.loading-spinner').removeClass('d-none')
  $('.loading-spinner').siblings('span').addClass('d-none')
  setTimeout(() => {
    $('.loading-spinner').addClass('d-none')
    $('.loading-spinner').siblings('span').removeClass('d-none')
  }, 1000)
})

//check tabs when submitting the form on the modal
$('.modal form').submit(function (e) { 
  e.preventDefault();
  $(this).find('[aria-label="Close"]').trigger('click');
  // let modalTab = $(`[name=${$(this).attr('data-check')}]`);
  // modalTab.addClass('checked');

  // let deliveryCost = $('.modal form select option:selected').attr('data-cost');
  // let warrantyCost = $('.modal form input:checked').attr('data-cost');
  // let addOnCost    = $('.modal form input:checked').attr('data-cost');
  // $($(this).parents('.modal').attr('data-value')).text(deliveryCost);
  // $($(this).parents('.modal').attr('data-value')).text(warrantyCost)
  // $($(this).parents('.modal').attr('data-value')).text(addOnCost);
  console.log(addOnCost);

});

//Cancel form submit on Modal
$('.modal button[data-role=cancel]').click(function() {
  let modalTab = $(`[name=${$(this).parents('form').attr('data-check')}]`);
  modalTab.removeClass('checked');
  $(this).parents('form').find('input').prop('checked', false)
  $(this).parents('form').find('label').removeClass('checked')
  $(this).parents('form').find('select').val([])
})

//Add class checked to label when check it's input
$('#checkout .modal input[type=checkbox], #checkout .modal input[type=radio]').on('input', function() {
  $(this).parents('label').toggleClass('checked')
})

$('#checkout .modal input[type=radio]').on('input', function() {
  $(this).parents('label').addClass('checked')
  $(this).parents('label').siblings().removeClass('checked')
})

//show alert if the user didn't select a delivery location
// $(' [data-role=purchase]').click(function() {
//   if($('.calc-tabs input#calc-delivery').hasClass('checked')) {
//     $('.vehicle-info li[data-value=delivery-cost] .value, .calc-tabs input[id=calc-delivery]').removeClass('danger')
//   } else {
//     $('.vehicle-info li[data-value=delivery-cost] .value, .calc-tabs input[id=calc-delivery]').addClass('danger')
//   }
// })

// Move Monthly-Payment & Down Payment to top of the card on mobile
let target = $('#calc-payment .btn-group');
if($(window).innerWidth() <= 768) {
  target.prependTo('#calc-payment .host');
}

if($(window).innerWidth() <= 992) {
  $('#track-order .progress-tracker').removeClass('progress-tracker--center')
  $('#track-order .progress-tracker').addClass('progress-tracker--vertical')
}

// Change position of blue box containing "monthly-payment" & "down payment"
$(window).resize(function () { 
  if($(this).innerWidth() <= 992) {
    $('#track-order .progress-tracker').removeClass('progress-tracker--center')
    $('#track-order .progress-tracker').addClass('progress-tracker--vertical')
  } else {
    $('#track-order .progress-tracker').addClass('progress-tracker--center')
    $('#track-order .progress-tracker').removeClass('progress-tracker--vertical')
  }

  if($(this).innerWidth() <= 768) {
    target.prependTo('#calc-payment .host');
  } else {
    target.prependTo('#calc-payment .home');
  }

});

//Show car details when clicking th "show details button"
$('a.show-details').click(function() {
  $(this).parents('body').find('.payment-details').addClass('show')
})

//Hide car details when clicking the "close" icon
$('.payment-details .close').click(function() {
  $(this).parents('.payment-details').removeClass('show')
})
// Hide payment details on click anywhere outside the card
$('.payment-details').click(function() {
  $(this).removeClass('show')
})
$('.payment-details .card').click(function(e) {
  e.stopPropagation()
})

// Open "Pay" tab when submit the "add info form"
$('.purchase-info form.buyer-info').submit(function(e) {
  e.preventDefault();
  $('.purchase-info .nav-tabs #pay-tab:disabled').removeAttr('disabled')
  $('.purchase-info .nav-tabs #pay-tab').trigger('click')
  $('.purchase-info .nav-tabs #yourInfo-tab').addClass('complete')
})

// Activate Promocode button when user add a promocode
$('#promoCode').on('keyup', function() {
  if($(this).val().length != 0) {
    $(this).siblings('.btn').addClass('active')
  } else {
    $(this).siblings('.btn').removeClass('active')
  }
});

// add "success" message under upload button
$('input[name=upload]').on('change', function() {
  $(this).parents('.upload-box').find('.message').text('File Uploaded Successfully').addClass('success');
});

// Move to next step when submitting the "Personal info" Form
$('form#personal-info').on('submit', function(e) {
  e.preventDefault();
  if($(this).find('input[name=upload]').val() == '') {
    $('.upload-box .message').text('You have to upload a file').addClass('danger')
  } else {
    $(this).parents('.card').find('#fin-delivery-tab, #cash-delivery-tab').removeAttr('disabled').trigger('click');
    $(this).parents('.card').find('#app-tab, #ID-tab').addClass('completed');
    $(window).scrollTop(0)
  }
});

// Move to next step when submitting the "Delivery" Form
$('form#delivery').on('submit', function(e) {
  e.preventDefault();
  $(this).parents('.card').find('#document-tab, #checkout-tab').removeAttr('disabled').trigger('click');
  $(this).parents('.card').find('#fin-delivery-tab, #cash-delivery-tab').addClass('completed');
  $(window).scrollTop(0)
});

// Move to next step when submitting the "Delivery" Form
$('form#delivery select').on('change', function(e) {
  $('span[data-value=delivery-cost]').text($(this).find('option:selected').attr('data-cost'))
});

// Hide Contact address form if it'sidentical to billing address at "My Profie" page
$('#billing-info #contact-address').on('input', function() {
  if($(this).attr('checked')) {
    $(this).parents('.contact-address').find('.form-group').removeClass('d-none')
    $(this).attr('checked', false)
  }else {
    $(this).parents('.contact-address').find('.form-group').addClass('d-none')
    $(this).attr('checked', 'checked')
  }
})

// Pick Delivery date slider on Desktop
const bookingWrapper = $('.booking-wrapper');
const bookingDayColWidth = $('.booking-wrapper .booking-day').innerWidth() + 10;
const wrapperWidth   = $('.booking-wrapper').innerWidth() + 30

// Pick delivery date slider on Mobile
if(window.innerWidth < 767) {

  // const wrapperWidth   = $('.booking-wrapper').innerWidth()
  // //On Mobile 
  // $('#track-order .navigation button').each(function() {
  //   $(this).click(function() {
  //     //identify which button you click on
  //     if($(this).hasClass('later')) {
  //       // If wrapper in phase #1
  //       if(bookingWrapper.attr('data-phase') == '1') {
  //         bookingWrapper.css('transform', `translateX(-${2 * bookingDayColWidth}px)`);
  //         // switch to phase 2
  //         bookingWrapper.attr('data-phase', '2')
  //         //Enable "Earlier" button
  //         $('#track-order .navigation button.earlier').attr('disabled', false)
  //         // If wrapper in phase #2
  //       } else if (bookingWrapper.attr('data-phase') == '2') {
  //         bookingWrapper.css('transform', `translateX(-${4 * bookingDayColWidth}px)`);
  //         // switch to phase 3
  //         bookingWrapper.attr('data-phase', '3')
  //         // If wrapper in phase #3
  //       } else if (bookingWrapper.attr('data-phase') == '3') {
  //         bookingWrapper.css('transform', `translateX(-${6 * bookingDayColWidth}px)`);
  //         // switch to phase 4
  //         bookingWrapper.attr('data-phase', '4')
  //       } else if (bookingWrapper.attr('data-phase') == '4') {
  //         bookingWrapper.css('transform', `translateX(-${8 * bookingDayColWidth}px)`);
  //         // switch to phase 5
  //         bookingWrapper.attr('data-phase', '5')
  //       } else if (bookingWrapper.attr('data-phase') == '5') {
  //         bookingWrapper.css('transform', `translateX(-${(10 * bookingDayColWidth) - 80}px)`);
  //         // switch to phase 6
  //         bookingWrapper.attr('data-phase', '6')
  //       }
  //     }

  //     if($(this).hasClass('earlier')) {
  //       // If wrapper in phase #1
  //       if(bookingWrapper.attr('data-phase') == '3') {
  //         bookingWrapper.css('transform', `translateX(-${wrapperWidth}px)`);
  //         // switch to phase 2
  //         bookingWrapper.attr('data-phase', '2')
  //         //Enable "Earlier" button
  //         $('#track-order .navigation button.later').attr('disabled', false)
  //         // If wrapper in phase #2
  //       } else if (bookingWrapper.attr('data-phase') == '2') {
  //         bookingWrapper.css('transform', `translateX(-${0*wrapperWidth}px)`);
  //         // switch to phase 2
  //         bookingWrapper.attr('data-phase', '1')
  //         //Enable "Earlier" button
  //         $('#track-order .navigation button.earlier').attr('disabled', true)
  //       }
  //     }
  //   })
  // })
} else {
  $('html[dir=ltr] #track-order .navigation button').each(function() {
    $(this).click(function() {
      //identify which button you click on
      if($(this).hasClass('later')) {
        // If wrapper in phase #1
        if(bookingWrapper.attr('data-phase') == '1') {
          bookingWrapper.css('transform', `translateX(-${wrapperWidth}px)`);
          // switch to phase 2
          bookingWrapper.attr('data-phase', '2')
          //Enable "Earlier" button
          $('html[dir=ltr] #track-order .navigation button.earlier').attr('disabled', false)
          // If wrapper in phase #2
        } else if (bookingWrapper.attr('data-phase') == '2') {
          bookingWrapper.css('transform', `translateX(-${2*wrapperWidth}px)`);
          // switch to phase 2
          bookingWrapper.attr('data-phase', '3')
          //Enable "Earlier" button
          $('html[dir=ltr] #track-order .navigation button.later').attr('disabled', true)
        }
      }

      if($(this).hasClass('earlier')) {
        // If wrapper in phase #1
        if(bookingWrapper.attr('data-phase') == '3') {
          bookingWrapper.css('transform', `translateX(-${wrapperWidth}px)`);
          // switch to phase 2
          bookingWrapper.attr('data-phase', '2')
          //Enable "Earlier" button
          $('html[dir=ltr] #track-order .navigation button.later').attr('disabled', false)
          // If wrapper in phase #2
        } else if (bookingWrapper.attr('data-phase') == '2') {
          bookingWrapper.css('transform', `translateX(-${0*wrapperWidth}px)`);
          // switch to phase 2
          bookingWrapper.attr('data-phase', '1')
          //Enable "Earlier" button
          $('html[dir=ltr] #track-order .navigation button.earlier').attr('disabled', true)
        }
      }
    })
  })
  // Arabic Version
  $('html[dir=rtl] #track-order .navigation button').each(function() {
    $(this).click(function() {
      //identify which button you click on
      if($(this).hasClass('later')) {
        // If wrapper in phase #1
        if(bookingWrapper.attr('data-phase') == '1') {
          bookingWrapper.css('transform', `translateX(${wrapperWidth}px)`);
          // switch to phase 2
          bookingWrapper.attr('data-phase', '2')
          //Enable "Earlier" button
          $('html[dir=rtl] #track-order .navigation button.earlier').attr('disabled', false)
          // If wrapper in phase #2
        } else if (bookingWrapper.attr('data-phase') == '2') {
          bookingWrapper.css('transform', `translateX(${2*wrapperWidth}px)`);
          // switch to phase 2
          bookingWrapper.attr('data-phase', '3')
          //Enable "Earlier" button
          $('html[dir=rtl] #track-order .navigation button.later').attr('disabled', true)
        }
      }

      if($(this).hasClass('earlier')) {
        // If wrapper in phase #1
        if(bookingWrapper.attr('data-phase') == '3') {
          bookingWrapper.css('transform', `translateX(${wrapperWidth}px)`);
          // switch to phase 2
          bookingWrapper.attr('data-phase', '2')
          //Enable "Earlier" button
          $('html[dir=rtl] #track-order .navigation button.later').attr('disabled', false)
          // If wrapper in phase #2
        } else if (bookingWrapper.attr('data-phase') == '2') {
          bookingWrapper.css('transform', `translateX(${0*wrapperWidth}px)`);
          // switch to phase 2
          bookingWrapper.attr('data-phase', '1')
          //Enable "Earlier" button
          $('html[dir=rtl] #track-order .navigation button.earlier').attr('disabled', true)
        }
      }
    })
  })
}

$(window).resize(function() {
  if($(this).innerWidth >= 768) {
    bookingWrapper.css('transform', 'translateX()')
    $('#track-order .navigation button').each(function() {
      $(this).click(function() {
        //identify which button you click on
        if($(this).hasClass('later')) {
          // If wrapper in phase #1
          if(bookingWrapper.attr('data-phase') == '1') {
            bookingWrapper.css('transform', `translateX(-${wrapperWidth}px)`);
            // switch to phase 2
            bookingWrapper.attr('data-phase', '2')
            //Enable "Earlier" button
            $('#track-order .navigation button.earlier').attr('disabled', false)
            // If wrapper in phase #2
          } else if (bookingWrapper.attr('data-phase') == '2') {
            bookingWrapper.css('transform', `translateX(-${2*wrapperWidth}px)`);
            // switch to phase 2
            bookingWrapper.attr('data-phase', '3')
            //Enable "Earlier" button
            $('#track-order .navigation button.later').attr('disabled', true)
          }
        }

        if($(this).hasClass('earlier')) {
          // If wrapper in phase #1
          if(bookingWrapper.attr('data-phase') == '3') {
            bookingWrapper.css('transform', `translateX(-${wrapperWidth}px)`);
            // switch to phase 2
            bookingWrapper.attr('data-phase', '2')
            //Enable "Earlier" button
            $('#track-order .navigation button.later').attr('disabled', false)
            // If wrapper in phase #2
          } else if (bookingWrapper.attr('data-phase') == '2') {
            bookingWrapper.css('transform', `translateX(-${0*wrapperWidth}px)`);
            // switch to phase 2
            bookingWrapper.attr('data-phase', '1')
            //Enable "Earlier" button
            $('#track-order .navigation button.earlier').attr('disabled', true)
          }
        }
      })
    })
  } else {
    bookingWrapper.css('transform', 'translateX(0)')
  }
})

//Pick delivery date slider on mobile
try {
  document.querySelector('#booking').addEventListener('scroll', function() {
    let secondChild = this.firstElementChild.firstElementChild.nextElementSibling;
    let parentPos  = this.getBoundingClientRect();
    let secChildPos   = secondChild.getBoundingClientRect(); 

    let secondChildPosLeft = secChildPos.left - parentPos.left;
    if(secondChildPosLeft < 10) {
      $('#track-order .navigation button.earlier').attr('disabled', false)
    } else {
      $('#track-order .navigation button.earlier').attr('disabled', true)
    }
    
  })
} catch (error) {
  console.error(error);
}

// Set active class to the selected time and unselect others
$('#booking .time').click(function(e) {
  $('#booking .time').removeClass('active');
  $(e.target).addClass('active');
  $('.navigation .months').text($(e.target).attr('aria-date'))
})

// Calculator Buttons toggle active class
$('.calculator_buttons .calc_btn').click(function(e) {
  $(e.target).addClass('active').siblings().removeClass('active')
  if($(this).hasClass('vehicle')) {
    $('.calculator #vehicle-price-slider ').css('display', 'none')
    $('.calculator #monthly-payment-slider ').css('display', 'inline-block')
    $('.vehicle-price .title').html('Monthly Payment')
    $('.estimated-title_word').html('Vehicle Price')
    $('html[dir=rtl] .vehicle-price .title').html('القسط الشهري')
    $('html[dir=rtl] .estimated-title_word').html('سعر السيارة')
    $('.card_estimated-title .final-result .val').html('20000')
    $('.vehicle-price .range-val').html($('.single-range-input.monthly').attr('data-value'))
  } else if ($(this).hasClass('monthly')) {
    $('.vehicle-price .title').html('Vehicle Price')
    $('.estimated-title_word').html('Monthly Payment')
    $('.card_estimated-title .final-result .val').html('250')
    $('html[dir=rtl] .vehicle-price .title').html('سعر السيارة')
    $('html[dir=rtl] .estimated-title_word').html('القسط الشهري')
    $('.calculator #vehicle-price-slider ').css('display', 'inline-block')
    $('.calculator #monthly-payment-slider ').css('display', 'none');
    $('.vehicle-price .range-val').html($('.single-range-input.vehicle').attr('data-value'))
  }
})

// Sync vehicle price with with results card
$('.single-range-input.vehicle').on('change', function() {
  $('.card_results #vehicle-price .val').html($(this).val())
})

$('.single-range-input.down-payment').on('change', function() {
  $('.card_results #down-payment .val').html($(this).val())
})

$('.single-range-input').on('change', function() {
  
  let final_result = parseInt($('.card_results #vehicle-price .val').html())  - parseInt($('.card_results #down-payment .val').html())
  $('.card_results #total-price .val').html(final_result);

})


// Changee finance-provider logos on Clalulator
$('select#finance-provider').on('change', function() {
  if($(this).val() == 'jabr') {
    $(this).attr('class', 'form-control jabr')
  } else if ($(this).val() == 'snb') {
    $(this).attr('class', 'form-control snb')
  } else if ($(this).val() == 'rajhi') {
    $(this).attr('class', 'form-control rajhi')
  }
});

//close menu when user click close icon
$('.navbar_close-icon').click(function() {
  $('.navbar-toggler').trigger('click')
});

// Close mobile menu when user click any where except inside the menu
$('.navbar-collapse').click(function(e) {
  $('.navbar-toggler').trigger('click');
  $('body, body .wrapper').css('overflow-y', 'auto')
})

$('.navbar-nav').click(function(e) {
    e.stopPropagation()
})

//close mobile menu when user clicks any link on the menu
$('.navbar-nav .nav-link:not(".dropdown-toggle")').click(function() {
  $('.navbar-toggler').trigger('click')
  $('body, body .wrapper').css('overflow-y', 'auto')
})

//set active class to nav-links when user clicks on it
$('.navbar-nav .nav-link:not(".info")').click(function() {
  $(this).addClass('active').parent().siblings().find('.nav-link').removeClass('active')
});

//stop scrolling-y when user opens the mobile menu
$('.navbar-toggler').click(function() {
  $('body, body .wrapper').css('overflow-y', 'hidden')
})

//copy link button change icon after clicked
$('.post_share-icons .copy-link').on('click', function() {
  $(this).addClass('checked')
  setTimeout(() => {
    $(this).removeClass('checked')
  },2000)
}) 


// ALYWAYS BE ON BOTTOM OF THE PAGE
// Initialize popovers
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

// // Initialise Carousel
const mainCarousel = new Carousel(document.querySelector("#mainCarousel"), {
  infinite: false,
  Navigation: false,
});

// Initialise Fancybox
Fancybox.bind('[data-fancybox="gallery"]', {
  Carousel: {
    on: {
      change: (carousel, to) => {
        // Sync Carousel slide
        // ===
        const $el = Fancybox.getInstance()
          .getSlide()
          .$trigger.closest(".carousel__slide");

        const slide = mainCarousel.slides.find((slide) => {
          return slide.$el === $el;
        });

        mainCarousel.slideTo(slide.index, {
          friction: 0,
        });
      },
    },
  },
});

