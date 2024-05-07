/**
* Template Name: Personal
* Updated: Sep 18 2023 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '#navbar .nav-link', function(e) {
    let section = select(this.hash)
    if (section) {
      e.preventDefault()

      let navbar = select('#navbar')
      let header = select('#header')
      let sections = select('section', true)
      let navlinks = select('#navbar .nav-link', true)

      navlinks.forEach((item) => {
        item.classList.remove('active')
      })

      this.classList.add('active')

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top')
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function() {
          sections.forEach((item) => {
            item.classList.remove('section-show')
          })
          section.classList.add('section-show')

        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        section.classList.add('section-show')
      }

      scrollto(this.hash)
    }
  }, true)

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash)

      if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)

        header.classList.add('header-top')

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })

        setTimeout(function() {
          initial_nav.classList.add('section-show')
        }, 350);

        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });


// model dialog
// JavaScript to handle the modal

function setupModal(openButton, modal, closeButton, modalContent) {
  openButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default behavior of anchor links
    modal.style.display = "block";

    setTimeout(() => {
      modalContent.style.opacity = "1";
      modalContent.style.transform = "scale(0.9)";
    }, 100);
  });

  closeButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Stop the event propagation
    modalContent.style.opacity = "0.5";
    modalContent.style.transform = "scale(0.9)";

    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      event.stopPropagation(); // Stop the event propagation
      modalContent.style.opacity = "0";
      modalContent.style.transform = "scale(0.9)";

      setTimeout(() => {
        modal.style.display = "none";
      }, 300);
    }
  });
}

// ---------------Technical Writing Modal------------
const openModalTW = document.getElementById("openModalTW");
const modalTW = document.getElementById("myModalTW");
const closeModalTW = document.getElementById("closeModalTW");
const modalContentTW = document.querySelector(".modal-content");
setupModal(openModalTW, modalTW, closeModalTW, modalContentTW);

// ---------------Machine Learning Modal------------
const openModalML = document.getElementById("openModalML");
const modalML = document.getElementById("myModalML");
const closeModalML = document.getElementById("closeModalML");
const modalContentML = document.querySelector(".modal-content");
setupModal(openModalML, modalML, closeModalML, modalContentML);

// ---------------Computer Vision Modal------------
const openModalCV = document.getElementById("openModalCV");
const modalCV = document.getElementById("myModalCV");
const closeModalCV = document.getElementById("closeModalCV");
const modalContentCV = document.querySelector(".modal-content");
setupModal(openModalCV, modalCV, closeModalCV, modalContentCV);

// ---------------Data Analysis Modal------------
const openModalDA = document.getElementById("openModalDA");
const modalDA = document.getElementById("myModalDA");
const closeModalDA = document.getElementById("closeModalDA");
const modalContentDA = document.querySelector(".modal-content");
setupModal(openModalDA, modalDA, closeModalDA, modalContentDA);

// ---------------MATLAB/SIMULINK Modal------------
const openModalMS = document.getElementById("openModalMS");
const modalMS = document.getElementById("myModalMS");
const closeModalMS = document.getElementById("closeModalMS");
const modalContentMS = document.querySelector(".modal-content");
setupModal(openModalMS, modalMS, closeModalMS, modalContentMS);

// ---------------Python Programming Modal------------
const openModalPY = document.getElementById("openModalPY");
const modalPY = document.getElementById("myModalPY");
const closeModalPY = document.getElementById("closeModalPY");
const modalContentPY = document.querySelector(".modal-content");
setupModal(openModalPY, modalPY, closeModalPY, modalContentPY);

// ---------------PCB Modal------------
const openModalPCB = document.getElementById("openModalPCB");
const modalPCB = document.getElementById("myModalPCB");
const closeModalPCB = document.getElementById("closeModalPCB");
const modalContentPCB = document.querySelector(".modal-content");
setupModal(openModalPCB, modalPCB, closeModalPCB, modalContentPCB);

// ---------------Electrical Engineering Modal------------
const openModalEE = document.getElementById("openModalEE");
const modalEE = document.getElementById("myModalEE");
const closeModalEE = document.getElementById("closeModalEE");
const modalContentEE = document.querySelector(".modal-content");
setupModal(openModalEE, modalEE, closeModalEE, modalContentEE);

// ---------------IOT Modal------------
const openModalIOT = document.getElementById("openModalIOT");
const modalIOT = document.getElementById("myModalIOT");
const closeModalIOT = document.getElementById("closeModalIOT");
const modalContentIOT = document.querySelector(".modal-content");
setupModal(openModalIOT, modalIOT, closeModalIOT, modalContentIOT);

// ---------------IT Modal------------
const openModalIT = document.getElementById("openModalIT");
const modalIT = document.getElementById("myModalIT");
const closeModalIT = document.getElementById("closeModalIT");
const modalContentIT = document.querySelector(".modal-content");
setupModal(openModalIT, modalIT, closeModalIT, modalContentIT);

// end
  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()
