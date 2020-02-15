import React, {Component} from 'react';

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
        }
    }

    render() {
        return (
            <form action='/customer' method="POST">
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="customerFirstName">Имя</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="customerFirstName"
                            placeholder="Имя"
                            required></input>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="customerLastName">Фамилия</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="customerLastName"
                            placeholder="Фамилия"
                            required></input>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="inputEmail4"
                            placeholder="Email"
                            required></input>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="inputPassword4">Пароль</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="inputPassword4"
                            autoComplete="off"
                            placeholder="Пароль"
                            required></input>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="inputAddress">Адрес</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="inputAddress"
                            placeholder="Адрес"
                            required></input>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputCity">Город</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="inputCity"
                            required></input>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="inputState">Страна</label>
                        <select 
                            id="inputState"
                            className="form-control" 
                            required>
                                <option defaultValue>Выберите...</option>
                                <option>Российская Федерация</option>
                                <option>Украина</option>
                                <option>Белоруссия</option>
                            </select>
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputZip">Индекс</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="inputZip"
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