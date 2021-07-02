const ADD__PRODUCT = 'ADD__PRODUCT';
const REMOVE__PRODUCT = 'REMOVE__PRODUCT';
const REMOVE__BASKET = 'REMOVE__BASKET';
const QUANTITY__MINUS = 'QUANTITY__MINUS';

let defaultState = {
  basket: [],
  qty: [],
  totalPrice: 0,
  totalProduct: 0,
};

export default function BasketReducer(state = defaultState, action) {
  switch (action.type) {
    case ADD__PRODUCT: {
      const check = state.qty.find((e) => e.id === action.payload.product.id);

      const totalPrice =
        state.qty &&
        state.qty.reduce((total, element) => {
          return total + element.price;
        }, action.payload.product.price);

      const totalProduct =
        state.qty &&
        state.qty.reduce((total, element) => {
          return total + element.quantity;
        }, action.payload.quantity);

      if (check) {
        return {
          ...state,
          qty: state.qty.map((element) => {
            return element.id === action.payload.product.id
              ? {
                  ...element,
                  quantity: element.quantity + action.payload.quantity,
                  price:
                    (element.quantity + action.payload.quantity) * action.payload.product.price,
                }
              : element;
          }),
          totalPrice,
          totalProduct,
        };
      }
      return {
        ...state,
        basket: state.basket.concat(action.payload.product),
        qty: [
          ...state.qty,
          {
            id: action.payload.product.id,
            quantity: action.payload.quantity,
            price: action.payload.product.price,
          },
        ],
        totalPrice,
        totalProduct,
      };
    }

    case QUANTITY__MINUS: {
      const quantity = state.qty.map((element) => {
        return element.id === action.payload.product.id
          ? {
              ...element,
              quantity: element.quantity - action.payload.quantity,
              price: (element.quantity - action.payload.quantity) * action.payload.product.price,
            }
          : element;
      });

      const totalPrice = quantity.reduce((total, element) => {
        return total + element.price;
      }, 0);

      const totalProduct = quantity.reduce((total, element) => {
        return total + element.quantity;
      }, 0);

      return {
        ...state,
        qty: state.qty.map((element) => {
          return element.id === action.payload.product.id
            ? {
                ...element,
                quantity: element.quantity - action.payload.quantity,
                price: (element.quantity - action.payload.quantity) * action.payload.product.price,
              }
            : element;
        }),
        totalPrice,
        totalProduct,
      };
    }

    case REMOVE__PRODUCT: {
      const quantity = state.qty.filter((element) => element.id !== action.payload.id);
      return {
        ...state,
        basket: state.basket.filter((element) => element.id !== action.payload.id),
        qty: quantity,
        totalProduct: quantity.reduce((total, element) => {
          return total + element.quantity;
        }, 0),
        totalPrice: quantity.reduce((total, element) => {
          return total + element.price;
        }, 0),
      };
    }

    case REMOVE__BASKET:
      return {
        ...state,
        basket: action.payload,
        qty: action.payload,
      };
    default:
      return state;
  }
}

export const AddProduct = (quantity, product) => ({
  type: ADD__PRODUCT,
  payload: {
    quantity,
    product,
  },
});
export const QuantityMinus = (quantity, product) => ({
  type: QUANTITY__MINUS,
  payload: {
    quantity,
    product,
  },
});

export const RemoveProduct = (product) => ({
  type: REMOVE__PRODUCT,
  payload: product,
});
export const RemoveBasket = (array) => ({
  type: REMOVE__BASKET,
  payload: array,
});
