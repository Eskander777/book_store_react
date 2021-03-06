import React from 'react';

import classes from './ModuleForImage.module.css';

const moduleForImage = (props) => {
  return (
    <div className={classes.Modal_for_image} onClick={props.closeClick}>
      <img
        className={classes.Modal_image__content}
        src={props.imageSrc}
        alt={props.bookName}
      ></img>
      <div className={classes.Caption}>{props.bookName}</div>
    </div>
  );
};

export default moduleForImage;
