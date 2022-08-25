import React, { Component } from 'react';
import ItemDetails, { Field } from '../itemDetails';
import gotService from '../../services/gotService';

export default class BooksItem extends Component {

    state = {
        selectedBook: 1
    }

    componentDidMount() {
        this.updateItem();
    }

    updateItem() {
        const {id} = this.props;
        console.log(id);
        if (!id) {
            return;
        }

        this.setState({selectedBook: id});
    }
        
    gotService = new gotService();

    render() {
        return (
            <ItemDetails 
                getData={this.gotService.getBook}
                itemId={this.state.selectedBook}>
                    <Field field='numberOfPages' label='Number Of Pages'/>
                    <Field field='publisher' label='Publisher'/>
                    <Field field='released' label='Released'/>
            </ItemDetails>
        )
    }
}