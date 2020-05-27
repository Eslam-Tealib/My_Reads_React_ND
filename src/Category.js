
import React from 'react';
import ListBook from './ListBook';

function Category (props) {
    return(
        <div className="bookshelf">
              <h2 className="bookshelf-title">{props.title}</h2>
              
              <ListBook books={props.books} onMove={props.onMove}/>
        </div>
    );
}

export default Category;