// jshint esversion: 9

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
          query: query.trim()
        }))

        BooksAPI.search(query).then((results) => {

            console.log("Result",results)
            const destructed = results.map((result) => {
                const {authors, title, shelf, id, imageLinks} = result;
                var authorString = "";
                console.log("Authors",authors)
                if(authors) {
                    authorString = authors.join(",");
                } 
                 // console.log(authorString);
       
                return {authors: authorString, title, shelf, id, thumbnail: imageLinks.thumbnail};
             });
       
             this.setState(prevState => ({
               searchResult: destructed
             }));
            
        }).catch(() => {
            console.log("Error")
        })


      }
    
      clearQuery = () => {
        this.updateQuery('');
      }
    
    render() {
        const {query} = this.state;
        const {onMove} = this.props;
         
        const showingBooks = query === ''
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

                {/* <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button> */}
                    <div className="search-books-input-wrapper">
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
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