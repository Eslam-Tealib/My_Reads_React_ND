// jshint esversion: 9

import React, {Component} from 'react';
import ListBook from './ListBook';

class Category extends Component {
    render() {
        
        return(
            <div className="bookshelf">
                  <h2 className="bookshelf-title">{this.props.title}</h2>
                  <ListBook books={this.props.books} onMove={this.props.onMove}/>
                  {console.log("category books ", this.props.books)}
            </div>
        );
    }
}

export default Category;