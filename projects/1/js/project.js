"use strict";
// let numberOfFilms = '';

const personalMovieDB = {
    count: '',
    movies: {},
    actors: {},
    genres: [],
    private: true,
    start: function () {
        while ( personalMovieDB.count == "" || personalMovieDB.count == null || isNaN(personalMovieDB.count) ) {
            personalMovieDB.count = +prompt('Number films', '');
        }
    },
    rememberMyFIlms: function() {
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
    },
    detectPersonalLevel: function () {
        if (personalMovieDB.count > 30) {
            console.log('cinimalover');
        } else if (personalMovieDB.count > 10) {
            console.log('classical'); 
        } else if (personalMovieDB.count > 0) {
            console.log('not enough');
        } else {
            console.log('error');
        }
    },
    showMyDB: function (dataBase) {
        if (!dataBase.private) {
            console.log(dataBase);
        }
    },
    writeYourGenres: function() {
        for (let i = 0; i < 3; i++) {
            while ( personalMovieDB.genres[i] == '' || personalMovieDB.genres[i] == null ) {
                personalMovieDB.genres[i] = prompt(`favorite genre ${i+1}`, '');
            }
        }
        personalMovieDB.genres.forEach( function(item,index,arr) {
            console.log(`Favorite genre ${index+1} is ${item}`);
        }); 
    },
    toggleVisibleMyDB: function(dataBase) {
        if (dataBase.private) {
            dataBase.private = false;
        } else {
            dataBase.private = true;
        }
    }
};


personalMovieDB.start(); 
personalMovieDB.rememberMyFIlms();
personalMovieDB.detectPersonalLevel();
personalMovieDB.writeYourGenres();
personalMovieDB.toggleVisibleMyDB(personalMovieDB);
personalMovieDB.showMyDB(personalMovieDB);

   