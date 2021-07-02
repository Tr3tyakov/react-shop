import React from 'react';
import Slider from 'react-slick';
import './BasketPage.scss';

import plus from '../../../images/shop/plus--active.png';
import minus from '../../../images/shop/minus--active.png';
import minusDisable from '../../../images/shop/minus.png';

import { useDispatch } from 'react-redux';
import { AddProduct, QuantityMinus, RemoveProduct } from '../../Reducer/BasketReducer';

function CurrentItem({ element, qty }) {
  const dispatch = useDispatch();

  const { quantity, price } = qty.find((e) => e.id === element.id);

  let settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    draggable: true,
    className: 'basketSlider',
  };

  function removeProduct() {
    if (window.confirm('Are you sure, that you want to remove this product?')) {
      dispatch(RemoveProduct(element));
    }
  }
  function addProduct() {
    dispatch(AddProduct(1, element));
  }
  function quantityMinus() {
    if (quantity === 1) {
      return;
    }
    dispatch(QuantityMinus(1, element));
  }
  return (
    <div className={'current-item'}>
      <Slider {...settings}>
        {element.images &&
          element.images.map((element, index) => {
            return <img className="current-item__img" src={element} alt="img" key={index} />;
          })}
      </Slider>

      <div className={'current-item__about'}>
        <div className={'current-item__description'}>
          <h3 className={'item-title'}>{element.name}</h3>
          <div className={'choose-amount'}>
            <button
              className={
                quantity === 1 ? 'choose-amount__bar minus--disable' : 'choose-amount__bar'
              }
              onClick={() => quantityMinus()}>
              <img className={'minus'} src={quantity === 1 ? minusDisable : minus} alt="minus" />
            </button>
            <input type="number" value={quantity} />
            <button className="choose-amount__bar" onClick={() => addProduct()}>
              <img className={'plus'} src={plus} alt="plus" />
            </button>
          </div>
          <p className={'item-price'}>{price.toLocaleString('ru') + ' ₽'}</p>
          <div className={'product-cross'} onClick={() => removeProduct()}></div>
        </div>
      </div>
    </div>
  );
}

export default CurrentItem;
