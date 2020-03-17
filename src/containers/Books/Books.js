import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import Book from '../../components/Book/Book';
import ModuleForImage from '../ModuleForImage/ModuleForImage';
import classes from './Books.module.css';
import axios from '../../axios-work';

class Books extends Component {
  state = {
    goods: [],
    imageSrc: false,
    bookName: false,
    showImage: false
  };

  componentDidMount = () => {
    let books = { ...this.state.goods };
    axios
      .get('/books.json')
      .then(response => {
        books = response.data;
        this.setState({ goods: books });
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  imageClickedHandler = event => {
    this.setState({
      ...this.state,
      imageSrc: event.target.src,
      bookName: event.target.alt,
      showImage: true
    });
  };

  closeImageHandler = () => {
    this.setState({ showImage: false });
  };

  changeAmountHandler = (event, title) => {
    const bookAmountToChangeIndex = this.state.goods.findIndex(b => {
      return b.title === title;
    });

    const book = {
      ...this.state.goods[bookAmountToChangeIndex]
    };

    let amount = parseInt(event.target.value);

    if (isNaN(amount) || amount <= 0 || amount >= 1000) {
      amount = 1;
    }

    book.defaultAmountToBuy = amount;

    const goods = [...this.state.goods];
    goods[bookAmountToChangeIndex] = book;

    this.setState({ goods: goods });
  };

  render() {
    let books;
    let preloader = <div className={classes.Loader} />;
    let moduleForImage;

    this.state.showImage
      ? (moduleForImage = (
          <ModuleForImage
            imageSrc={this.state.imageSrc}
            bookName={this.state.bookName}
            closeClick={this.closeImageHandler}
          />
        ))
      : (moduleForImage = null);

    if (this.state.goods.length !== 0) {
      preloader = null;
      books = this.state.goods.map(book => {
        return (
          <Book
            book={book}
            key={book.title}
            imageClicked={this.imageClickedHandler}
            addToCartClick={this.props.addToCart}
            amountChange={event => this.changeAmountHandler(event, book.title)}
          />
        );
      });
    }

    const booksCssClass = classes.Books + ' row no-gutters';

    return (
      <Aux>
        {preloader}

        <div className={booksCssClass}>{books}</div>

        {moduleForImage}
      </Aux>
    );
  }
}

export default Books;
