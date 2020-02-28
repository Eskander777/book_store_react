import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import Shop from '../Shop/Shop';


class Layout extends Component {
    state = {
        showCart: false
    }

    showCart = () => {
        let cartShowState =  {...this.state};
        cartShowState = {showCart: true};
        this.setState({showCart: cartShowState.showCart});
    }

    closeCart = () => {
        let cartShowState =  {...this.state};
        cartShowState = {showCart: false};
        this.setState({showCart: cartShowState.showCart});
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
                        closeCartClick={this.closeCart} />
                </main>
            </Aux>
        )
    }
} 


export default Layout;