import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Product.scss';
import { NavLink as Link } from 'react-router-dom';
import favoriteImg from '../../../../images/body/favorites.png';
import favoriteActive from '../../../../images/body/favorites--acitve.png';

const Product = React.memo(({ element, index, favorite, qty, addProduct, addFavorite }) => {
  let lastPrice = Math.floor((element.price / 100) * element.discount + element.price);
  let quantity = qty.find((el) => el.id === element.id);

  let BtnStyle = (bool, classBlock) => {
    if (bool) {
      return qty.some((e) => e.id === element.id) ? 'Added' : 'Add to Cart';
    }
    return qty.some((e) => e.id === element.id)
      ? `${classBlock} ${classBlock}--active`
      : `${classBlock}`;
  };

  let settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: false,
  };
  console.log(favorite);
  return (
    <div className={'product'}>
      <div className={element.discount !== null ? 'product__discount' : ''}>
        <p className={'text'}>{element.discount + '%'}</p>
      </div>
      <div className={'product__favorite'} onClick={() => addFavorite(element)}>
        <img
          className={'img'}
          src={favorite.some((elem) => elem.id === element.id) ? favoriteActive : favoriteImg}
          alt="favorite"
        />
      </div>
      <Link
        className={'product__img-area'}
        to={{
          pathname: `/shop/${element.id}`,
          state: { data: element },
          other: { price: lastPrice },
        }}>
        <Slider {...settings}>
          {Array.isArray(element.images) ? (
            element.images.map((element, index) => {
              return <img className={'product__img'} key={index} src={element} alt="earrings" />;
            })
          ) : (
            <img className={'product__img'} key={index} src={element.images} alt="Earrings" />
          )}
        </Slider>
      </Link>
      <div className={'product__about-area'}>
        <h3 className={'product__title'}>{element.name}</h3>
        <div className={'product__price'}>
          <div className={'product__first-price'}>{element.price.toLocaleString('ru') + ' ₽'}</div>
          <div className={'product__last-price'}>
            {element.price === lastPrice ? '' : lastPrice.toLocaleString('ru') + ' ₽'}
          </div>
        </div>
        <div>
          <button
            className={BtnStyle(false, 'product__btn')}
            onClick={() => {
              addProduct(element);
            }}>
            <div className={BtnStyle(false, 'product__count')}>
              <p className={'count'}>{quantity?.quantity}</p>
            </div>
            {BtnStyle(true)}
          </button>
        </div>
      </div>
    </div>
  );
});

export default Product;
