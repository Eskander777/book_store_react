import * as actionTypes from './actions';

const initialState = {
    completeOrder: {
        order: false,
        orderTotal: {
            totalPrice: 0,
            totalAmount: 0
        }
    }
}

const reducer = (state = initialState, action) => {
    if(action.type) {
        if (action.type === actionTypes.ADDED_TO_CART) {
            const amount = action.item.defaultAmountToBuy;
            const total = amount * action.item.price;
            const  pickedItem = {
                title: action.item.title,
                price: action.item.price,
                amount: amount,
                imageSrc: action.item.image,
                code: action.item.code,
                total: total
                };

            if (state.completeOrder.order) {
                const orderArray = [...state.completeOrder.order];
                const orderArrayTitles = orderArray.map(item => {
                    return (item.title);
                });
                const orderTotal = {...state.completeOrder.orderTotal};

                if (!orderArrayTitles.includes(pickedItem.title)) {
                    orderArray.push(pickedItem);

                    const updatedOrderTotalAmount = orderTotal.totalAmount + pickedItem.amount;
                    const updatedOrderTotalPrice = orderTotal.totalPrice + pickedItem.total;
                    const updatedOrderTotal = {
                        totalPrice: updatedOrderTotalPrice, 
                        totalAmount: updatedOrderTotalAmount
                    }
                    alert("Товар успешно добавлен!");

                    return {
                        ...state,
                        completeOrder: {
                            order: orderArray, 
                            orderTotal: updatedOrderTotal
                        }
                    }
                } else {
                    const itemToAddAmountIndex = orderArray.findIndex(i => {
                        return i.title === pickedItem.title;
                    })

                    const itemToAddAmount = orderArray[itemToAddAmountIndex];
                    const updatedAmount = itemToAddAmount.amount + pickedItem.amount;
                    itemToAddAmount.amount = updatedAmount;
                    const itemToAddTotalPrice = itemToAddAmount.amount * itemToAddAmount.price;
                    itemToAddAmount.total = itemToAddTotalPrice;
                    orderArray[itemToAddAmountIndex] = itemToAddAmount;

                    const updatedOrderTotalAmount = orderTotal.totalAmount + pickedItem.amount;
                    const updatedOrderTotalPrice = orderTotal.totalPrice + pickedItem.total;
                    const updatedOrderTotal = {
                        totalPrice: updatedOrderTotalPrice, 
                        totalAmount: updatedOrderTotalAmount
                    }

                    return {
                        ...state,
                        completeOrder: {
                            order: orderArray, 
                            orderTotal: updatedOrderTotal
                        }
                    }
                }
            } else {
                const orderArray = [];
                orderArray.push(pickedItem);
                
                alert("Товар успешно добавлен!");
                return {
                    ...state,
                    completeOrder: {
                        order: orderArray, 
                        orderTotal: {
                            totalPrice: pickedItem.total, 
                            totalAmount: pickedItem.amount
                        }
                    }
                }
            }
        } else if (action.type === actionTypes.REMOVED_FROM_CART) {
            const orderArray = [...state.completeOrder.order];
            const orderTotal = {...state.completeOrder.orderTotal};

            const updatedOrderArray = orderArray.filter(book => book.title !== action.titleToDelete)

            const updatedOrderTotalAmount = orderTotal.totalAmount - action.amountToDelete;
            const updatedOrderTotalPrice = orderTotal.totalPrice - action.sumToDelete;

            const updatedOrderTotal = {
                totalPrice: updatedOrderTotalPrice, 
                totalAmount: updatedOrderTotalAmount
            }

            return {
                ...state,
                completeOrder: {
                    order: updatedOrderArray, 
                    orderTotal: updatedOrderTotal
                }
            }
        } else if (action.type === actionTypes.AMOUNT_CHANGED) {
            const itemToChangeIndex = state.completeOrder.order.findIndex(i => {
                return i.title === action.changedAmountTitle;
            })
            const orderTotal = {...state.completeOrder.orderTotal};
    
            const item = {
                ...state.completeOrder.order[itemToChangeIndex]
            } 
    
            let updatedOrderTotalAmount = orderTotal.totalAmount - item.amount;
            let updatedOrderTotalPrice = orderTotal.totalPrice - item.total;
    
            let input = parseInt(action.changedAmount);
            if (isNaN(input) || input <= 0 || input >= 1000){
                input = 1;
            }
            item.amount = input;
    
            const itemTotalPrice = item.amount * item.price
            item.total = itemTotalPrice;
    
            const orderArray = [...state.completeOrder.order];
            orderArray[itemToChangeIndex] = item;
    
            updatedOrderTotalAmount += item.amount;
            updatedOrderTotalPrice += item.total;

            const updatedOrderTotal = {
                totalPrice: updatedOrderTotalPrice, 
                totalAmount: updatedOrderTotalAmount
            }

            return {
                ...state,
                completeOrder: {
                    order: orderArray, 
                    orderTotal: updatedOrderTotal
                }
            }
        }
    }
    return state;
}

export default reducer;