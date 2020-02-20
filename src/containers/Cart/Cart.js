import React, { Component } from 'react';

import classes from './Cart.module.css';
import CartItem from '../../components/CartItem/CartItem';
import ModuleForCustomerForm from '../../components/ModuleForCustomerForm/ModuleForCustomerForm';

class Cart extends Component {
    state = {
        showCustomerForm: false,
        completeOrder: {
            order: false,
            orderTotal: {
                totalPrice: 0,
                totalAmount: 0
            }
        }
    }

    deleteItemHandler = (event) => {
        const orderArray = [...this.state.completeOrder.order];
        const orderTotal = {...this.state.completeOrder.orderTotal};

        const buttonRemoveClicked = event.target;
        const itemToDelete =  buttonRemoveClicked.parentElement.parentElement;

        const itemToDeleteTitile = itemToDelete.children[1].children[0].innerText;
        const updatedOrderArray = orderArray.filter(book => book.title !== itemToDeleteTitile)
        
        const itemToDeleteAmount = itemToDelete.children[3].children[0].value;
        const updatedOrderTotalAmount = orderTotal.totalAmount - itemToDeleteAmount;

        const itemToDeleteTotalPrice = parseInt(itemToDelete.children[4].innerText);
        const updatedOrderTotalPrice = orderTotal.totalPrice - itemToDeleteTotalPrice;
        
        this.setState({completeOrder: {order: updatedOrderArray, orderTotal:{totalPrice: updatedOrderTotalPrice, 
                                                 totalAmount: updatedOrderTotalAmount}}
        });
    }

    changeCartAmountHandler = (event, title) => {
        const itemToChangeIndex = this.state.completeOrder.order.findIndex(i => {
            return i.title === title;
        })
        const orderTotal = {...this.state.completeOrder.orderTotal};

        const item = {
            ...this.state.completeOrder.order[itemToChangeIndex]
        } 

        let updatedOrderTotalAmount = orderTotal.totalAmount - item.amount;
        let updatedOrderTotalPrice = orderTotal.totalPrice - item.total;

        let input = parseInt(event.target.value);
        if (isNaN(input) || input <= 0 || input >= 1000){
            input = 1;
        }
        item.amount = input;

        const itemTotalPrice = item.amount * item.price
        item.total = itemTotalPrice;

        const items = [...this.state.completeOrder.order];
        items[itemToChangeIndex] = item;

        updatedOrderTotalAmount += item.amount;
        updatedOrderTotalPrice += item.total;

        this.setState({completeOrder: {order: items, orderTotal:{totalPrice: updatedOrderTotalPrice, 
            totalAmount: updatedOrderTotalAmount}}
        });
    }

    componentDidUpdate = (prevProps) => {
        const shopItem = this.props.item;
        if (shopItem) {
            if (this.state.completeOrder.order) {
                if (shopItem !== prevProps.item) {
                    const orderArray = [...this.state.completeOrder.order];
                    const orderArrayTitles = orderArray.map(item => {
                        return (item.title);
                    })
                    const orderTotal = {...this.state.completeOrder.orderTotal};
                    if (!orderArrayTitles.includes(shopItem.title)) {
                        orderArray.push(shopItem);
                        const updatedOrderTotalAmount = orderTotal.totalAmount + shopItem.amount;
                        const updatedOrderTotalPrice = orderTotal.totalPrice + shopItem.total;
                        console.log('setState');
                        this.setState({completeOrder: {order: orderArray, orderTotal:{totalPrice: updatedOrderTotalPrice, 
                                                    totalAmount: updatedOrderTotalAmount}}
                        });
                        alert("Товар успешно добавлен!");
                    } else {
                        const itemToAddAmountIndex = orderArray.findIndex(i => {
                            return i.title === shopItem.title;
                        })
                        const itemToAddAmount = orderArray[itemToAddAmountIndex];
                        const updatedAmount = itemToAddAmount.amount + shopItem.amount;
                        itemToAddAmount.amount = updatedAmount;
                        const itemToAddTotalPrice = itemToAddAmount.amount * itemToAddAmount.price;
                        itemToAddAmount.total = itemToAddTotalPrice;
                        orderArray[itemToAddAmountIndex] = itemToAddAmount;
                        const updatedOrderTotalAmount = orderTotal.totalAmount + shopItem.amount;
                        const updatedOrderTotalPrice = orderTotal.totalPrice + shopItem.total;;
                        this.setState({completeOrder: {order: orderArray, orderTotal:{totalPrice: updatedOrderTotalPrice, 
                                                    totalAmount: updatedOrderTotalAmount}}
                        });
                    }
                } 
            } else {
                const orderArray = [];
                orderArray.push(shopItem);
                this.setState({completeOrder: {order: orderArray, orderTotal:{totalPrice: shopItem.total, 
                                            totalAmount: shopItem.amount}}
                });
                alert("Товар успешно добавлен!");
            }
        }
    }

    showCustomerForm = () => {
        this.setState({showCustomerForm: true});
    }
    
    render() {
        let cartItems;

        if (this.state.completeOrder.order) {
            const cartOrder = this.state.completeOrder.order;
            
            cartItems = cartOrder.map(item => (<CartItem 
                    imageSrc={item.imageSrc}
                    title={item.title}
                    code={item.code}
                    price={item.price}
                    amount={item.amount}
                    changeCartAmount={(event) => this.changeCartAmountHandler(event, item.title)}
                    deleteItem={this.deleteItemHandler}
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
                                        >{this.state.completeOrder.orderTotal.totalAmount}</span>
                                    <div className={classes.Cart__total_title}>Общая стоимость</div>
                                    <span className={classes.Cart__total_price}
                                        >{this.state.completeOrder.orderTotal.totalPrice} ₽</span>
                                </div>
                                <div className="col text-center">
                                    <button 
                                        className="btn btn-success" 
                                        onClick={this.showCustomerForm}
                                        >Сформировать заказ</button>
                                </div>
                            </div>
                    </div>
                </div>
                <ModuleForCustomerForm 
                    showModule={this.state.showCustomerForm}
                    completeOrder={this.state.completeOrder} />
            </div>
        )
    }
}

export default Cart;