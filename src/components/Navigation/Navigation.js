import React from 'react';
import './Navigation.scss';
import { NavLink as Link } from 'react-router-dom';
import Basket from './Basket/Basket';
import Account from './Account/Account';
import Favorite from './Favorite/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../Reducer/HomeReducer';

function Navigation() {
  const dispatch = useDispatch();
  const { basket, favorite, sort } = useSelector(
    ({ HomeReducer, BasketReducer, FavoriteReducer }) => {
      return {
        basket: BasketReducer.basket,
        favorite: FavoriteReducer.favorite,
        sort: HomeReducer.sort,
      };
    },
  );
  console.log(sort);
  const changeSortPrice = () => {
    if (sort === 'asc') {
      dispatch(setSort('desc'));
    }
  };
  return (
    <div className={'header'}>
      <div className={'header__container'}>
        <div className={'logo'}>
          <Link to={'/home'}>
            <strong>TRETYAKOV</strong>:STORE
          </Link>
        </div>
        <div className={'navigation'}>
          <ul className={'list'}>
            <li className={'list__item'}>
              <Link className={'list__link'} to={'/home'} onClick={() => changeSortPrice()}>
                Home
              </Link>
            </li>
            <li className={'list__item'}>
              <Link className={'list__link'} to={'/shop'}>
                Shop
              </Link>
            </li>
          </ul>
        </div>
        <div className={'main'}>
          <Link to={'/favorite'}>
            <Favorite favorite={favorite} />
          </Link>
          <Link to={'/basket'}>
            <Basket basket={basket} />
          </Link>
          <Account />
        </div>
      </div>
    </div>
  );
}

export default Navigation;
