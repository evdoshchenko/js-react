"use sctrict";
let numberOfFilms = '';


function start() {
    while ( numberOfFilms == "" || numberOfFilms == null || isNaN(numberOfFilms)) {
        numberOfFilms = +prompt('Number films', '');
    }
}

start();

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    private: true
};

function rememberMyFIlms() {
    for (let i = 0; i < 2; i++) {
        let a = '';
        let b = '';
        while ((a == '') || (a.length > 50) || (a == null)) {
            a = prompt('last film','');
        }
        while ((b == '') || (b.length > 50) || (a == null)) {
            b = prompt('score','');
        }
        personalMovieDB.movies[a] = b;
    }
}

rememberMyFIlms();

function detectPersonalLevel () {
    if (personalMovieDB.count > 30) {
        console.log('cinimalover');
    } else if (personalMovieDB.count > 10) {
        console.log('classical'); 
    } else if (personalMovieDB.count > 0) {
        console.log('not enough');
    } else {
        console.log('error');
    }
}

detectPersonalLevel();

function showMyDB(dataBase) {
    if (!dataBase.private) {
        console.log(dataBase);
    }
}
writeYourGenres();
showMyDB(personalMovieDB);

function writeYourGenres() {
    for (let i = 0; i < 3; i++) {
        personalMovieDB.genres[i] = prompt(`favorite genre ${i+1}`, '');
    }
}