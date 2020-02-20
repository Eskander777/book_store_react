import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import classes from './Shop.module.css';
import Book from '../../components/Book/Book';
import ModuleForImage from '../../components/ModuleForImage/ModuleForImage';
import Cart from '../Cart/Cart';
import axios from '../../axios-work';

class Shop extends Component {
    state = {
        goods: null,
        imageSrc: null,
        bookName: null,
        showImage: false,
        item: false
    }

    imageClickedHandler = (event) => {
        this.setState({imageSrc: event.target.src, 
                       bookName: event.target.alt,
                       showImage: true});
    }

    closeImageHandler = () => {
        this.setState({showImage: false});
    }

    addToCartHandler = (book) => {
        const title = book.title;
        const price = book.price;
        const amount = book.defaultAmountToBuy;
        const imageSrc = book.image;
        const code = book.code;
        const total = price * amount;
        const pickedItem = {
            title: title,
            price: price,
            amount: amount,
            imageSrc: imageSrc,
            code: code,
            total: total,
        }

        this.setState({item: pickedItem});
    }

    changeAmountHandler = (event, title) => {
        const bookAmountToChangeIndex = this.state.goods.findIndex(b => {
            return b.title === title;
        });

        const book =  {
            ...this.state.goods[bookAmountToChangeIndex]
        };

        let amount = parseInt(event.target.value);

        if (isNaN(amount) || amount <= 0 || amount >= 1000){
            amount = 1;
        };

        book.defaultAmountToBuy = amount;

        const goods = [...this.state.goods];
        goods[bookAmountToChangeIndex] = book;

        this.setState({goods: goods});
    }

    componentDidMount = () => {
        axios.get('/books.json')
        .then ((response) => {
          this.setState({goods: response.data});
        }).catch((error) => {console.log(error.message)});
    }

    render() {

        let loaderStyle = {
            display: 'block'
        }

        let books;

        if (this.state.goods) {
            loaderStyle = {
                display: 'none'
            }
            books = this.state.goods.map(book => {
                return (
                    <Book 
                        book={book}
                        key={book.title}
                        imageClicked={this.imageClickedHandler}
                        addToCartClick={this.addToCartHandler}
                        amountChange={(event) => this.changeAmountHandler(event, book.title)}
                    />
                )
            })
        }

        const booksCssClass = classes.Books + ' row no-gutters';
    
        return (
            <Aux>
                <div className={classes.Loader} style={loaderStyle} />

                <div className={booksCssClass}>
                    {books}         
                </div>

                <Cart 
                    showCart={this.props.showCart}
                    closeCartClick={this.props.closeCartClick}
                    item={this.state.item} />

                <ModuleForImage 
                    imageSrc={this.state.imageSrc}  
                    bookName={this.state.bookName} 
                    showState={this.state.showImage}
                    closeClick={this.closeImageHandler} />

            </Aux>
        );    
    }
}

export default Shop;