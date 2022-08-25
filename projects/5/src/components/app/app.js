import React, { Component } from 'react';
import ErrorMessage from '../errorMessage';
import { CharacterPage, BooksPage, HousesPage, WelcomePage, BookItem , Layout} from '../Pages';
import { Routes, Route } from 'react-router-dom';

import './app.css'

export default class App extends Component {

    state = {
        error: false
    };

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage/>
        }
        
        return (
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<WelcomePage/>}/>
                    <Route path='characters' element={<CharacterPage/>}/>§
                    <Route path='houses' element={<HousesPage/>}/>
                    <Route path='books' element={<BooksPage/>}/>
                    <Route path='books/:id' element={<BookItem/>}/>
                </Route>
            </Routes>
        )
    }
};
