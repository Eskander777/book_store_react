import React from 'react';

import Aux from '../../../hoc/Auxiliary'
import classes from './Book.module.css'


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
                         src={props.image} 
                         alt={props.title} 
                         onClick={props.imageClicked}></img>
                </div>
                <div className={classes.Book__price}>
                    <span className={classes.Book__price_val}>{props.price}</span>
                    <span>{props.currency}</span>
                </div>
                <div className={classes.Book__actions_container}>
                    <div className={classes.Book__actions}>
                        <input 
                            className={bookInputCssClass} 
                            type="number" 
                            onChange={props.amountChange}
                            value={props.amount}></input>
                        <button 
                            className={bookButtonCssClass} 
                            type="button"
                            onClick={props.addToCartClick}>Добавить в корзину</button>
                    </div>
                </div>
                <div className={classes.Book__description_container}>
                    <div className={classes.Book__description} >
                        <h3 className="Book_Book__description_title">{props.title}</h3>
                        <p>{props.description} </p>
                        <div className={classes.Book__code}>Артикул: {props.code} </div>
                    </div>
                </div>
            </div>
        </Aux>
    )
}

export default book;