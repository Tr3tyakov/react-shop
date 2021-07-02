import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddProduct } from '../../Reducer/BasketReducer';
import { AddFavorite } from '../../Reducer/FavoriteReducer';
import Product from '../Shop/AdditionToShop/Product';

function FavoritePage() {
  const dispatch = useDispatch();
  const { basket, favorite, qty } = useSelector(({ BasketReducer, FavoriteReducer }) => {
    return {
      basket: BasketReducer.basket,
      favorite: FavoriteReducer.favorite,
      qty: BasketReducer.qty,
    };
  });
  const addFavorite = (element) => {
    dispatch(AddFavorite(element));
  };
  const addProduct = (element) => {
    dispatch(AddProduct(1, element));
  };
  return (
    <>
      <div className={'background'}></div>
      <div className={'container'}>
        <div className={'products'}>
          {favorite &&
            favorite.map((element, index) => {
              return (
                <Product
                  element={element}
                  basket={basket}
                  index={index}
                  key={index}
                  addFavorite={addFavorite}
                  addProduct={addProduct}
                  qty={qty}
                  favorite={favorite}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}

export default FavoritePage;
