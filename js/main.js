'use strict';

window.addEventListener("DOMContentLoaded", () => {
    // Плавная прокрутка
    const scrolling = (el) => {
      if (el.href === undefined) return;
      let link = el.href.split('#')[1];
      document.querySelector('#'+link).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    };

  // таймер
  function countTimer() {
    let timerHours = document.querySelector('#timer-hours');
    let timerMinutes = document.querySelector('#timer-minutes');
    let timerSeconds = document.querySelector('#timer-seconds');
    
    function getTimeRemaning(){
      let now = new Date();    
      let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1);
      let timeRemaining = (tomorrow - now) / 1000;

      let seconds = Math.floor(timeRemaining % 60);
      let minutes = Math.floor((timeRemaining / 60) % 60);
      let hours = Math.floor(timeRemaining / 60 / 60);
      return {timeRemaining, hours, minutes, seconds};
    }

    getTimeRemaning();
    function formatTime(data) {
      if (data < 10) {
        data = '0' + data;
      }
      return data;
    }

    setInterval( () => {    
      let timer = getTimeRemaning();
      timerHours.textContent = formatTime(timer.hours);
      timerMinutes.textContent = formatTime(timer.minutes);
      timerSeconds.textContent = formatTime(timer.seconds);
    }, 1000);

  }
  countTimer();


  // меню
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu');
    const menu = document.querySelector('menu');
    
    let count = -100;
    const animate = () => {
        if (document.documentElement.clientWidth < 768) {
            menu.style.transform = `translate(0)`;
            return;
        }
        let requestId = requestAnimationFrame(animate);
        count += 2;
        menu.style.transform = `translate(${count}%)`;
        if (count === 0) {
            cancelAnimationFrame(requestId);
        }
    };

    const handlerMenu = (evt) => {
        evt.preventDefault();
        let target = evt.target;

        if (target.closest('.menu') === null && target.closest('menu') === null) {
          menu.style.transform = `translate(-100%)`;
          return;  
        }

        if (target.tagName === 'A' && target.className !== 'close-btn') {
          scrolling(target);          
        }
        
        if (!menu.style.transform || menu.style.transform === `translate(-100%)`){
          count = -100;
          animate();         
        } else {                      
          if (target.tagName === 'A' || target.closest('.menu')) {            
            menu.style.transform = `translate(-100%)`;
          }
        }  
    };

    document.body.addEventListener('click', (event) => {
      handlerMenu(event);
    });
  };
  toggleMenu();
 

 // popup
  const togglePopup = () => {
    const popup = document.querySelector('.popup');
    const popupBtn = document.querySelectorAll('.popup-btn');

    popupBtn.forEach(el => {
        el.addEventListener('click', () => {
            popup.style.display = 'block';
        });
    });

    popup.addEventListener('click', (event) => {
      let target = event.target;

      if (target.classList.contains('popup-close')) {
        popup.style.display = 'none';
      } else {
        target = target.closest('.popup-content');
        if (!target) {
          popup.style.display = 'none';
        }
      } 
    });
  };
  togglePopup();

  // Плавная прокрутка
  const scrolHead = () => {
    const btnScrolling = document.querySelector('a[href="#service-block"]');
    btnScrolling.addEventListener('click', (evt) => {
        evt.preventDefault();
        scrolling(btnScrolling);
    });
  };
  scrolHead();

  // табы
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header');
    const tab = tabHeader.querySelectorAll('.service-header-tab');
    const tabContent = document.querySelectorAll('.service-tab');

    const ToggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };

    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
      target = target.closest('.service-header-tab');
        if (target.classList.contains('service-header-tab')) {
          tab.forEach((item, i) => {
            if (item === target) {
              ToggleTabContent(i);
            }
          });
        }
    });

  };
  tabs();

  // слайдер  portfolio-item-active
  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item');
    const btn = document.querySelectorAll('.portfolio-btn');
    const dots = document.querySelector('.portfolio-dots');
    const slider = document.querySelector('.portfolio-content');
    
    for (let i = 0; i < slide.length; i++) {
      dots.insertAdjacentHTML('beforeend', 
      `<li class="dot ${i === 0 ? 'dot-active' : ''}"></li>`);
    }
    const dot = document.querySelectorAll('.dot');


    let currentSlide = 0;
    let interval;
    const prewSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      
      
      prewSlide(slide, currentSlide, 'portfolio-item-active');
      prewSlide(dot, currentSlide, 'dot-active');

      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 15000) => {
      interval = setInterval(autoPlaySlide, time);
    };
    
    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (evt) => {
      evt.preventDefault();
      let target = evt.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }
      prewSlide(slide, currentSlide, 'portfolio-item-active');
      prewSlide(dot, currentSlide, 'dot-active');

        if (target.matches('#arrow-right')) {
          currentSlide++;
        } else if (target.matches('#arrow-left')) {
          currentSlide--;
        } else if (target.matches('.dot')) {
          dot.forEach((elem, index) => {
            if (elem === target) {
              currentSlide = index;
            }
            
          });
          
        }
          if (currentSlide >= slide.length) {
            currentSlide = 0;
          }

          if (currentSlide < 0) {
            currentSlide = slide.length - 1;
          }
        nextSlide(slide, currentSlide, 'portfolio-item-active');
        nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', (evt) => {
      if (evt.target.matches('.portfolio-btn') || evt.target.matches('.dot')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', (evt) => {
      if (evt.target.matches('.portfolio-btn') || evt.target.matches('.dot')) {
        startSlide();
      }
    });

    // startSlide(1000);
  };
  slider();
});
