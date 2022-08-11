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

    window.addEventListener('scroll', showModalByScroll);   //  {once: true} not work

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

    new MenuCard(
        "img/tabs/vegy.jpg",
        "nft standart",
        'NFT Standart',
        'Est sint culpa commodo ex cillum. Incididunt amet veniam eu officia quis consequat irure deserunt sunt elit nisi. Voluptate excepteur cupidatat ut cupidatat laborum occaecat fugiat. Esse nulla sit ad in. Tempor ipsum aliquip nulla voluptate',
        2300,
        '.menu .container'
        // 'menu__item',   // if rest - default correction
        // 'big'
    ).render();

    new MenuCard(
        "img/tabs/vegy.jpg",
        "nft plus",
        'NFT Plus',
        'Occaecat non ullamco eu commodo nisi irure qui amet labore quis elit labore laborum. Esse nulla sit ad in. Tempor ipsum aliquip nulla laboris officia pariatur occaecat officia. Lorem voluptate deserunt adipisicing  mollit aliqua laboris ',
        4600,
        '.menu .container',
        'menu__item',
        'big'
    ).render();

    new MenuCard(
        "img/tabs/vegy.jpg",
        "nft gold",
        'NFT Gold',
        'Dolore mollit sit in mollit et. Excepteur qui non do Lorem ullamco occaecat irure in exercitation anim minim Lorem. Elit non ut deserunt irure. Deserunt nulla minim incididunt fugiat consectetur sit ullamco anim enim et. Aute ut est consectetur nisi.',
        9200,
        '.menu .container',
        'menu__item',
        'big'
    ).render();

    // forms

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

            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });
            postData('http://localhost:3000/requests', JSON.stringify(object))
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
        }, 4000);
    }

});