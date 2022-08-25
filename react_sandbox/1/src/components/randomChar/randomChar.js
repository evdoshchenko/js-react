import React, {Component} from 'react';
import './randomChar.css';
import gotService from '../../services/gotService';
import { Spinner } from 'reactstrap';
import ErrorMessage from '../errorMessage';

export default class RandomChar extends Component {

    gotService = new gotService();
    state = {
        char: {},
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateCharacter();
        this.timerId = setInterval(this.updateCharacter, 13500);
        // console.log('mounting');
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    onCharLoaded = (char) => { 
        // console.log(char);
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
        // console.log('update');
        const id = Math.floor(Math.random() * 100) + 100;
        // const id = 900000000;
        this.gotService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() {
        // console.log('render');

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

const View = ({char}) => {
    const {name, gender, born, died, playedBy} = char
    // console.log('render');

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