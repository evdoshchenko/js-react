"use strict";

document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Tenet",
            "Matrix",
            "The Lobster",
            "Inception",
            "Joker"
        ]
    };

    const advs = document.querySelectorAll('.promo__adv img'),
        promo = document.querySelector('.promo__bg'),
        genre = promo.querySelector('.promo__genre');

    const addForm = document.querySelector('form.add'),
        inputFilm = addForm.querySelector('.adding__input'),
        favoriteFilmToggle = addForm.parentElement.querySelector('[type="checkbox"]'),
        movieList = document.querySelector('.promo__interactive-list');

    const deleteAdv = (adv) => {
        adv.forEach(item => {
            item.remove();
        });
        document.querySelector('.promo__adv-title').remove();
    }

    const makeChanges = () => {
        genre.textContent = 'drama'; 
        promo.style.backgroundImage = "url('img/bg.jpg')";
    };

    const sortArr = (arr) => {
        arr.sort();
    }

    function createList(movies, parent) {
        // movies.sort();
        sortArr(movies);

        parent.innerHTML = '';
        movies.forEach((item, index) => {
            parent.innerHTML += `<li class="promo__interactive-item">${index+1}. ${item}<div class="delete"></div></li>`;
        });

        const deleteButtons = document.querySelectorAll('.delete');
        deleteButtons.forEach( (cycle, i) => {
            cycle.addEventListener('click', () => {
                cycle.parentElement.remove();
                movieDB.movies.splice(i, 1);
                createList(movieDB.movies, movieList);
            });
        });
    }

    function confirmFilm() {
        addForm.addEventListener('submit', addingfilm);
    }

    const addingfilm = (e) => {
        e.preventDefault();
        let film = inputFilm.value.toUpperCase();
        if (film != '') {
            if (film.length > 21) {
                film = `${film.slice(0, 21)}...`;
            }
            if (favoriteFilmToggle.checked) {console.log('Favorite film added');}
            movieDB.movies.push(film);
            e.target.reset();
            createList(movieDB.movies, movieList);
        }
    };
 
    deleteAdv(advs);
    makeChanges();
    createList(movieDB.movies, movieList);
    confirmFilm();

});
