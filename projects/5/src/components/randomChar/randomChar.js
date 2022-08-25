import React, { Component } from 'react';
import gotService from '../../services/gotService';
import { Spinner } from 'reactstrap';
import ErrorMessage from '../errorMessage';
import PropTypes from 'prop-types'

import './randomChar.css';

export default class RandomChar extends Component {

    gotService = new gotService();
    state = {
        char: {},
        loading: true,
        error: false
    }

    // static defaultProps = {
    //     interval: 20000
    // }

    componentDidMount() {
        this.updateCharacter();
        this.timerId = setInterval(this.updateCharacter, this.props.interval);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    onCharLoaded = (char) => { 
        this.setState({
            char,
            loading: false
        }) 
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        }) 
    }

    updateCharacter = () => {
        const id = Math.floor(Math.random() * 100) + 100;
        this.gotService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() {
        const { char, loading, error } = this.state

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}></View> : null;

        return (
            <div className="random-block rounded">
                {errorMessage}
                {spinner}
                {content}
                
            </div>
        );
    }
}

RandomChar.defaultProps = {
    interval: 22000
}

RandomChar.propTypes = {
    interval: PropTypes.number
}

const View = ({char}) => {
    const {name, gender, born, died, playedBy} = char

    return (
        <>
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Actor </span>
                    <span>{playedBy}</span>
                </li>
            </ul>
        </>
    )
}