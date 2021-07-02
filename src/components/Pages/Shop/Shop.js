import React from 'react';
import './Shop.scss';
import LoupeProduct from './AdditionToShop/LoupeProducts';
import { useSelector, useDispatch } from 'react-redux';
import ShopCategories from './AdditionToShop/ShopCategories';
import Product from './AdditionToShop/Product';
import { setSort } from '../../Reducer/HomeReducer';
import { AddFavorite } from '../../Reducer/FavoriteReducer';
import { AddProduct } from '../../Reducer/BasketReducer';
function Shop() {
  const dispatch = useDispatch();
  const { state, inputProductValue, isOpenModal, basket, productModal, isClicked, favorite, qty } =
    useSelector(({ HomeReducer, ProductPageReducer, BasketReducer, FavoriteReducer }) => {
      return {
        state: HomeReducer,
        favorite: FavoriteReducer.favorite,
        inputProductValue: ProductPageReducer.inputProductValue,
        isOpenModal: ProductPageReducer.isOpenModal,
        productModal: ProductPageReducer.productModal,
        isClicked: ProductPageReducer.isClicked,
        basket: BasketReducer.basket,
        qty: BasketReducer.qty,
      };
    });

  const addFavorite = (element) => {
    dispatch(AddFavorite(element));
  };
  const addProduct = (element) => {
    dispatch(AddProduct(1, element));
  };

  if (state.isLoading) {
    return (
      <div className={state.page === 'earrings' ? 'background-earrings' : 'background-watches'}>
        <div className="loading">
          <div className="loadingio-spinner-eclipse-e2sdyvuae0q">
            <div className="ldio-tltmi1hyzt">
              <div></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={'background'}></div>
      <div className={'container'}>
        <div className={'shop'}>
          <div className={'shop-navigation'}>
            <div className={'research'}>
              <LoupeProduct
                inputProductValue={inputProductValue}
                productModal={productModal}
                isClicked={isClicked}
                isOpenModal={isOpenModal}
                state={state}
                dispatch={dispatch}
              />
            </div>
            <h3 className={'shop-navigation__title'}>Categories</h3>
            <div className={'categories'}>
              <ShopCategories
                element={state.categories}
                inputProductValue={inputProductValue}
                isOpenModal={isOpenModal}
                page={state.page}
              />
            </div>
          </div>
          <div className={'shop-wrapper'}>
            <div className={'navigation-btns'}>
              <div>
                <button
                  className={
                    state.sort === 'asc'
                      ? 'navigation-btns__btn navigation-btns__btn--active'
                      : 'navigation-btns__btn'
                  }
                  onClick={() => {
                    dispatch(setSort('asc'));
                  }}>
                  Ascending price
                </button>
                <button
                  className={
                    state.sort === 'desc'
                      ? 'navigation-btns__btn navigation-btns__btn--active'
                      : 'navigation-btns__btn'
                  }
                  onClick={() => {
                    dispatch(setSort('desc'));
                  }}>
                  Descending price
                </button>
              </div>
            </div>
            <div className={'products'}>
              {state.fetch &&
                state.fetch.map((element, index) => {
                  return (
                    <Product
                      element={element}
                      basket={basket}
                      index={index}
                      key={index}
                      addProduct={addProduct}
                      addFavorite={addFavorite}
                      favorite={favorite}
                      qty={qty}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
