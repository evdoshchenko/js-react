function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.toggle('show');
    document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; // stop scrolling

    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function modal(triggersSelector, modalSelector, modalTimerId) {

    // modal

    const modalTrigger = document.querySelectorAll(triggersSelector),
          modal = document.querySelector(modalSelector);

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId)); // = openModal; without ()
    });

    modal.addEventListener('click', (e) => {  // back close
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {  // event code button
        if (e.code === 'Escape' && modal.classList.contains('show')) { 
            closeModal(modalSelector);
        }
    });



    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
}

export default modal;
export {closeModal};
export {openModal};