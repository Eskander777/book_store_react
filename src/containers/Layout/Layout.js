import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import Shop from '../Shop/Shop';
import ModuleForCustomerForm from '../../components/ModuleForCustomerForm/ModuleForCustomerForm';


class Layout extends Component {
    state = {
        showCart: false,
        showCustomerForm: false
    }

    showCart = () => {
        this.setState({showCart: true});
    }

    closeCart = () => {
        this.setState({showCart: false});
    }

    showCustomerForm = () => {
        this.setState({showCustomerForm: true});
    }

    render() {
        
        return (
            <Aux>
                <nav className='navbar navbar-light fixed-top bg-light'>
                    <h5 className='navbar-brand'>Книги</h5>
                    <button 
                        className='btn btn-secondary my-2 my-sm-0' 
                        onClick={this.showCart}>Показать корзину
                    </button>
                </nav>
                <main>
                    <Shop   
                        showCart={this.state.showCart} 
                        closeCartClick={this.closeCart}
                        showCustomerForm={this.showCustomerForm} />
                </main>

                <ModuleForCustomerForm showModule={this.state.showCustomerForm} />
            </Aux>
        )
    }
} 


export default Layout;