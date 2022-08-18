import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
    //forms

    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'thank you!',
        failure: 'error'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

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
        openModal('.modal', modalTimerId);
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
            closeModal('.modal');
        }, 40000);
    }
}

export default forms;