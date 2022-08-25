import React, { Component } from 'react';
import ItemList from '../itemList';
// import CharDetails, { Field } from '../charDetails';
import ItemDetails, { Field } from '../itemDetails';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';
import RowBlock from '../rowBlock';

import './page.css'




export default class CharacterPage extends Component {

    gotService = new gotService();

    state = {
        selectedChar: 130,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedChar: id
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
                <h4>Characters</h4>
                <ItemList 
                    onItemSelected={this.onItemSelected}
                    getData={this.gotService.getAllCharacters}
                    renderItem={({name, gender}) => `${name} - ${gender}`}/>    
            </div>
        )

        const itemDetails = (
            <ItemDetails 
                getData={this.gotService.getCharacter}
                itemId={this.state.selectedChar}>
                    <Field field='gender' label='Gender'/>
                    <Field field='born' label='Born'/>
                    <Field field='died' label='Died'/>
                    <Field field='culture' label='Culture'/>
            </ItemDetails>
        )
        
        return (
            <RowBlock left={itemList} right={itemDetails}/>
        )

    }
}