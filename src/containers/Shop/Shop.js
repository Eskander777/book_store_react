import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import classes from './Shop.module.css';
import BooksArray from '../../assets/LoadBooksFromDb';
import Book from './Book/Book';
import ModuleForImage from '../../components/UI/ModuleForImage';
import Cart from '../Cart/Cart';

class Shop extends Component {
    state = {
        goods: BooksArray,
        imageSrc: ' ',
        bookName: ' ',
        showImage: false,
        item: false
    }

    imageClickedHandler = event => {
        this.setState({imageSrc: event.target.src, 
                       bookName: event.target.alt,
                       showImage: true});
    }

    closeImageHandler = () => {
        this.setState({showImage: false});
    }

    addToCartHandler = (event) => {
        const button = event.target;
        const shopItem = button.parentElement.parentElement.parentElement;
        const title = shopItem.getElementsByClassName('Book_Book__description_title')[0].innerText;
        const priceRaw = shopItem.getElementsByClassName('Book_Book__price_val__1UGoe')[0].innerText;
        const amount = parseInt(shopItem.getElementsByClassName('Book_Book__amount__2Y_yT col-4')[0].value);
        const imageSrc = shopItem.getElementsByClassName('Book_Book__image__2djdo rounded-circle')[0].src;
        const code = shopItem.getElementsByClassName('Book_Book__code__U8h_H')[0].innerText;
        const price = parseFloat(priceRaw);
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

    render() {

        const booksCssClass = classes.Books + ' row no-gutters';
    
        return (
            <Aux>
                <div className={booksCssClass}>
                    {this.state.goods.map(book => {
                        return (
                            <Book 
                                image={book.image}
                                price={book.price}
                                currency={book.currency}
                                title={book.title}
                                description={book.description}
                                code={book.code}
                                key={book.title}
                                imageClicked={(event) => this.imageClickedHandler(event)}
                                addToCartClick={(event) => this.addToCartHandler(event)}
                                amountChange={(event) => this.changeAmountHandler(event, book.title)}
                                amount={book.defaultAmountToBuy}
                            />
                        )
                    })}
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