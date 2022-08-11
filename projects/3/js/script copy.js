"use strict";

window.addEventListener('DOMContentLoaded', () => {

    // tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            // item.style.display = 'none';
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {    // standard value
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent(1);

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // timer

    const deadline = '2022-08-02';
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse( new Date()),
              days    = Math.floor((t / (1000 * 60 * 60 * 24))),
              hours   = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / (1000 * 60)) % 60),
              seconds = Math.floor((t / (1000)) % 60);
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
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
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    
    setClock('.timer', deadline);

    // modal

    const modalTrigger = document.querySelectorAll('[data-modal'),
          modal = document.querySelector('.modal');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden'; // stop scrolling
        clearInterval(modalTimerId);
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });
    
    function closeModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = '';
    }

    modal.addEventListener('click', (e) => {  // back close
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {  // event code button
        if (e.code === 'Escape' && modal.classList.contains('show')) { 
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 500000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    // window.addEventListener('scroll', showModalByScroll);   //  {once: true} not work

    // classes for cards

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 23000;
            this.changeToBTC();
        }

        changeToBTC() {
            this.price =  this.price / this.transfer ;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) { 
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Price:</div>
                    <div class="menu__item-total"><span>${this.price}</span> BTC</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    const getResource = async (url) => {
        const res = await fetch (url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    getResource('http://localhost:3000/menu')   // without contructor - 02_createElementWithoutTemplate.js
        .then(data => {                         // using the library Axios - 03_axios
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    // classes for slider

    const slider = document.querySelectorAll('.offer .container')[1];

    class Slider {
        constructor(img, alt, current, total, ...classes) {
            this.img = img;
            this.alt = alt;
            this.current = current;
            this.total = total;
            this.classes = classes;
            // this.parent = document.querySelectorAll(parentSelector);
        }

        render() {
            console.log('1');
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'offer__slider';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML =`
                <div class="offer__slider-counter">
                    <div class="offer__slider-prev" data-slider-prev>
                        <img src="icons/left.svg" alt="prev">
                    </div>
                    <span id="current">${this.current}</span>
                    /
                    <span id="total">${this.total}</span>
                    <div class="offer__slider-next" data-slider-next>
                        <img src="icons/right.svg" alt="next">
                    </div>
                </div>
                <div class="offer__slider-wrapper">
                    <div class="offer__slide">
                        <img src="${this.img}" alt="${this.alt}">
                    </div>
                </div>
            `;
            // console.log(parent);
            slider.append(element);
        }
    }


    
    getResource('http://localhost:3000/slider')
        .then(data => {

            // for (let i = 0; i < data.length; i++) {

            // }
            new Slider(data[0].img, data[0].alt, 0+1, data.length).render();
        });

    slider.addEventListener('click', (e) => {
        let current = +slider.querySelector('#current').textContent,
            total = +slider.querySelector('#total').textContent,
            currentSlider = slider.querySelector('.offer__slider'),
            next = current,
            prev = current - 2;
        if (next == total) {next = 0;}
        if (current == 1) {prev = total-1;}
        if (e.target.getAttribute('data-slider-next') == ''){
            console.log('next');
            console.log(current);

            currentSlider.remove();
            getResource('http://localhost:3000/slider')
            .then(data => {
                new Slider(data[next].img, data[next].alt, next+1, data.length).render();
            });

        }
        if (e.target.getAttribute('data-slider-prev') == ''){
            console.log('prev');

            currentSlider.remove();
            getResource('http://localhost:3000/slider')
            .then(data => {
                new Slider(data[prev].img, data[prev].alt, prev+1, data.length).render();
            });
        }
        // if (e.target. == ''){
        //     console.log('next');
        // }
        // console.log(e.target);
    });    
    //forms

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'thank you!',
        failure: 'error'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch (url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    function bindPostData(form) {   // fetch   other way XMLHttpRequest in /other/XMLHttpRequest - postData(form)
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
            
            const formData = new FormData(form);

            //           json        <- object          <- array <- formdata
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {        // fetch 404... - not error
                showThanksModal(message.failure);
            }).finally(() =>{
                form.reset();
            }); 
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal();
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = ` 
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">1${message}</div>
            </div>
        `;
        console.log('1');
        document.querySelector('.modal').append(thanksModal);
        console.log('2');
        setTimeout(() => {
            thanksModal.remove();
            console.log('3');
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 400000);
    }

});