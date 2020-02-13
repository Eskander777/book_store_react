import React, { Component } from 'react';

import classes from './Cart.module.css';
import CartItem from './CartItem/CartItem';

class Cart extends Component {
    state = {
        order: false,
        order_total: {
            totalPrice: 0,
            totalAmount: 0
        }
    }

    deleteItemHandler = (event) => {
        const orderArray = this.state.order;
        const buttonClicked = event.target;
        const itemToDeleteTitile = buttonClicked.parentElement.parentElement.children[1].children[0].innerText;
        const updatedOrderArray = orderArray.filter(book => book.title !== itemToDeleteTitile)
        this.setState({order: updatedOrderArray});
    }

    changeCartAmountHandler = (event, title) => {
        const itemToChangeIndex = this.state.order.findIndex(i => {
            return i.title === title;
        })

        const item = {
            ...this.state.order[itemToChangeIndex]
        } 

        let input = event.target.value;

        if (isNaN(input) || input <= 0 || input >= 1000){
            input = 1;
        }

        item.amount = input;
        const itemTotalPrice = input * item.price
        item.total = itemTotalPrice;

        const items = [...this.state.order];
        items[itemToChangeIndex] = item;

        this.setState({order: items})
    }

    componentDidUpdate = (prevProps) => {
        console.log('[componentDidUpdate]');
        const shopItem = this.props.item;
        if (shopItem) {
            if (this.state.order) {
                if (shopItem !== prevProps.item) {
                    const orderArray = [...this.state.order];
                    const orderArrayTitles = orderArray.map(item => {
                    return (item.title)
                    })
                    if (!orderArrayTitles.includes(shopItem.title)) {
                        orderArray.push(shopItem);
                        console.log('setState');
                        this.setState({order: orderArray});
                        console.log(this.state.order)
                        alert("Item added to Cart")
                    } else {
                        console.log('Already Added!')
                        const itemToAddAmountIndex = orderArray.findIndex(i => {
                            return i.title === shopItem.title;
                        })
                        const itemToAddAmount = orderArray[itemToAddAmountIndex];
                        console.log(itemToAddAmount);
                    }
                } 
            } else {
                const orderArray = [];
                orderArray.push(shopItem);
                this.setState({order: orderArray});
                alert("Item added to Cart");
            }
        }
    }
    
    render() {

        // console.log(this.state.order);

        let cartItems;

        if (this.state.order) {
            const cartOrder = this.state.order;
            
            cartItems = cartOrder.map(item => (<CartItem 
                    imageSrc={item.imageSrc}
                    title={item.title}
                    code={item.code}
                    price={item.price}
                    amount={item.amount}
                    changeCartAmount={(event) => this.changeCartAmountHandler(event, item.title)}
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