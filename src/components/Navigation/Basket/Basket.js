import React from 'react';
import './Basket.scss';
import BasketImg from '../../../images/basket/basket.png';

const Basket = React.memo(({ basket }) => {
  return (
    <div className={basket.length ? 'basket basket--active' : 'basket'}>
      <img className={'basket__img'} src={BasketImg} alt="basket" />
    </div>
  );
});

export default Basket;
