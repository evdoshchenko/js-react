import React, { Component } from 'react';
import {Button} from 'reactstrap';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';

export default class RandomPage extends Component {

    gotService = new gotService();

    state = {
        showRandomChar: true,
        error: false
    };

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    };

    render() {
        const char = this.state.showRandomChar ? <RandomChar interval={150000}/> : null;

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <div>
                <Button
                    className='toggle-btn'
                    onClick={this.toggleRandomChar}>Random character</Button>
                {char}
            </div>  
        )
    }
};


