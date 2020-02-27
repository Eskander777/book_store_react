import React, { Component } from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Auxiliary';
import Books from '../Books/Books';
import Cart from '../Cart/Cart';
import * as actionTypes from '../../store/actions';

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
                <Books addToCart={this.props.onAddedToCart} />

                <Cart 
                    showCart={this.props.showCart}
                    closeCartClick={this.props.closeCartClick}
                    item={this.state.item} />
            </Aux>
        );    
    }
}

const mapStateToProps = state => {
    return {
        completeOrder: state.completeOrder
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddedToCart: (book) => dispatch({type: actionTypes.ADDED_TO_CART, item: book})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop);