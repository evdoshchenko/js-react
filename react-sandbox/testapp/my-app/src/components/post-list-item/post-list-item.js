import React from 'react';


import './post-list-item.css'

const PostListItem = ({label, onDelete, onToggleImportant, onToggleLiked, important, like}) => {
    let classNames = 'app-list-item d-flex justify-content-between';

    if (important) {
        classNames += ' important';
    }

    if (like) {
        classNames += ' like';
    }

    return (
        <div className={classNames}>
            <div className='d-flex'>
                <i className='fa fa-heart'></i>
                <span 
                className='app-list-item-label'
                onClick={onToggleLiked}>
                    {label}
                </span>
            </div>

            <div className='d-flex justify-content-center align-items-center'>
            
                <button 
                type='button'
                className='btn-star btn-sm'
                onClick={onToggleImportant}>
                    <i className='fa fa-star'></i>
                </button>
                <button 
                type='button'
                className='btn-star btn-trash'
                onClick={onDelete}>
                    <i className='fa fa-trash'></i>
                </button>
                
            </div>
    </div>
    )

}

export default PostListItem;