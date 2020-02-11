import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import classes from './Shop.module.css';
import Books from '../../assets/LoadBooksFromDb';
import Book from './Book/Book';
import ModuleForImage from '../../components/UI/ModuleForImage';
import Cart from '../Cart/Cart';

class Shop extends Component {
    state = {
        imageSrc: ' ',
        bookName: ' ',
        showImage: false,
        order: false,
        defaultAmount: 1
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
        const amountStr = shopItem.getElementsByClassName('Book_Book__amount__2Y_yT col-4')[0].value;
        let amount = parseInt(amountStr);
        if (isNaN(amount) || amount <= 0 || amount >= 1000){
            amount = 1;
        };
        const imageSrc = shopItem.getElementsByClassName('Book_Book__image__2djdo rounded-circle')[0].src;
        const code = shopItem.getElementsByClassName('Book_Book__code__U8h_H')[0].innerText;
        const price = parseFloat(priceRaw);
        const total = price * amount;
        const pickedOrder = {
            title: title,
            price: price,
            amount: amount,
            imageSrc: imageSrc,
            code: code,
            total: total,
        }

        if (this.state.order) {
            const orderArray = this.state.order;
            const orderArrayTitles = orderArray.map(item => {
                return (item.title)
            });

            if(!orderArrayTitles.includes(title)) {
                orderArray.push(pickedOrder);
                this.setState({order: orderArray})
                alert("Item added to Cart")
            } else {
                console.log('Already added')
            }
        } else {
            const orderArray = [];
            orderArray.push(pickedOrder);
            this.setState({order: orderArray});
            alert("Item added to Cart")
        }
    }

    changeAmountHandler = (event) => {
        const amount = event.target;
        if (isNaN(amount.value) || amount.value <= 0 || amount.value >= 1000){
            amount.value = 1;
        };
        console.log(amount.value);
        this.setState({defaultAmount: amount.value})
    }

    render() {

        const booksCssClass = classes.Books + ' row no-gutters';
    
        return (
            <Aux>
                <div className={booksCssClass}>
                    {Books.map(book => {
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
                                amountChange={(event) => this.changeAmountHandler(event)}
                                amount={this.state.defaultAmount}
                            />
                        )
                    })}
                </div>

                <Cart 
                    showCart={this.props.showCart}
                    closeCartClick={this.props.closeCartClick}
                    order={this.state.order} />

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