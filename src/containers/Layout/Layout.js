import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import Shop from '../Shop/Shop';

class Layout extends Component {
  state = {
    showCart: false,
    showCustomerFormState: false
  };

  showCart = () => {
    this.setState({ ...this.state, showCart: true });
  };

  closeCart = () => {
    this.setState({ ...this.state, showCart: false });
  };

  showCustomerFormHandler = () => {
    this.setState({ ...this.state, showCustomerFormState: true });
  };

  closeCustomerFormHandler = () => {
    this.setState({ ...this.state, showCustomerFormState: false });
  };

  render() {
    return (
      <Aux>
        <nav className="navbar navbar-light fixed-top bg-light">
          <h5 className="navbar-brand">Книги</h5>
          <button
            className="btn btn-secondary my-2 my-sm-0"
            onClick={this.showCart}
          >
            Показать корзину
          </button>
        </nav>
        <main>
          <Shop
            showCart={this.state.showCart}
            closeCartClick={this.closeCart}
            showCustomerFormState={this.state.showCustomerFormState}
            showCustomerForm={this.showCustomerFormHandler}
            closeCustomerForm={this.closeCustomerFormHandler}
          />
        </main>
      </Aux>
    );
  }
}

export default Layout;
