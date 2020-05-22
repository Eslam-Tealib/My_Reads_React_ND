// jshint esversion: 9

import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Category from './Category';
import Search from "./Search";
import {Route, Link} from "react-router-dom";

/*
Steps:
=====
Start With A Mock 
Step 1: Break The UI Into A Component Hierarchy (Check)
Step 2: Build A Static Version in React 
Step 3: Identify The Minimal (but complete) Representation Of UI State
Step 4: Identify Where Your State Should Live
Step 5: Add Inverse Data Flow
*/

class BooksApp extends React.Component {
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books);
      const destructed = books.map((book) => {
         const {authors, title, shelf, id, imageLinks} = book;
          var authorString = authors.join(",");
          // console.log(authorString);

         return {authors: authorString, title, shelf, id, thumbnail: imageLinks.thumbnail};
      });

      this.setState(prevState => ({
        books: destructed
      }));

      console.log(destructed);
      // this.setState()
    }).catch(() => {
      console.log("Error");
  });
  }

  filterByShelf = shelfName => {
    const filteredBooks = this.state.books.filter(book => (
      book.shelf === shelfName
    ));

    return filteredBooks;
  }

  moveBookToShelf = (book,toShelfName) => {
    //print before update
    console.log("Before update ",this.state.books)
    //find book 
    var updatedBooks = this.state.books
  
    updatedBooks.forEach((b) => {
      if(b.id === book.id) {
        //update book
        b.shelf = toShelfName
      }
    })
    console.log("After update ",updatedBooks)

    this.setState((currentState) => ({
      books : updatedBooks
    }))
  }

  state = {
    books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  render() {
    return (
      <div className="app">

        <Route exact path='/' render={() => (
            <div className="list-books">

            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            
            <div className="list-books-content">

              <div>
                <Category
                  title="Currently Reading"
                  books={this.filterByShelf("currentlyReading")}
                  onMove={this.moveBookToShelf}
                />

                <Category
                  title="Want to Read"
                  books={this.filterByShelf("wantToRead")}
                  onMove={this.moveBookToShelf}
                />
                
                <Category
                  title="Read"
                  books={this.filterByShelf("read")}
                  onMove={this.moveBookToShelf}
                />

              </div>

            </div>

            <Link 
                to='/search'
                className="open-search"
              >Add a book
            </Link>
            
            {/* <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div> */}
          </div>
          )}
        />
        
        <Route path='/search' render={() => (
          <Search books={this.state.books} onMove={this.moveBookToShelf}/>
        )}/>
        
      </div>
    )
  }
}

export default BooksApp
