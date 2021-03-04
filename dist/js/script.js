'use strict'

window.addEventListener('DOMContentLoaded', function() {

    let deadLine = '2021-04-13'
    //slider
    let offset = 0;

    const slides = document.querySelectorAll('.reviews__item'),
        slidesWrapper = document.querySelector('.reviews__carousel'),
        slidesField = document.querySelector('.reviews__inner'),
        prev = document.querySelector('.reviews__prev'),
        next = document.querySelector('.reviews__next'),
        width = window.getComputedStyle(slidesWrapper).width;
    
    // slidesField.style.width = 100 * slides.length + '%';
    // slidesField.style.display = 'flex';
    slidesField.style.transition = '1s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    next.addEventListener('click', ()=>{
        if(offset == +width.slice(0, width.length - 2) * (slides.length - 1)){
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
    });

    prev.addEventListener('click', ()=>{
        if(offset == 0){
            offset = +width.slice(0, width.length - 2) * (slides.length - 1)
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
    });



    //timer
    const timer = (id, deadLine) => {
        function getTimeRemaining(endtime){
            const time = Date.parse(endtime)- Date.parse(new Date()),
                days = Math.floor(time / (1000 * 60 * 60 * 24)),
                hours = Math.floor((time / (1000 * 60 * 60) % 24)),
                minutes = Math.floor((time / 1000 / 60) % 60),
                seconds = Math.floor((time / 1000) % 60);
            return {
                'total': time,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        }
    
        function getZero(num) {
            if(num >=0 && num < 10) {
                return `0${num}`;
            } else {
                return num;
            }
        }
    
        function setClock(selector, endtime) {
            const timer = document.querySelector(selector),
                  days = timer.querySelector('#days'),
                  hours = timer.querySelector('#hours'),
                  minutes = timer.querySelector('#minutes'),
                  seconds = timer.querySelector('#seconds'),
                  timeInterval = setInterval(updateClock, 1000);
    
            updateClock();
    
            function updateClock() {
                const time = getTimeRemaining(endtime);
    
                days.innerHTML = getZero(time.days);
                hours.innerHTML =getZero(time.hours) ;
                minutes.innerHTML = getZero(time.minutes);
                seconds.innerHTML = getZero(time.seconds);
    
                if(time.total <= 0) {
                    days.innerHTML = "00";
                    hours.innerHTML = "00";
                    minutes.innerHTML = "00";
                    seconds.innerHTML = "00";
    
                    clearInterval(timeInterval);
                }
            }
        }
        setClock(id, deadLine);
    };

    timer('#timer', deadLine);

    //scrollToForm
    const buttons = document.querySelectorAll('.button'),
          form = document.querySelector('.order__form');

    for (let button of buttons){
        button.addEventListener('click', function(e){
            e.preventDefault();
            form.scrollIntoView({
                behavior: "smooth",
                block: 'start'
            })
        })
    }

});