"use sctrict";

// actions with elements
{
    
}
const box = document.getElementById('box'),
      btns = document.getElementsByTagName('button'),
      circles = document.getElementsByClassName('circle'),
      wrapper = document.querySelector('.heart'),
      hearts = document.querySelectorAll('.heart'),
      firstHeart = document.querySelector('.heart');

const dynamicWidth = '50%';
box.style.cssText = `width: ${dynamicWidth}; border-radius: 5px;`;

box.style.background = 'green';
btns[1].style.borderRadius = '100%';
circles[1].style.margin = '50px';

// for (let i = 0; i < hearts.length; i++) {    // old
//     hearts[i].style.background = 'pink';
// }
hearts.forEach(item => {
    item.style.margin = '20px';
});

// const text = document.createTextNode('Test');
const div = document.createElement('div');
div.classList.add('black');
document.body.append(div);
// document.body.prepend(div);
// document.querySelector('.wrapper').append(div);
// hearts[0].after(div);
// circles[1].remove();
// hearts[0].replaceWith(circles[1]);

// old
// document.querySelector('.wrapper').appendChild(div); 
// document.querySelector('.wrapper').insertBefore(div, hearts[2]);
// document.querySelector('.wrapper').removeChild(hearts[1]);
// document.querySelector('.wrapper').replaceChild(circles[0], hearts[0]);

div.innerHTML = "<h1>Hello</h1>";
// div.textContent = "Hi";
div.insertAdjacentHTML('beforebegin', '<h2>Ola!</h2>');
div.insertAdjacentHTML('afterend', '<h2>Ola-la!</h2>');

