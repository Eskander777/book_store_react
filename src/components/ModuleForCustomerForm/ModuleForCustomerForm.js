import React from 'react';

import classes from './ModuleForCustomerForm.module.css';
import CustomerForm from '../CustomerForm/CustomerForm';


const moduleForCustomerForm = (props) => {

    let modalStyle = {
        display: 'none'
    };

    if (props.showModule) {
        modalStyle.display = "block";
    };

    return (
        <div className={classes.Module_for_customer} style={modalStyle}>
            <div className={classes.Module_for_customer__content}>
                <CustomerForm />
            </div>
        </div>
    )
}

export default moduleForCustomerForm;