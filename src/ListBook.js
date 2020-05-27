
import React from 'react';
import Book from './Book';

function ListBook (props) {
    return(
        <div className="bookshelf-books">
            <ol className="books-grid">
                {props.books.map(book => (
                    <Book key={book.id} id={book.id} book={book} onMove={props.onMove}/>
                ))}
                
            </ol>
        </div>
    )
}

export default ListBook;