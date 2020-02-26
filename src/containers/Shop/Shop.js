import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import Books from '../Books/Books';
import Cart from '../Cart/Cart';

class Shop extends Component {
    state = {
        item: false
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

    render() {    
        return (
            <Aux>
                <Books addToCart={this.addToCartHandler} />

                <Cart 
                    showCart={this.props.showCart}
                    closeCartClick={this.props.closeCartClick}
                    item={this.state.item} />

            </Aux>
        );    
    }
}

export default Shop;