import React, { Component } from 'react';
import ItemList from '../itemList';
import ItemDetails, { Field } from '../itemDetails';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';
import RowBlock from '../rowBlock';

export default class HousePage extends Component {

    gotService = new gotService();

    state = {
        selectedHouse: 1,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedHouse: id
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
                <h4>Houses</h4>
                <ItemList 
                    onItemSelected={this.onItemSelected}
                    getData={this.gotService.getAllHouses}
                    renderItem={({name}) => name}/>  
            </div>  
        )

        const itemDetails = (
            <ItemDetails 
                getData={this.gotService.getHouse}
                itemId={this.state.selectedHouse}>
                    <Field field='region' label='Region'/>
                    <Field field='words' label='Words'/>
                    <Field field='titles' label='Titles'/>
                    <Field field='overload' label='Overload'/>
                    <Field field='ancestralWeapons' label='Ancestral Weapons'/>
            </ItemDetails>
        )
        
        return (
            <RowBlock left={itemList} right={itemDetails}/>
        )

    }
}