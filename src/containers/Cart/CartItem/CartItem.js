import React from 'react';

import classes from './CartItem.module.css';

const cartItem = props => {
    return (
        <tr>
            <td className={classes.Cart__Image_td}>
                <img 
                    className={classes.Cart__item_image} 
                    src={props.imageSrc} 
                    alt={props.title}/>
            </td>
            <td>
                <div>{props.title}</div>
                <div className={classes.Cart__item_code}>{props.code}</div>
            </td>
            <td classename={classes.Cart__price}>{props.price} ₽</td>
            <td className={classes.Cart__quantity}>
                <input 
                    className={classes.Cart__quantity_input} 
                    type='number' 
                    onChange={props.changeCartAmount}
                    value={props.amount} />
                <button 
                    className="btn btn-danger" 
                    type="button"
                    onClick={props.deleteItem}
                    >Убрать</button>
            </td>
            <td className={classes.Cart__item_total_price}>{props.itemTotalPrice} ₽</td>
        </tr>
    )
};

export default cartItem;