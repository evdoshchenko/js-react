export default class GoTService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api'
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`)
        }
        return await res.json();
    }

    getAllBooks = async () => {
        const res = await this.getResource('/books/');
        return res.map(this._transformBook);
    }
    getBook = async (id) => {
        const book = await this.getResource(`/books/${id}/`);
        return this._transformBook(book);
    }
    getAllCharacters = async () => {
        const res = await this.getResource('/characters?page=5&pageSize=10/');
        return res.map(this._transformCharacter)
    }
    getCharacter = async (id) => {
        const character = await this.getResource(`/characters/${id}/`);
        return this._transformCharacter(character);
    }
    getAllHouses = async () => {
        const res = await this.getResource('/houses/');
        return res.map(this._transformHouse);
    }
    getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}/`);
        return this._transformHouse(house);
    } 

    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)$/;
        return item.url.match(idRegExp)[1];
    }

    _transformCharacter(char) {
        return {
            id: char.url.match(/\d+/g)[0],
            name: char.name || '-',
            gender: char.gender || '-',
            born: char.born || '-',
            died: char.died || '-',
            culture: char.culture || '-',
            playedBy: char.playedBy || '-',
        }
    }

    _transformHouse(house){
        return {
            id: house.url.match(/\d+/g)[0],
            name: house.name || '-',
            region:  house.region || '-',
            words: house.words || '-',
            titles:  house.titles  || '-',
            overload:  house.overload  || '-',
            ancestralWeapons: house.ancestralWeapons  || '-',
        }
    }

    _transformBook(book) {
        return {
            id: book.url.match(/\d+/g)[0],
            name: book.name || '-',
            numberOfPages: book.numberOfPages || '-',
            publisher: book.publisher || '-',
            released: book.released || '-'
        }
    }
}

// const got = new GoTService();

// got.getAllCharacters()
//     .then(res => res.forEach((item) => console.log(item.name)));
    
// got.getCharacter(245)
//     .then(res => console.log(res));
