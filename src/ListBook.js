// jshint esversion: 9

import React, {Component} from 'react';
import Book from './Book';

class ListBook extends Component {
    
    render() {
         
        
      
        return(
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {this.props.books.map(book => (
                        <Book key={book.id} id={book.id} book={book} onMove={this.props.onMove}/>
                    ))}
                    
                </ol>
            </div>
        )
    }
}

export default ListBook;