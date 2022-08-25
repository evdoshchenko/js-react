import React, { Component } from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import { CharacterPage, BookPage, HousePage }from '../Pages';
import gotService from '../../services/gotService';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './app.css'



export default class App extends Component {

    gotService = new gotService();

    state = {
        showRandomChar: true,
        error: false
    };

    componentDidCatch() {
        // console.log('error');
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
        const char = this.state.showRandomChar ? <RandomChar/> : null;
        // const char = this.state.showRandomChar ? null : null;

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <Router>
                <div className='app'> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {char}
                                <Button
                                    className='toggle-btn'
                                    onClick={this.toggleRandomChar}>Random</Button>
                            </Col>
                        </Row>

                        <Route path='characters' component={<CharacterPage/>}/>
                        <Route path='books' component={<BookPage/>}/>
                        <Route path='houses' component={<HousePage/>}/>
                        
                        
                    </Container>
                </div>
            </Router>

        );
    }

};

