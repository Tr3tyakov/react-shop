import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink as Link } from 'react-router-dom';
import { AddProduct } from '../../../../Reducer/BasketReducer';
import { AddFavorite } from '../../../../Reducer/FavoriteReducer';
import '../../Home.scss';

import ring from '../../../../../images/shop/rings/Ring.png';

import ring1 from '../../../../../images/shop/rings/Ring1.png';
import ring2 from '../../../../../images/shop/rings/Ring2.png';

import favoriteImg from '../../../../../images/body/favorites.png';
import favoriteActive from '../../../../../images/body/favorites--acitve.png';

function Rings({ fetch, favorite, qty }) {
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
    dispatch(AddFavorite(fetch[0]));
  };
  const addProduct = (id) => {
    dispatch(AddProduct(1, fetch[id]));
  };

  return (
    <>
      <div className={'central'}>
        <div className={'ellipse'} style={{ backgroundColor: '#ECDEAC' }}>
          <img className={'ellipse__img'} src={ring} alt="Earrings" />
        </div>
      </div>
      <div className={'about'}>
        <h1 className={'about__title'}>
          The white gold ring with a diamond is perfect for lovers of stylish classics.
        </h1>
        <p className={'about__text'}>{fetch[0].about}</p>
        <div className={'about__price'}>{fetch[0].price + ' ₽'}</div>
        <div className={'btns'}>
          <div>
            <button
              className={BtnStyle(0, false, 'btns__add')}
              onClick={() => {
                addProduct(0);
              }}>
              {BtnStyle(0, true)}
            </button>
          </div>
          <div>
            <Link className="btns__link" to={'/shop'} onClick={() => {}}>
              start shopping
            </Link>
          </div>
          <div className={'favorites'} onClick={() => AddToFavorite()}>
            <img
              className={'img'}
              src={favorite.some((elem) => elem.id === fetch[0].id) ? favoriteActive : favoriteImg}
              alt="favorite"
            />
          </div>
        </div>
        <div className={'carts'}>
          <div className={'cart'} style={{ backgroundColor: '#ECDEAC' }}>
            <div>
              <h3 className={'cart__title'}>{fetch[7].title}</h3>
            </div>
            <div className={'cart__price'}>{fetch[7].price + ' ₽'}</div>
            <div>
              <button
                className={BtnStyle(7, false, 'cart__btn')}
                onClick={() => {
                  addProduct(7);
                }}>
                {BtnStyle(7, true)}
              </button>
            </div>
            <img
              className={'cart__img'}
              style={{ top: '0', right: '-50px' }}
              src={ring2}
              alt="watch"
            />
          </div>
          <div className={'cart'} style={{ backgroundColor: '#ECDEAC' }}>
            <div>
              <h3 className={'cart__title'}>{fetch[8].title}</h3>
            </div>
            <div className={'cart__price'}>{fetch[8].price + ' ₽'}</div>
            <div>
              <button
                className={BtnStyle(8, false, 'cart__btn')}
                onClick={() => {
                  addProduct(8);
                }}>
                {BtnStyle(8, true)}
              </button>
            </div>
            <img
              className={'cart__img'}
              style={{ top: '0', right: '-50px' }}
              src={ring1}
              alt="watch"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Rings;
