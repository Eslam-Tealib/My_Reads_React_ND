
import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Category from './Category';
import Search from "./Search";
import {Route, Link} from "react-router-dom";


class BooksApp extends React.Component {
  componentDidMount() {
    BooksAPI.getAll().then((books) => {

      const destructed = books.map((book) => {
        const {authors = [], title, shelf, id, imageLinks = {}} = book;
         var authorString = "";

          if(authors) {
            authorString = authors.join(",");
          } 

         return {authors: authorString, title, shelf, id, thumbnail: imageLinks.thumbnail};
      });

      this.setState(prevState => ({
        books: destructed
      }));

    }).catch(() => {
      // console.log("Error");
    });
  }

  filterByShelf = shelfName => {
    const filteredBooks = this.state.books.filter(book => (
      book.shelf === shelfName
    ));

    return filteredBooks;
  }

  getBookShelfName = (book) => {
    
    const existingBooks = this.state.books.filter((b) => (b.id === book.id))

    var shelf = "none"

    if(existingBooks.length > 0){
      shelf = existingBooks[0].shelf
    }

    return shelf
  }
  
  moveBookToShelf = (book,toShelfName) => {

    var updatedBooks = this.state.books
   
    var found = false
  
    updatedBooks.forEach((b) => {
      if(b.id === book.id) {
        b.shelf = toShelfName
        found = true
      } 
    })

    if(!found) {
      book.shelf = toShelfName
      updatedBooks.push(book)
    }

    this.setState((currentState) => ({
      books : updatedBooks
    }))

    BooksAPI.update(book, toShelfName).then((res) => {
      // console.log("The API response ", res)
    })
  }

  state = {
    books: []
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
            
          </div>
          )}
        />
        
        <Route path='/search' render={() => (
          <Search bookShelfName={this.getBookShelfName} onMove={this.moveBookToShelf}/>
        )}/>
        
      </div>
    )
  }
}

export default BooksApp
