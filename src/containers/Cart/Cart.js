import React, { Component } from 'react';

import classes from './Cart.module.css';
import CartItem from './CartItem/CartItem';

class Cart extends Component {
    state = {
        order: [],
        order_total: {
            totalPrice: 0,
            totalAmount: 0
        }
    }

    addToCartHandler = order => {
        const orderArray = this.state.order;
        const orderArrayTitles = orderArray.map(order => {
            return (order.title)
        });

        if(order.title !== "" && !orderArrayTitles.includes(order.title)) {
            orderArray.push(order);
            this.setState({order: orderArray})
        } else {
            // console.log('Already added')
        }

        // console.log(this.state.order);
    }

    deleteItemHandler = (event) => {
        const orderArray = this.state.order;
        const buttonClicked = event.target;
        const itemToDeleteTitile = buttonClicked.parentElement.parentElement.children[1].children[0].innerText;
        const updatedOrderArray = orderArray.filter((book) => {
            return book.title !== itemToDeleteTitile;
        })
        this.setState({order: updatedOrderArray});

        console.log('[deleteItemHandler]')
        console.log(itemToDeleteTitile)
        console.log(orderArray)
        console.log(updatedOrderArray)
        // console.log(this.state.order)
    }

    changeCartAmountHandler = (event) => {
        const input = event.target;
        console.log(input.value);
        if (isNaN(input.value) || input.value <= 0 || input.value >= 1000){
            input.value = 1;
        }
    }
    
    render() {

        if (this.props.order.title !== "") {
            this.addToCartHandler(this.props.order);
        }

        let cartItems;

        if (this.state.order !== []) {
            const cartOrder = this.state.order;
            
            cartItems = cartOrder.map(item => (<CartItem 
                    imageSrc={item.imageSrc}
                    title={item.title}
                    code={item.code}
                    price={item.price}
                    amount={item.amount}
                    changeCartAmount={(event) => this.changeCartAmountHandler(event)}
                    deleteItem={(event) => this.deleteItemHandler(event)}
                    itemTotalPrice={item.total}
                    key={item.code}
                    />
                ));
        }

        const modalStyle = {
            display: 'none'
        };

        if (this.props.showCart) {
            modalStyle.display = "block";
        }

        return (
            <div className={classes.Cart_Modal} style={modalStyle}>
                <div className={classes.Cart_Modal__content} >
                    <span className={classes.Close} onClick={this.props.closeCartClick}>×</span>
                    <div className="cart container">
                        <h2>Корзина</h2>
                            <table className="table table-hover table-responsive-md">
                                <thead>
                                    <tr className="cart__row">
                                        <th colSpan="2">Наименование</th>
                                        <th>Цена за единицу</th>
                                        <th>Кол-во</th>
                                        <th>Общая стоимость позиции</th>
                                    </tr>
                                </thead>
                                <tbody className="cart__items">
                                    {cartItems}
                                </tbody>
                            </table>
                            <div>
                                <div className={classes.Cart__total}>
                                    <div className={classes.Cart__total_title}>Общее кол-во</div>
                                    <span className={classes.Cart__total_amount}
                                        >{this.state.order_total.totalAmount}</span>
                                    <div className={classes.Cart__total_title}>Общая стоимость</div>
                                    <span className={classes.Cart__total_price}
                                        >{this.state.order_total.totalPrice} ₽</span>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cart;