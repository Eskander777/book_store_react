import React from 'react';

import classes from './CartItem.module.css';

const cartItem = props => {
    return (
        <tr>
            <td className={classes.Cart__Image_td}>
                <img 
                    className={classes.Cart__item_image} 
                    src={props.cartItem.imageSrc} 
                    alt={props.cartItem.title}/>
            </td>
            <td>
                <div>{props.cartItem.title}</div>
                <div className={classes.Cart__item_code}
                    >Артикул: {props.cartItem.code}</div>
            </td>
            <td classename={classes.Cart__price}
                >{props.cartItem.price} ₽</td>
            <td className={classes.Cart__quantity}>
                <input 
                    className={classes.Cart__quantity_input} 
                    type='number' 
                    onChange={props.changeCartAmount}
                    value={props.cartItem.amount} />
                <button 
                    className="btn btn-danger" 
                    type="button"
                    onClick={() => props.deleteItem(
                        props.cartItem.title, 
                        props.cartItem.amount, 
                        props.cartItem.total
                        )}
                    >Убрать</button>
            </td>
            <td className={classes.Cart__item_total_price}
                >{props.cartItem.total} ₽</td>
        </tr>
    )
};

export default cartItem;