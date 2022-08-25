import React, { Component } from 'react';
import ItemList from '../itemList';
import ItemDetails, { Field } from '../itemDetails';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';
import RowBlock from '../rowBlock';

export default class BookPage extends Component {

    gotService = new gotService();

    state = {
        selectedBook: 1,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedBook: id
        })
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        const itemList = (
            <div className="pages rounded">
                <h4>Books</h4>
                <ItemList 
                    onItemSelected={this.onItemSelected}
                    getData={this.gotService.getAllBooks}
                    renderItem={({name}) => name}/>   
            </div> 
        )

        const itemDetails = (
            <ItemDetails 
                getData={this.gotService.getBook}
                itemId={this.state.selectedBook}>
                    <Field field='numberOfPages' label='Number Of Pages'/>
                    <Field field='publisher' label='Publisher'/>
                    <Field field='released' label='Released'/>
            </ItemDetails>
        )
        
        return (
            <RowBlock left={itemList} right={itemDetails}/>
        )

    }
}