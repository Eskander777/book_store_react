import React from 'react';

import classes from './Book.module.css';

const book = ({ book, imageClicked, amountChange, addToCartClick }) => {
  return (
    <div className={`${classes.Book} col`}>
      <div className={classes.Book__image_container}>
        <img
          className={`${classes.Book__image} rounded-circle`}
          src={book.image}
          alt={book.title}
          onClick={imageClicked}
        ></img>
      </div>
      <div className={classes.Book__price}>
        <span className={classes.Book__price_val}>{book.price}</span>
        <span> ₽</span>
      </div>
      <div className={classes.Book__actions_container}>
        <div className={classes.Book__actions}>
          <input
            className={`${classes.Book__amount} col-4`}
            type="number"
            onChange={amountChange}
            value={book.defaultAmountToBuy}
          />
          <button
            className={`${classes.Book__button} btn btn-primary`}
            type="button"
            onClick={() => addToCartClick(book)}
          >
            Добавить в корзину
          </button>
        </div>
      </div>
      <div className={classes.Book__description_container}>
        <div className={classes.Book__description}>
          <h3 className={classes.Book__description_title}>{book.title}</h3>
          <p>{book.description} </p>
          <div className={classes.Book__code}>Артикул: {book.code} </div>
        </div>
      </div>
    </div>
  );
};

export default book;
