import React, { Component } from 'react';
import {connect} from 'react-redux';

import classes from './Cart.module.css';
import CartItem from '../../components/CartItem/CartItem';
import ModuleForCustomerForm from '../../components/ModuleForCustomerForm/ModuleForCustomerForm';
import * as actionTypes from '../../store/actions';

class Cart extends Component {
    state = {
        showCustomerForm: false
    }

    showCustomerForm = () => {
        this.setState({showCustomerForm: true});
    }
    
    render() {
        let cartItems;

        if (this.props.completeOrder.order) {
            const cartOrder = this.props.completeOrder.order;
            
            cartItems = cartOrder.map(item => (<CartItem 
                    cartItem={item}
                    changeCartAmount={(event) => this.props.onAmountChange(
                        event.target.value, 
                        item.title
                        )}
                    deleteItem={this.props.onRemovedItem}
                    key={item.code} />
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
                                        >{this.props.completeOrder.orderTotal.totalAmount}</span>
                                    <div className={classes.Cart__total_title}>Общая стоимость</div>
                                    <span className={classes.Cart__total_price}
                                        >{this.props.completeOrder.orderTotal.totalPrice} ₽</span>
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
                    completeOrder={this.props.completeOrder} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        completeOrder: state.completeOrder
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRemovedItem: (title, amount, price) => dispatch({
            type: actionTypes.REMOVED_FROM_CART, 
            titleToDelete: title,
            amountToDelete: amount,
            sumToDelete: price
        }),
        onAmountChange: (amount, title) => dispatch({
            type: actionTypes.AMOUNT_CHANGED,
            changedAmount: amount,
            changedAmountTitle: title
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);