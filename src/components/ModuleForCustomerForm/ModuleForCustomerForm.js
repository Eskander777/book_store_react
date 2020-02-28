import React from 'react';

import classes from './ModuleForCustomerForm.module.css';
import CustomerForm from '../CustomerForm/CustomerForm';


const moduleForCustomerForm = (props) => {
    return (
        <div className={classes.Module_for_customer} >
            <div className={classes.Module_for_customer__content}>
                <CustomerForm 
                    completeOrder={props.completeOrder}
                    closeCustomerForm={props.closeCustomerForm} />
            </div>
        </div>
    )
}

export default moduleForCustomerForm;