import React from 'react';
import './Home.scss';
import Categories from './AdditionToHome/Categories';
import Page from './AdditionToHome/Page';
import { useSelector } from 'react-redux';
import { NavLink as Link } from 'react-router-dom';
import Circle from './AdditionToHome/Circle';

function Home() {
  const { state, favorite, qty } = useSelector(
    ({ HomeReducer, BasketReducer, FavoriteReducer }) => {
      return {
        state: HomeReducer,
        favorite: FavoriteReducer.favorite,
        qty: BasketReducer.qty,
      };
    },
  );

  if (state.isLoading) {
    return (
      <div
        className={
          state.page === 'earrings' || state.page === 'rings'
            ? 'background-earrings'
            : 'background-watches'
        }>
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
      <div
        className={
          state.page === 'earrings' || state.page === 'rings'
            ? 'background-earrings'
            : 'background-watches'
        }></div>
      <div className={'home-container'}>
        <div className={'main-content'}>
          <div className={'left-nav'}>
            <div className={'categories'}>
              <h3 className={'categories__title'}>Categories</h3>
            </div>
            <div className={'subtitles'}>
              <Categories element={state.categories} page={state.page} />
            </div>
            <div className={'categories-navigation'}>
              <Circle element={state.categories} page={state.page} />
            </div>
            <Link className={'btn-shop'} to={'/shop'}>
              Go to Shop
            </Link>
          </div>
          <Page page={state.page} fetch={state.fetch} favorite={favorite} qty={qty} />
        </div>
      </div>
    </>
  );
}

export default Home;
