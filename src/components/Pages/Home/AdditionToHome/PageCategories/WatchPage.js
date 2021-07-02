import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import '../../Home.scss';
import { useDispatch } from 'react-redux';
import { AddProduct } from '../../../../Reducer/BasketReducer';
import { AddFavorite } from '../../../../Reducer/FavoriteReducer';

import watchImg from '../../../../../images/shop/watch/watch.png';
import watchImg1 from '../../../../../images/shop/watch/watch1.png';
import watchImg2 from '../../../../../images/shop/watch/watch2.png';
import favoriteImg from '../../../../../images/body/favorites.png';
import favoriteActive from '../../../../../images/body/favorites--acitve.png';

function WatchPage({ fetch, favorite, qty }) {
  const dispatch = useDispatch();

  let BtnStyle = (id, bool, classBlock) => {
    if (bool) {
      return qty.some((e) => e.id === fetch[id].id) ? 'Added' : 'Add to Cart';
    }

    return qty.some((e) => e.id === fetch[id].id)
      ? `${classBlock} ${classBlock}--active`
      : `${classBlock}`;
  };

  const AddToFavorite = () => {
    dispatch(AddFavorite(fetch[15]));
  };
  const addProduct = (id) => {
    dispatch(AddProduct(1, fetch[id]));
  };
  return (
    <>
      <div className={'central'}>
        <div className={'ellipse'}>
          <img className={'ellipse__img'} src={watchImg} alt="watch" />
        </div>
      </div>
      <div className={'about'}>
        <h1 className={'about__title'}>{fetch[15].title}</h1>
        <div className={'about__price'}>{fetch[15].price + ' ₽'}</div>
        <div className={'btns'}>
          <div>
            <button
              className={BtnStyle(15, false, 'btns__add')}
              onClick={() => {
                addProduct(15);
              }}>
              {BtnStyle(15, true)}
            </button>
          </div>
          <div>
            <Link className="btns__link" to={'/shop'}>
              start shopping
            </Link>
          </div>
          <div className={'favorites'} onClick={() => AddToFavorite()}>
            <img
              className={'img'}
              src={favorite.some((elem) => elem.id === fetch[15].id) ? favoriteActive : favoriteImg}
              alt="favorite"
            />
          </div>
        </div>
        <div className={'carts'}>
          <div className={'cart'}>
            <div>
              <h3 className={'cart__title'}>{fetch[14].title}</h3>
            </div>
            <div className={'cart__price'}>{fetch[14].price + ' ₽'}</div>
            <div>
              <button
                className={BtnStyle(14, false, 'cart__btn')}
                onClick={() => {
                  addProduct(14);
                }}>
                {BtnStyle(14, true)}
              </button>
            </div>
            <img className={'cart__img'} src={watchImg2} alt="watch" />
          </div>
          <div className={'cart'}>
            <div>
              <h3 className={'cart__title'}>{fetch[20].title}</h3>
            </div>
            <div className={'cart__price'}>{fetch[20].price + ' ₽'}</div>
            <div>
              <button
                className={BtnStyle(20, false, 'cart__btn')}
                onClick={() => {
                  addProduct(20);
                }}>
                {BtnStyle(20, true)}
              </button>
            </div>
            <img className={'cart__img'} src={watchImg1} alt="watch" />
          </div>
        </div>
      </div>
    </>
  );
}

export default WatchPage;
