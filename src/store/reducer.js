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
    order: null,
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

const returnState = (state, orderArray, updatedOrderTotal) => {
  return {
    ...state,
    completeOrder: {
      order: orderArray,
      orderTotal: updatedOrderTotal,
    },
  };
};

const reducer = (state = initialState, action) => {
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

      if (state.completeOrder.order) {
        const orderArray = [...state.completeOrder.order];
        const orderArrayTitles = orderArray.map((item) => {
          return item.title;
        });
        const orderTotal = { ...state.completeOrder.orderTotal };

        if (!orderArrayTitles.includes(pickedItem.title)) {
          orderArray.push(pickedItem);

          const updatedOrderTotal = updateTotalAmount(
            pickedItem,
            orderTotal,
            '+'
          );
          alert('Товар успешно добавлен!');

          const stateToReturn = returnState(
            state,
            orderArray,
            updatedOrderTotal
          );

          return stateToReturn;
        } else {
          const [itemToAddAmount, itemToAddAmountIndex] = getItemAndIndex(
            pickedItem.title,
            orderArray
          );

          itemToAddAmount.amount += pickedItem.amount;
          itemToAddAmount.total = updateCartItem(itemToAddAmount);

          orderArray[itemToAddAmountIndex] = itemToAddAmount;

          const updatedOrderTotal = updateTotalAmount(
            pickedItem,
            orderTotal,
            '+'
          );

          alert(
            `Еще ${pickedItem.amount} единиц ${pickedItem.title} добавлено в корзину.`
          );

          const stateToReturn = returnState(
            state,
            orderArray,
            updatedOrderTotal
          );

          return stateToReturn;
        }
      } else {
        let newOrderArray = [];
        newOrderArray.push(pickedItem);

        alert('Товар успешно добавлен!');
        return {
          ...state,
          completeOrder: {
            order: newOrderArray,
            orderTotal: {
              totalPrice: pickedItem.total,
              totalAmount: pickedItem.amount,
            },
          },
        };
      }
    case actionTypes.REMOVED_FROM_CART: {
      const orderArray = [...state.completeOrder.order];
      let orderTotal = { ...state.completeOrder.orderTotal };

      const updatedOrderArray = orderArray.filter(
        (book) => book.title !== action.itemToDelete.title
      );

      const updatedOrderTotal = updateTotalAmount(
        action.itemToDelete,
        orderTotal,
        '-'
      );

      const stateToReturn = returnState(
        state,
        updatedOrderArray,
        updatedOrderTotal
      );

      return stateToReturn;
    }
    case actionTypes.AMOUNT_CHANGED: {
      let orderTotalToChange = { ...state.completeOrder.orderTotal };

      const [item, itemToChangeIndex] = getItemAndIndex(
        action.changedAmountTitle,
        state.completeOrder.order
      );

      const orderTotalRaw = updateTotalAmount(item, orderTotalToChange, '-');

      let input = parseInt(action.changedAmount);

      if (isNaN(input) || input <= 0 || input >= 1000) {
        input = 1;
      }
      item.amount = input;
      item.total = updateCartItem(item);

      let orderArrayToUpdate = [...state.completeOrder.order];
      orderArrayToUpdate[itemToChangeIndex] = item;

      const orderTotalToUpdate = updateTotalAmount(item, orderTotalRaw, '+');

      const stateToReturn = returnState(
        state,
        orderArrayToUpdate,
        orderTotalToUpdate
      );

      return stateToReturn;
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
};

export default reducer;
