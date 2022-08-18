
    getResource('http://localhost:3000/menu')
        .then(data => createElementWithoutTemplate(data));

    function createElementWithoutTemplate(data) {
        data.forEach(({img, altimg, title, descr, price}) => {
            const element = document.createElement('div');
            element.classList.add('menu__item');
            element.innerHTML = `
                <img src=${img} alt=${altimg}>
                <h3 class="menu__item-subtitle">${title}</h3>
                <div class="menu__item-descr">${descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Price:</div>
                    <div class="menu__item-total"><span>${price}</span> BTC</div>
                </div>
            `;

            document.querySelector('.menu .container').append(element);
        });
    }