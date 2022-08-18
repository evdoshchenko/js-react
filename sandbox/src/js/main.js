// exports require
{
    // main.js
    function myModule() {
    }
    module.exports = myModule;
    // script.js
    const myModule = require('./main');
}

// ES6 modules - export import 
{
    // main.js
    export let one = 1;
    let two = 2, three = 3
    export {two, three};
    export default function sayHi() {
        console.log('hi');
    }
    // scripts.js
    import {one as first, two} from './main';
    import * as data from './main';
    import sayHi from './main';
    console.log(`${first} and ${two} and ${data.three}`);
    sayHi();
}

