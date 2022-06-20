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
  let intialVal = $(this).parent().siblings('input[type=range]').val();
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
    $(this).removeClass('active')
  } else {
    $(this).find('input').attr('checked', 'checked');
    $(this).addClass('active')
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
  if($(this).scrollTop() >= $('#hero h3').offset().top - 1) {
    $('#vehicle-nav').addClass('show')
  } else {
    $('#vehicle-nav').removeClass('show')
  }

  // Show/hide sticky "Purchase" button
  if($(window).scrollTop() >= ( $('#calc-payment').offset().top -500) ) {
    $('#car-details #calc-payment .calc-result').addClass('show')
  } else {
    $('#car-details #calc-payment .calc-result').removeClass('show')
  }
});

// Select between Finance Providers 
$('.providers li').click( function() {
  $(this).addClass('active').siblings().removeClass('active');
  let dataMonthly = $(this).attr('data-monthly');
  let dataCash = $(this).attr('data-cash');
  $(this).parent().siblings('.card').find('input#monthly-payment, input#monthly-range').val(dataMonthly)
  $(this).parent().siblings('.card, .calc-result').find('span[data-value=monthly-value]').text(dataMonthly);
  $(this).parent().siblings('.card').find('input#cash-down, input#cash-range').val(dataCash)
  $(this).parent().siblings('.card').find('span#cash-value').text(dataCash)
})

//check tabs when submitting the form on the modal
$('.modal form').submit(function (e) { 
  e.preventDefault();
  $(this).find('[aria-label="Close"]').trigger('click');
  let modalTab = $(`[name=${$(this).attr('data-check')}]`);
  modalTab.addClass('checked');
  modalTab.removeClass('danger');
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
$('#payment-process .modal input[type=checkbox], #payment-process .modal input[type=radio]').on('input', function() {
  $(this).parents('label').toggleClass('checked')
})


//show alert if the user didn't select a delivery location
$(' [data-role=purchase]').click(function() {
  if($('.calc-tabs input#calc-delivery').hasClass('checked')) {
    $('.vehicle-info li[data-value=delivery-cost] .value, .calc-tabs input[id=calc-delivery]').removeClass('danger')
  } else {
    $('.vehicle-info li[data-value=delivery-cost] .value, .calc-tabs input[id=calc-delivery]').addClass('danger')
  }

})

// ALYWAYS BE ON BOTOM OF THE PAGE
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