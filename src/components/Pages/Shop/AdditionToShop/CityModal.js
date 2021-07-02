import React from 'react';
import { useDispatch } from 'react-redux';
import { ChangeBOOL, ChangeCity } from '../../../Reducer/ProductPageReducer';
import './CityModal.scss';
import Loupe from './Loupe';

function CityModal({ setHidden, cityList, inputValue }) {
  const dispatch = useDispatch();

  return (
    <div
      className="modal"
      onClick={() => {
        setHidden();
        dispatch(ChangeBOOL(false));
      }}>
      <div
        className={'modal__body'}
        onClick={(e) => {
          e.stopPropagation();
        }}>
        <div
          className={'modal__cross'}
          onClick={() => {
            setHidden();
            dispatch(ChangeBOOL(false));
          }}></div>
        <h2 style={{ margin: '0 0 20px 0' }}>Choose Your City</h2>
        <Loupe setHidden={setHidden} cityList={cityList} inputValue={inputValue} />
        <ul className={'city-list'}>
          {cityList.map((element, index) => {
            return (
              <li
                className={'city-list__city'}
                key={index}
                onClick={(e) => {
                  setHidden();
                  dispatch(ChangeBOOL(false));
                  dispatch(ChangeCity(e.target.innerHTML));
                }}>
                {element}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default CityModal;
