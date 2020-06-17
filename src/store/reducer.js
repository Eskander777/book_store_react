import * as actionTypes from './actions';

const initialState = {
  customer: {
    customerFirstName: '',
    customerLastName: '',
    inputEmail4: '',
    inputPassword4: '',
    inputAddress: '',
    inputCity: '',
    inputState: '',
    inputZip: '',
  },
  completeOrder: {
    order: [],
    orderTotal: {
      totalPrice: 0,
      totalAmount: 0,
    },
  },
};

const getItemAndIndex = (titleToChangeAmount, presentOrder) => {
  let item;
  let itemToChangeIndex;

  presentOrder.forEach((itm, idx) => {
    if (itm.title === titleToChangeAmount) {
      item = itm;
      itemToChangeIndex = idx;
    }
  });
  return [item, itemToChangeIndex];
};

const updateTotalAmount = (item, order, symbol) => {
  let updatedOrderTotalAmount;
  let updatedOrderTotalPrice;
  switch (symbol) {
    case '+':
      updatedOrderTotalAmount = order.totalAmount + item.amount;
      updatedOrderTotalPrice = order.totalPrice + item.total;
      break;
    case '-':
      updatedOrderTotalAmount = order.totalAmount - item.amount;
      updatedOrderTotalPrice = order.totalPrice - item.total;
      break;
    default:
      throw new Error('Something went wrong');
  }
  return {
    totalPrice: updatedOrderTotalPrice,
    totalAmount: updatedOrderTotalAmount,
  };
};

const updateCartItem = (item) => {
  const itemTotalPrice = item.amount * item.price;
  return itemTotalPrice;
};

const reducer = (state = initialState, action) => {
  let orderArray = [...state.completeOrder.order];
  let orderTotal = { ...state.completeOrder.orderTotal };

  switch (action.type) {
    case actionTypes.ADDED_TO_CART:
      const amount = action.item.defaultAmountToBuy;
      const total = amount * action.item.price;
      const pickedItem = {
        title: action.item.title,
        price: action.item.price,
        amount: amount,
        imageSrc: action.item.image,
        code: action.item.code,
        total: total,
      };

      if (orderArray.length > 0) {
        const orderArrayTitles = orderArray.map((item) => {
          return item.title;
        });
        if (!orderArrayTitles.includes(pickedItem.title)) {
          orderArray.push(pickedItem);
          orderTotal = updateTotalAmount(pickedItem, orderTotal, '+');
          alert('Товар успешно добавлен!');
        } else {
          const [itemToAddAmount, itemToAddAmountIndex] = getItemAndIndex(
            pickedItem.title,
            orderArray
          );
          itemToAddAmount.amount += pickedItem.amount;
          itemToAddAmount.total = updateCartItem(itemToAddAmount);
          orderArray[itemToAddAmountIndex] = itemToAddAmount;
          orderTotal = updateTotalAmount(pickedItem, orderTotal, '+');
          alert(
            `Еще ${pickedItem.amount} единиц ${pickedItem.title} добавлено в корзину.`
          );
        }
      } else {
        orderArray.push(pickedItem);
        orderTotal = updateTotalAmount(pickedItem, orderTotal, '+');
        alert('Товар успешно добавлен!');
      }
      break;
    case actionTypes.REMOVED_FROM_CART:
      const updatedOrderArray = orderArray.filter(
        (book) => book.title !== action.itemToDelete.title
      );
      orderArray = updatedOrderArray;
      orderTotal = updateTotalAmount(action.itemToDelete, orderTotal, '-');
      break;
    case actionTypes.AMOUNT_CHANGED: {
      const [item, itemToChangeIndex] = getItemAndIndex(
        action.changedAmountTitle,
        state.completeOrder.order
      );
      const orderTotalRaw = updateTotalAmount(item, orderTotal, '-');
      let input = parseInt(action.changedAmount);
      if (isNaN(input) || input <= 0 || input >= 1000) {
        input = 1;
      }
      item.amount = input;
      item.total = updateCartItem(item);
      orderArray[itemToChangeIndex] = item;
      orderTotal = updateTotalAmount(item, orderTotalRaw, '+');
      break;
    }
    case actionTypes.INPUT_CUSTOMER_DATA:
      const target = action.customerData.target;
      const customerObject = { ...state.customer };
      const paramToChange = target.name;
      const paramValue = target.value;
      customerObject[paramToChange] = paramValue;
      return {
        ...state,
        customer: customerObject,
      };
    default:
      return state;
  }
  return {
    ...state,
    completeOrder: {
      order: orderArray,
      orderTotal: orderTotal,
    },
  };
};

export default reducer;
