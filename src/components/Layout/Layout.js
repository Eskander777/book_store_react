import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import Books from '../../containers/Books/Books';


class Layout extends Component {
    state = {
        showCart: false
    }

    showCart = () => {
        this.setState({showCart: true});
    }

    closeCart = () => {
        this.setState({showCart: false});
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
                    <Books 
                        showCart={this.state.showCart} 
                        closeCartClick={this.closeCart} />
                </main>
            </Aux>
        )
    }
} 


export default Layout;