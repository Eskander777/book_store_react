import React from 'react';

import classes from './CartItem.module.css';

const cartItem = ({ cartItem, changeCartAmount, deleteItem }) => {
  return (
    <tr>
      <td className={classes.Cart__Image_td}>
        <img
          className={classes.Cart__item_image}
          src={cartItem.imageSrc}
          alt={cartItem.title}
        />
      </td>
      <td>
        <div>{cartItem.title}</div>
        <div className={classes.Cart__item_code}>Артикул: {cartItem.code}</div>
      </td>
      <td classename={classes.Cart__price}>{cartItem.price} ₽</td>
      <td className={classes.Cart__quantity}>
        <input
          className={classes.Cart__quantity_input}
          type="number"
          onChange={changeCartAmount}
          value={cartItem.amount}
        />
        <button
          className="btn btn-danger"
          type="button"
          onClick={() => deleteItem(cartItem)}
        >
          Убрать
        </button>
      </td>
      <td className={classes.Cart__item_total_price}>{cartItem.total} ₽</td>
    </tr>
  );
};

export default cartItem;
