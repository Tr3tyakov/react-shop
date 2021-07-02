import chooseCity from './cityList';

const TITLE = 'TITLE';
const MODAL = 'MODAL';
const CITY = 'CITY';
const VALUE = 'VALUE';
const PRODUCT__VALUE = 'PRODUCT__VALUE';
const CHANGE__MODAL = 'CHANGE__MODAL';

const IS__CLICKED = 'IS__CLICKED';

let defaultState = {
  title: 'Delivery',
  cityList: chooseCity.city,
  currentCity: 'Санкт-Петербург',
  inputValue: '',

  isOpenModal: false,
  productModal: [],
  inputProductValue: '',
  isClicked: false,
};

export default function ProductPageReducer(state = defaultState, action) {
  switch (action.type) {
    case TITLE:
      return { ...state, title: action.payload };
    case MODAL:
      return { ...state, isOpenModal: action.payload };
    case CITY:
      return { ...state, currentCity: action.payload };
    case VALUE:
      return { ...state, inputValue: action.payload };

    case PRODUCT__VALUE:
      return { ...state, inputProductValue: action.payload };

    case CHANGE__MODAL:
      return { ...state, productModal: action.payload };
    case IS__CLICKED:
      return { ...state, isClicked: action.payload };
    default:
      return state;
  }
}

export const ChangeTitle = (title) => ({ type: TITLE, payload: title });
export const ChangeBOOL = (bool) => ({ type: MODAL, payload: bool });
export const ChangeCity = (city) => ({ type: CITY, payload: city });
export const ChangeValue = (value) => ({ type: VALUE, payload: value });
export const ChangeClickOnLi = (bool) => ({ type: IS__CLICKED, payload: bool });

export const ChangeInputProductValue = (value) => ({
  type: PRODUCT__VALUE,
  payload: value,
});
export const ChangeModal = (value) => ({
  type: CHANGE__MODAL,
  payload: value,
});
