import React from 'react';
import { useParams } from 'react-router-dom'
import { BooksItem } from '.';

const BookItem = () => {
    const {id} = useParams();
        return (
            <div>
                {id}
                <BooksItem id={id}/>
            </div>
        )
}

export default BookItem