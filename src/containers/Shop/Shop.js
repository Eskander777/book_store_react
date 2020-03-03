import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary';
import Books from '../Books/Books';
import Cart from '../Cart/Cart';
import * as actionTypes from '../../store/actions';

class Shop extends Component {
  render() {
    return (
      <Aux>
        <Books addToCart={this.props.onAddedToCart} />

        <Cart
          showCart={this.props.showCart}
          closeCartClick={this.props.closeCartClick}
          showCustomerFormState={this.props.showCustomerFormState}
          showCustomerForm={this.props.showCustomerForm}
          closeCustomerForm={this.props.closeCustomerForm}
        />
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    completeOrder: state.completeOrder
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddedToCart: book =>
      dispatch({ type: actionTypes.ADDED_TO_CART, item: book })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
