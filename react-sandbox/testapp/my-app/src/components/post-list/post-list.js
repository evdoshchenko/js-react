import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

import PostListItem from '../post-list-item';
import './post-list.css';

const PostList = ({posts, onDelete, onToggleImportant, onToggleLiked}) => {

    const elements = posts.map((item) => {
        const {id, ...itemProps} = item;        // id for KEY
        return (
            <ListGroupItem key={id} >
                <PostListItem 
                    {...itemProps}
                    onDelete={() => onDelete(id)}
                    onToggleImportant={() => onToggleImportant(id)}
                    onToggleLiked={() => onToggleLiked(id)}/>
            </ListGroupItem>
        )
    });

    return (
        <ListGroup className='app-list'>
            {elements}
        </ListGroup>
    )
}
export default PostList;