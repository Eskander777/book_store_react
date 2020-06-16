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

const changeCartItemsNumber = (titleToChangeAmount, presentOrder) => {
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

          return {
            ...state,
            completeOrder: {
              order: orderArray,
              orderTotal: updatedOrderTotal,
            },
          };
        } else {
          const [itemToAddAmount, itemToAddAmountIndex] = changeCartItemsNumber(
            pickedItem.title,
            orderArray
          );

          const updatedAmount = itemToAddAmount.amount + pickedItem.amount;
          itemToAddAmount.amount = updatedAmount;
          const itemToAddTotalPrice =
            itemToAddAmount.amount * itemToAddAmount.price;
          itemToAddAmount.total = itemToAddTotalPrice;
          orderArray[itemToAddAmountIndex] = itemToAddAmount;

          const updatedOrderTotal = updateTotalAmount(
            pickedItem,
            orderTotal,
            '+'
          );

          alert(
            `Еще ${pickedItem.amount} единиц ${pickedItem.title} добавлено в корзину.`
          );

          return {
            ...state,
            completeOrder: {
              order: orderArray,
              orderTotal: updatedOrderTotal,
            },
          };
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
    case actionTypes.REMOVED_FROM_CART:
      console.log(action);
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

      return {
        ...state,
        completeOrder: {
          order: updatedOrderArray,
          orderTotal: updatedOrderTotal,
        },
      };
    case actionTypes.AMOUNT_CHANGED:
      let orderTotalToChange = { ...state.completeOrder.orderTotal };

      const [item, itemToChangeIndex] = changeCartItemsNumber(
        action.changedAmountTitle,
        state.completeOrder.order
      );

      let orderTotalAmountToUpdate =
        orderTotalToChange.totalAmount - item.amount;
      let orderTotalPriceToUpdate = orderTotalToChange.totalPrice - item.total;

      let input = parseInt(action.changedAmount);
      if (isNaN(input) || input <= 0 || input >= 1000) {
        input = 1;
      }
      item.amount = input;

      const itemTotalPrice = item.amount * item.price;
      item.total = itemTotalPrice;

      let orderArrayToUpdate = [...state.completeOrder.order];
      orderArrayToUpdate[itemToChangeIndex] = item;

      orderTotalAmountToUpdate += item.amount;
      orderTotalPriceToUpdate += item.total;

      let orderTotalToUpdate = {
        totalPrice: orderTotalPriceToUpdate,
        totalAmount: orderTotalAmountToUpdate,
      };

      return {
        ...state,
        completeOrder: {
          order: orderArrayToUpdate,
          orderTotal: orderTotalToUpdate,
        },
      };
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
