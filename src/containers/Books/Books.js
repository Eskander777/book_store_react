import React, {Component} from 'react';

import Aux from '../../hoc/Auxiliary';
import Book from '../../components/Book/Book';
import ModuleForImage from '../../components/ModuleForImage/ModuleForImage';
import classes from './Books.module.css';
import axios from '../../axios-work';

class Books extends Component {
    state = {
        goods: null,
        imageSrc: null,
        bookName: null,
        showImage: false
    }

    componentDidMount = () => {
        axios.get('/books.json')
        .then ((response) => {
          this.setState({goods: response.data});
        }).catch((error) => {console.log(error.message)});
    }

    
    imageClickedHandler = (event) => {
        this.setState({imageSrc: event.target.src, 
                       bookName: event.target.alt,
                       showImage: true});
    }

    closeImageHandler = () => {
        this.setState({showImage: false});
    }

    changeAmountHandler = (event, title) => {
        const bookAmountToChangeIndex = this.state.goods.findIndex(b => {
            return b.title === title;
        });

        const book =  {
            ...this.state.goods[bookAmountToChangeIndex]
        };

        let amount = parseInt(event.target.value);

        if (isNaN(amount) || amount <= 0 || amount >= 1000){
            amount = 1;
        };

        book.defaultAmountToBuy = amount;

        const goods = [...this.state.goods];
        goods[bookAmountToChangeIndex] = book;

        this.setState({goods: goods});
    }
    
    
    render() {

        let loaderStyle = {
            display: 'block'
        }

        let books;

        if (this.state.goods) {
            loaderStyle = {
                display: 'none'
            }
            books = this.state.goods.map(book => {
                return (
                    <Book 
                        book={book}
                        key={book.title}
                        imageClicked={this.imageClickedHandler}
                        addToCartClick={this.props.addToCart}
                        amountChange={(event) => this.changeAmountHandler(event, book.title)}
                    />
                )
            })
        }

        const booksCssClass = classes.Books + ' row no-gutters';

        return (
            <Aux>
                <div className={classes.Loader} style={loaderStyle} />

                <div className={booksCssClass}>
                    {books}         
                </div>

                <ModuleForImage 
                    imageSrc={this.state.imageSrc}  
                    bookName={this.state.bookName} 
                    showState={this.state.showImage}
                    closeClick={this.closeImageHandler} />
            </Aux>
        )
    }
}

export default Books;