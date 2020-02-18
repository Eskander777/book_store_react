import React from 'react';

import Aux from '../../hoc/Auxiliary';
import classes from './Book.module.css';


const book = (props) => {
    const bookCss = classes.Book + " col";
    const bookImageCssClass =  classes.Book__image + " rounded-circle";
    const bookInputCssClass = classes.Book__amount + " col-4";
    const bookButtonCssClass = classes.Book__button + " btn btn-primary"

    return (
        <Aux>
            <div className={bookCss}>
                <div className={classes.Book__image_container}>
                    <img className={bookImageCssClass} 
                         src={props.book.image} 
                         alt={props.book.title} 
                         onClick={props.imageClicked}></img>
                </div>
                <div className={classes.Book__price}>
                    <span className={classes.Book__price_val}>{props.book.price}</span>
                    <span>{props.book.currency}</span>
                </div>
                <div className={classes.Book__actions_container}>
                    <div className={classes.Book__actions}>
                        <input 
                            className={bookInputCssClass} 
                            type="number" 
                            onChange={props.amountChange}
                            value={props.book.defaultAmountToBuy}></input>
                        <button 
                            className={bookButtonCssClass} 
                            type="button"
                            onClick={() => props.addToCartClick(props.book)}>Добавить в корзину</button>
                    </div>
                </div>
                <div className={classes.Book__description_container}>
                    <div className={classes.Book__description} >
                        <h3 className="Book_Book__description_title">{props.book.title}</h3>
                        <p>{props.book.description} </p>
                        <div className={classes.Book__code}>Артикул: {props.book.code} </div>
                    </div>
                </div>
            </div>
        </Aux>
    )
}

export default book;