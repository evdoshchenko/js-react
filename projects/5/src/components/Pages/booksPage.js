import React, { Component } from 'react';
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';
import { useNavigate } from 'react-router-dom'

const withRouter = (Component) => {

    const Wrapper = (props) => {
        const navigate = useNavigate();

        return (
            <Component
                navigate={navigate}
                {...props}
                />
        );
    };

    return Wrapper;
};

class BooksPage extends Component {

    gotService = new gotService();

    state = {
        error: false
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
        
        return (
            <div className="pages rounded">
                <h4>Books</h4>
                <ItemList 
                    onItemSelected={(itemId) => {
                        this.props.navigate(itemId);
                        console.log(itemId)
                    }}
                    getData={this.gotService.getAllBooks}
                    renderItem={({name}) => name}/>   
            </div> 
        )
    }
}

export default withRouter(BooksPage);