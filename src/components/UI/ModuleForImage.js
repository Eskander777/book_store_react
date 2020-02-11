import React from 'react';

import classes from './ModuleForImage.module.css';

const moduleForImage = props => {
    
    let modalStyle = {
        display: 'none'
    };

    if (props.showState) {
        modalStyle.display = "block";
    }

    return(
        <div className={classes.Modal_for_image} style={modalStyle} >
        <span className={classes.closeImageModal} onClick={props.closeClick}>×</span>
        <img 
            className={classes.Modal_image__content} 
            src={props.imageSrc} 
            alt={props.bookName}></img>
            <div className={classes.Caption}>{props.bookName}</div>
        </div>
    )
}

export default moduleForImage;