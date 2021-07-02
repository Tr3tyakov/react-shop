import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink as Link } from 'react-router-dom';
import { AddProduct } from '../../../../Reducer/BasketReducer';
import { AddFavorite } from '../../../../Reducer/FavoriteReducer';
import '../../Home.scss';

import earringsImg from '../../../../../images/shop/earrings/Earrings.png';
import earringsImg1 from '../../../../../images/shop/earrings/Earrings1.png';
import earringsImg2 from '../../../../../images/shop/earrings/Earrings2.png';
import favoriteImg from '../../../../../images/body/favorites.png';
import favoriteActive from '../../../../../images/body/favorites--acitve.png';

function EarringsPage({ fetch, favorite, qty }) {
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
        <div className={'ellipse'} style={{ backgroundColor: '#ECDEAC' }}>
          <img className={'ellipse__img'} src={earringsImg} alt="Earrings" />
        </div>
      </div>
      <div className={'about'}>
        <h1 className={'about__title'}>
          Classic white gold diamond earrings should be in every jewelry box.
        </h1>
        <p className={'about__text'}>{fetch[15].about}</p>
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
            <Link className="btns__link" to={'/shop'} onClick={() => {}}>
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
          <div className={'cart'} style={{ backgroundColor: '#ECDEAC' }}>
            <div>
              <h3 className={'cart__title'}>{fetch[9].title}</h3>
            </div>
            <div className={'cart__price'}>{fetch[9].price + ' ₽'}</div>
            <div>
              <button
                className={BtnStyle(9, false, 'cart__btn')}
                onClick={() => {
                  addProduct(9);
                }}>
                {BtnStyle(9, true)}
              </button>
            </div>
            <img className={'cart__img'} style={{ top: '-30px' }} src={earringsImg2} alt="watch" />
          </div>
          <div className={'cart'} style={{ backgroundColor: '#ECDEAC' }}>
            <div>
              <h3 className={'cart__title'}>{fetch[10].title}</h3>
            </div>
            <div className={'cart__price'}>{fetch[10].price + ' ₽'}</div>
            <div>
              <button
                className={BtnStyle(10, false, 'cart__btn')}
                onClick={() => {
                  addProduct(10);
                }}>
                {BtnStyle(10, true)}
              </button>
            </div>
            <img className={'cart__img'} style={{ top: '-30px' }} src={earringsImg1} alt="watch" />
          </div>
        </div>
      </div>
    </>
  );
}

export default EarringsPage;
