
import React, {Component} from 'react';
import ListBook from './ListBook';
import * as BooksAPI from './BooksAPI';
import { Link } from "react-router-dom";

class Search extends Component {
    state = {
        query: '',
        searchResult: []
    }
    
    updateQuery = query => {
    this.setState(() => ({
        query: query
    }))


    if (query.trim().length > 0) {

        BooksAPI.search(query.trim()).then((results) => {
            if(results === undefined){

                this.setState(prevState => ({
                    searchResult: []
                }))
                return 
            }

            if(results.error){
                // console.log("Request Sucess but Error exists : ",results.error)
                return 
            }

            var destructed = results.map((result) => {
            const {authors = [], title, shelf, id, imageLinks = {}} = result;
    
            return {authors: authors.join(","), title, shelf, id, thumbnail: imageLinks.thumbnail};
            });
        
            destructed = destructed.map((book) => {
            book.shelf =  this.props.bookShelfName(book)
            return book
            });

            this.setState(prevState => ({
            searchResult: destructed
            }));
                
            
        }).catch(() => {
            // console.log("Error")
        })
        }
    }
    

    clearQuery = () => {
        this.updateQuery('');
    }

    render() {
        const {query} = this.state;
        
        var showingBooks = query === ''
        ? []
        : this.state.searchResult.filter((c) => (
        c.title.toLowerCase().includes(query.toLowerCase())
        ));


        return(
            <div className="search-books">
                <div className="search-books-bar">
                <Link 
                    to='/' 
                    className="close-search"
                > Close
                </Link>

                    <div className="search-books-input-wrapper">
                        
                        <input 
                            type="text" 
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        <ListBook onMove={this.props.onMove} books={showingBooks}/>
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search;