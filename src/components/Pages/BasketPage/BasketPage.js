import React from 'react';
import './BasketPage.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RemoveBasket } from '../../Reducer/BasketReducer';
import CurrentItem from './CurrentItem';
import { Link } from 'react-router-dom';

function BasketPage() {
  const dispatch = useDispatch();
  const { basket, totalPrice, totalProduct, qty } = useSelector(({ BasketReducer }) => {
    return {
      qty: BasketReducer.qty,
      basket: BasketReducer.basket,
      totalPrice: BasketReducer.totalPrice,
      totalProduct: BasketReducer.totalProduct,
    };
  });

  const DeleteProducts = () => {
    if (window.confirm('Are you sure, that you want to remove these products?')) {
      dispatch(RemoveBasket([]));
    }
  };

  if (basket.length === 0) {
    return (
      <>
        <div className="background"></div>
        <div className="basket__line">
          <div className="basket-empty">Your basket is empty</div>
        </div>
        <div className="basket__btn">
          <Link className="basket__go-back" to={'/shop'}>
            Вернуться назад
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="background"></div>
      <div className="container">
        <div className={'basket-title'}>
          <h2 className={'basket-title__title'}>Basket has {totalProduct} products</h2>
          <button
            className={'delete-all'}
            onClick={() => {
              DeleteProducts();
            }}>
            Delete all
          </button>
        </div>
        <div className={'hr-line'}></div>
        <div className={'products-wrapper'}>
          <div className={'product-basket'}>
            {basket.map((element, index) => {
              return <CurrentItem element={element} qty={qty} key={index} />;
            })}
          </div>
          <div className={'hr-line'} style={{ marginTop: '30px' }}></div>
        </div>
        <div className={'buy'}>
          <div className={'buy__btns'}>
            <h2 className={'total-price'}>
              Total price :{parseInt(totalPrice, 10).toLocaleString('ru') + ' ₽'}
            </h2>
            <button className={'checkout'}>Checkout</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default BasketPage;
