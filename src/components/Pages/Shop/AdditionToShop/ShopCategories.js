import React from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../../../Reducer/HomeReducer';
import { ChangeBOOL, ChangeInputProductValue } from '../../../Reducer/ProductPageReducer';

const ShopCategories = React.memo(({ element, inputProductValue, isOpenModal, page }) => {
  const dispatch = useDispatch();

  return element.map((category, index) => {
    return (
      <div
        className={page === category ? 'shop-subtitle subtitle--active' : 'shop-subtitle'}
        onClick={() => {
          dispatch(setPage(category));
          if (inputProductValue) {
            dispatch(ChangeInputProductValue(''));
          }
          if (isOpenModal) {
            dispatch(ChangeBOOL(false));
          }
        }}
        key={index}>
        {category}
      </div>
    );
  });
});

export default ShopCategories;
