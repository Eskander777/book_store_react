import React, {Component} from 'react';

import axios from '../../axios-work';

class CustomerForm extends Component {
    state = {
        customer: {
            customerFirstName: '',
            customerLastName: '',
            inputEmail4: '',
            inputPassword4: '',
            inputAddress: '',
            inputCity: '',
            inputState: '',
            inputZip: ''
        },
        completeOrder: null
    }

    handleInputChange = (event) => {
        const target = event.target;
        const customerObject = {...this.state.customer};

        const paramToChange = target.name
        const paramValue = target.value

        customerObject[paramToChange] = paramValue;
        
        this.setState({customer: customerObject})
    }

    submitHandler = (event) => {
        event.preventDefault();
        const order = {...this.state};
        console.log(order.completeOrder.order.length)
        if (order.completeOrder && order.completeOrder.order.length !== 0) {
            axios.post('/ordersFromReactApp.json', order)
                .then(res => {console.log(res);
                              alert('Заказ добавлен к заказам');
                              window.location.reload()})
                .catch(er => {console.log(er);
                              alert('Ошибка, попробуйте позже.')
                              window.location.reload()})
        } else {
            alert('Вы не добавили товары в заказ!')
        }

    }

    componentDidUpdate = (prevProps) => {
        if (this.props.completeOrder.order && prevProps !== this.props) {
            this.setState({completeOrder: this.props.completeOrder});
        }
    }

    render() {

        return (
            <form onSubmit={this.submitHandler}>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="customerFirstName">Имя</label>
                        <input 
                            className="form-control" 
                            type="text" 
                            name="customerFirstName"
                            onChange={this.handleInputChange}
                            value={this.state.customer.customerFirstName}
                            placeholder="Имя"
                            required></input>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="customerLastName">Фамилия</label>
                        <input 
                            className="form-control" 
                            type="text" 
                            name="customerLastName"
                            onChange={this.handleInputChange}
                            value={this.state.customer.customerLastName}
                            placeholder="Фамилия"
                            required></input>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">Email</label>
                        <input 
                            className="form-control" 
                            type="email" 
                            name="inputEmail4"
                            onChange={this.handleInputChange}
                            value={this.state.customer.inputEmail4}
                            placeholder="Email"
                            required></input>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="inputPassword4">Пароль</label>
                        <input 
                            className="form-control" 
                            type="password" 
                            name="inputPassword4"
                            onChange={this.handleInputChange}
                            value={this.state.customer.inputPassword4}
                            autoComplete="off"
                            placeholder="Пароль"
                            required></input>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="inputAddress">Адрес</label>
                        <input 
                            className="form-control" 
                            type="text" 
                            name="inputAddress"
                            onChange={this.handleInputChange}
                            value={this.state.customer.inputAddress}
                            placeholder="Адрес"
                            required></input>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputCity">Город</label>
                        <input 
                            className="form-control" 
                            type="text" 
                            name="inputCity"
                            onChange={this.handleInputChange}
                            value={this.state.customer.inputCity}
                            required></input>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="inputState">Страна</label>
                        <select 
                            className="form-control" 
                            name="inputState"
                            onChange={this.handleInputChange}
                            value={this.state.customer.inputState}
                            required>
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
                            onChange={this.handleInputChange}
                            value={this.state.customer.inputZip}
                            required></input>
                    </div>
                </div>
                <input 
                    type="submit" 
                    className="btn btn-outline-success"></input>
                <a 
                    className="btn btn-outline-danger" 
                    style={{marginLeft: '10px'}} 
                    href="/">Отмена</a>
            </form>
        )
    }
}

export default CustomerForm;