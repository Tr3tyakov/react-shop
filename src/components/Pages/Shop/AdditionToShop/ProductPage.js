import React, { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Product.scss';
import Slider from 'react-slick';
import { NavLink as Linkus, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ChangeTitle, ChangeBOOL } from '../../../Reducer/ProductPageReducer';
import CityModal from './CityModal';
import { AddProduct } from '../../../Reducer/BasketReducer';
import pencil from '../../../../images/body/pencil.png';

function ProductPage() {
  let location = useLocation();
  const dispatch = useDispatch();
  const { fetch, isOpenModal, title, inputValue, currentCity, cityList, qty,  } =
    useSelector(({ HomeReducer, BasketReducer, ProductPageReducer }) => ({
      fetch: HomeReducer.fetch,
      isOpenModal: ProductPageReducer.isOpenModal,
      title: ProductPageReducer.title,
      currentCity: ProductPageReducer.currentCity,
      cityList: ProductPageReducer.cityList,
      inputValue: ProductPageReducer.inputValue,
      qty: BasketReducer.qty,
    }));
  function setHidden() {
    if (document.body.style.overflow !== 'hidden') {
      document.body.style.overflow = 'hidden';
      document.body.style.marginRight = '15px';
    } else {
      document.body.style.overflowY = 'scroll';
      document.body.style.marginRight = '0';
    }
  }
  let lastPrice = Math.ceil(
    (location.state.data.price / 100) * location.state.data.discount + location.state.data.price,
  );

  let BtnStyle = (bool, classBlock, element) => {
    if (bool) {
      return qty.some((e) => e.id === element.id) ? 'Added' : 'Add to Cart';
    } else {
      return qty.some((e) => e.id === element.id)
        ? `${classBlock} ${classBlock}--active`
        : `${classBlock}`;
    }
  };

  const addProduct = (element) => {
    dispatch(AddProduct(1, element));
  };

  const scroll = () => {
    window.scroll(0, 0);
  };

  //reactSliderNav
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();

  let firstSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    arrows: true,
    draggable: true,
    className: 'secondSlider',
    focusOnSelect: true,
  };
  let SecondSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    draggable: true,
    className: 'firstSlider',
  };
  let ThirdSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    arrows: true,
    draggable: true,
    className: 'thirdSlider',
  };
  console.log(location.state.data.id);
  return (
    <>
      <div className={'background'}></div>
      <div className={'container'}>
        <div className={'current-product'}>
          <Slider {...firstSettings} asNavFor={nav2} ref={(slider1) => setNav1(slider1)}>
            {location.state.data.images.map((element, index) => {
              return <img className={'img-navigation'} src={element} alt="img" key={index} />;
            })}
          </Slider>

          <Slider asNavFor={nav1} ref={(slider2) => setNav2(slider2)} {...SecondSettings}>
            {location.state.data.images.map((element, index) => {
              return <img className={'main-img'} src={element} alt="img" key={index} />;
            })}
          </Slider>

          <div className={'current-product__about'}>
            <div>
              <h3 className={'current-product__title'}>{location.state.data.name}</h3>
              <p className={'current-product__subtitle'}>{location.state.data.title}</p>
              <h3 className={'current-product__articule'}>
                Articule: {location.state.data.articule}
              </h3>
              <div className="price">
                <span className={'current-product__price'}>
                  {location.state.data.price.toLocaleString('ru') + '₽'}
                </span>
                <span className={'current-product__lastPrice'}>
                  {location.state.data.price === lastPrice
                    ? ''
                    : lastPrice.toLocaleString('ru') + '₽'}
                </span>
              </div>
              <div className={'btn-wrapper'}>
                <button
                  className={BtnStyle(false, 'product__btn', location.state.data)}
                  onClick={() => {
                    addProduct(location.state.data);
                  }}>
                  {BtnStyle(true, '', location.state.data)}
                </button>
              </div>
            </div>
            <div className={'selects'} style={{ width: '100%' }}>
              <div className={'select'}>
                <ul className={'description'}>
                  <li
                    className={
                      title === 'Delivery'
                        ? 'description__title description--active'
                        : 'description__title'
                    }
                    onClick={(e) => {
                      dispatch(ChangeTitle(e.target.innerHTML));
                    }}>
                    Delivery
                  </li>
                  <li
                    className={
                      title === 'Payment'
                        ? 'description__title description--active'
                        : 'description__title'
                    }
                    onClick={(e) => {
                      dispatch(ChangeTitle(e.target.innerHTML));
                    }}>
                    Payment
                  </li>
                  <li
                    className={
                      title === 'Warranty and Returns'
                        ? 'description__title description--active'
                        : 'description__title'
                    }
                    onClick={(e) => {
                      dispatch(ChangeTitle(e.target.innerHTML));
                    }}>
                    Warranty and Returns
                  </li>
                </ul>
                {isOpenModal ? (
                  <CityModal setHidden={setHidden} cityList={cityList} inputValue={inputValue} />
                ) : (
                  ''
                )}
                <div
                  className={
                    title === 'Delivery'
                      ? 'description-popup description-popup--active'
                      : 'delivery-popup'
                  }>
                  <div className={'description__text text--active'}>
                    <div className={'description__your-city'}>Your sity is:&nbsp;</div>
                    <div style={{ display: 'flex' }}>
                      <div
                        style={{
                          textDecoration: 'underline',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          setHidden();
                          dispatch(ChangeBOOL(true));
                        }}>
                        {currentCity}
                      </div>
                      <div className="pencil">
                        <img className={'pencil__img'} src={pencil} alt="img" />
                      </div>
                    </div>
                  </div>
                  <div className="delivery-tags">
                    <div className="tag-item">
                      <p>Free shipping</p>
                    </div>
                    <div className="tag-item">
                      <p>Trying on the product before buying</p>
                    </div>
                  </div>
                </div>
                <div
                  className={
                    title === 'Payment'
                      ? 'description-popup description-popup--active'
                      : 'delivery-popup'
                  }>
                  <p className={'description__text'}>
                    Depending on the chosen delivery method, the following payment options are
                    available for the order: <br />
                    <br />
                    Online card Bonuses THANKS from Sberbank You can pay up to 99% of the order with
                    THANKS bonuses. <br />
                    <br />
                    Cash or card upon receipt For orders with delivery from partner stores and
                    self-pickup from TRETYAKOV flagship stores, only payment on delivery is
                    available.
                  </p>
                </div>
                <div
                  className={
                    title === 'Warranty and Returns'
                      ? 'description-popup description-popup--active'
                      : 'delivery-popup'
                  }>
                  <p className={'description__text'}>
                    The warranty period for all products except watches is 6 months. For steel
                    watches, the warranty period is set within 1 year from the date of purchase, for
                    jewelry watches - 3 years.
                    <br />
                    The return of jewelry, as well as jewelry and steel watches of proper quality,
                    as well as exchange for a similar product, is not carried out. In the event of a
                    defect, the buyer can send a return request by e-mail. The application is
                    considered in 3 working days.
                  </p>
                </div>
              </div>
              <div className={'select'}>
                <div className={'rewiews'}>
                  <span>Rewiews</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className={'other'}>
          <div className={'hr-line'}></div>
          <h2 className="section-title">Other products</h2>
          <Slider {...ThirdSettings}>
            {fetch &&
              fetch.map((element, index) => {
                let lastPriceProduct = Math.ceil(
                  (element.price / 100) * element.discount + element.price,
                );
                return (
                  <div className={'slider-product'} key={index}>
                    <div className={'product__img-area'}>
                      <img
                        className={'slider__img-product'}
                        src={element.images[0]}
                        alt="earrings"
                      />
                    </div>
                    <div className={'slider__about-area'}>
                      <div
                        className={element.discount !== null ? 'product__discount' : ''}
                        style={{ bottom: '82px' }}>
                        <p className={'text'}>
                          {element.discount !== null ? element.discount + '%' : ''}
                        </p>
                      </div>
                      <h3 className={'product__title'}>{element.name}</h3>
                      <div className={'product__price'}>
                        <span className={'product__first-price'}>
                          {element.price.toLocaleString('ru') + '₽'}
                        </span>
                        <span className={'product__last-price'}>
                          {element.price === lastPriceProduct
                            ? ''
                            : lastPriceProduct.toLocaleString('ru')}
                        </span>
                      </div>
                      <div>
                        <button
                          className={BtnStyle(false, 'product__btn', element)}
                          onClick={() => {
                            addProduct(element);
                          }}>
                          {BtnStyle(true, '', element)}
                        </button>
                      </div>
                      <div className={'full-info'}>
                        <Linkus
                          to={{
                            pathname: `/shop/${element.id}`,
                            state: { data: element },
                          }}
                          className={'show-more'}
                          onClick={() => {
                            scroll();
                            window.scroll(0, 0);
                          }}>
                          Show more
                        </Linkus>
                      </div>
                    </div>
                  </div>
                );
              })}
          </Slider>
        </section>
      </div>
    </>
  );
}

export default ProductPage;
