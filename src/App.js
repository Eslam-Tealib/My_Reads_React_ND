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

    console.log("Book to update",book)
    console.log("Dest. Shelf",toShelfName)
    //print before update
    console.log("Before update ",this.state.books)
    //find book 

    var updatedBooks = this.state.books
    /*
    //Example : [1,2] 2. update id 3
     0. define var found = false
     1. loop over available state array
     2. if book id equals one of the existing state books id => 
        - we change its shelf & found = true
     3. end if
        - end loop
     
     4.  if (!found)
      - book.shelf = toSHelfName
     5. updatedBooks.push(book)
     end  if

    */
   var found = false
  
    updatedBooks.forEach((b) => {
      if(b.id === book.id) {
        //update book
        b.shelf = toShelfName
        found = true
      } 
    })
    if(!found) {
      book.shelf = toShelfName
      updatedBooks.push(book)
    }
  
    
    //Steps
    //////case 1: if the book is a shelf and we just wanna change its shelf
    // b. we access it by id
    // c. we change its shelf

    //////case 2: if the book is not in any shelf
    // d. add it to the array of books
    // e. change its shelf to the specified shelf

    
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
