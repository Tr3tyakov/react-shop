import React, { useEffect } from 'react';
import { fetchProduct, setFetch } from '../../../Reducer/HomeReducer';
import {
  ChangeBOOL,
  ChangeModal,
  ChangeInputProductValue,
  ChangeClickOnLi,
} from '../../../Reducer/ProductPageReducer';
import './Loupe.scss';

import Loupe from '../../../../images/basket/glass.png';

const LoupeProduct = React.memo(
  ({ state, inputProductValue, productModal, isClicked, isOpenModal, dispatch }) => {
    useEffect(() => {
      dispatch(
        ChangeModal(
          state.fetch.filter((element) =>
            element.name.toLowerCase().includes(inputProductValue.toLowerCase()),
          ),
        ),
      );
    }, [inputProductValue]);

    return (
      <div className={'loupe'}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}>
          <input
            className={'find'}
            type="text"
            placeholder="Research"
            onChange={(e) => {
              dispatch(ChangeInputProductValue(e.target.value.toLowerCase()));
              e.target.value === '' ? dispatch(ChangeBOOL(false)) : dispatch(ChangeBOOL(true));
            }}
            value={inputProductValue}
          />
          <button
            className={isClicked ? 'product__btn product__btn--active' : 'product__btn'}
            style={{ margin: '20px 0' }}
            onClick={() => {
              dispatch(setFetch(productModal));
              if (isOpenModal) {
                dispatch(ChangeBOOL(false));
              }
              if (isClicked) {
                dispatch(ChangeClickOnLi(false));
              }
            }}>
            Find
          </button>
        </form>
        <div
          className={isOpenModal ? 'popup-city popup-city--active' : 'popup-city'}
          style={{ top: '0px', right: '-246px' }}>
          <ul>
            {productModal.map((element, index) => {
              return (
                <li
                  key={index}
                  onClick={(e) => {
                    dispatch(ChangeBOOL(false));
                    dispatch(ChangeInputProductValue(e.target.innerHTML));
                    dispatch(ChangeClickOnLi(true));
                  }}>
                  {element.name}
                </li>
              );
            })}
          </ul>
        </div>
        {inputProductValue ? (
          <div
            className={'cross'}
            onClick={() => {
              dispatch(ChangeInputProductValue(''));
              if (isOpenModal) {
                dispatch(ChangeBOOL(false));
              }
              if (isClicked) {
                dispatch(ChangeClickOnLi(false));
              }
              dispatch(fetchProduct(state.page, state.sort));
            }}></div>
        ) : (
          <img className={'loupe-img'} src={Loupe} alt="loupe" />
        )}
      </div>
    );
  },
);

export default LoupeProduct;
