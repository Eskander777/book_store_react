import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-work';
import classes from './CustomerForm.module.css';
import * as actionTypes from '../../store/actions';

class CustomerForm extends Component {
  submitHandler = event => {
    event.preventDefault();
    const order = { ...this.props };
    if (order.completeOrder && order.completeOrder.order.length !== 0) {
      axios
        .post('/ordersFromReactApp.json', order)
        .then(res => {
          console.log(res);
          alert('Заказ добавлен к заказам');
          window.location.reload();
        })
        .catch(er => {
          console.log(er);
          alert('Ошибка, попробуйте позже.');
          window.location.reload();
        });
    } else {
      alert('Вы не добавили товары в заказ!');
    }
  };

  render() {
    const cancelButtonClass = 'btn btn-outline-danger ' + classes.CancelButton;
    const confirmButtonClass =
      'btn btn-outline-success ' + classes.ConfirmButton;

    return (
      <form onSubmit={this.submitHandler}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="customerFirstName">Имя</label>
            <input
              className="form-control"
              type="text"
              name="customerFirstName"
              onChange={this.props.onInputCustomerData}
              value={this.props.customer.customerFirstName}
              placeholder="Имя"
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="customerLastName">Фамилия</label>
            <input
              className="form-control"
              type="text"
              name="customerLastName"
              onChange={this.props.onInputCustomerData}
              value={this.props.customer.customerLastName}
              placeholder="Фамилия"
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Email</label>
            <input
              className="form-control"
              type="email"
              name="inputEmail4"
              onChange={this.props.onInputCustomerData}
              value={this.props.customer.inputEmail4}
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputPassword4">Пароль</label>
            <input
              className="form-control"
              type="password"
              name="inputPassword4"
              onChange={this.props.onInputCustomerData}
              value={this.props.customer.inputPassword4}
              autoComplete="off"
              placeholder="Пароль"
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress">Адрес</label>
          <input
            className="form-control"
            type="text"
            name="inputAddress"
            onChange={this.props.onInputCustomerData}
            value={this.props.customer.inputAddress}
            placeholder="Адрес"
            required
          />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputCity">Город</label>
            <input
              className="form-control"
              type="text"
              name="inputCity"
              onChange={this.props.onInputCustomerData}
              value={this.props.customer.inputCity}
              placeholder="Город"
              required
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="inputState">Страна</label>
            <select
              className="form-control"
              name="inputState"
              onChange={this.props.onInputCustomerData}
              value={this.props.customer.inputState}
              required
            >
              <option defaultValue>Выберите...</option>
              <option value="Российская Федерация">Российская Федерация</option>
              <option value="Украина">Украина</option>
              <option value="Белоруссия">Белоруссия</option>
            </select>
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="inputZip">Индекс</label>
            <input
              className="form-control"
              type="text"
              name="inputZip"
              onChange={this.props.onInputCustomerData}
              value={this.props.customer.inputZip}
              placeholder="Индекс"
              required
            />
          </div>
        </div>
        <input type="submit" className={confirmButtonClass} />
        <button
          type="button"
          onClick={this.props.closeCustomerForm}
          className={cancelButtonClass}
        >
          Отмена
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    customer: state.customer,
    completeOrder: state.completeOrder
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInputCustomerData: data =>
      dispatch({
        type: actionTypes.INPUT_CUSTOMER_DATA,
        customerData: data
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerForm);
