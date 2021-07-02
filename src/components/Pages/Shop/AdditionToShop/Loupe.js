import React from 'react';
import { useDispatch } from 'react-redux';
import { ChangeValue, ChangeBOOL, ChangeCity } from '../../../Reducer/ProductPageReducer';
import './Loupe.scss';

import Glass from '../../../../images/basket/glass.png';

function Loupe({ setHidden, cityList, inputValue }) {
  const dispatch = useDispatch();

  let filterCity = cityList.filter((element) => element.toLowerCase().includes(inputValue));

  return (
    <div className={'loupe'}>
      <input
        className={'find'}
        type="text"
        placeholder="Research"
        onChange={(e) => {
          e.preventDefault();
          dispatch(ChangeValue(e.target.value));
        }}
        value={inputValue}
      />
      <div className={inputValue ? 'popup-city popup-city--active' : 'popup-city'}>
        <ul>
          {filterCity.map((element, index) => {
            return (
              <li
                key={index}
                onClick={(e) => {
                  setHidden();
                  dispatch(ChangeBOOL(false));
                  dispatch(ChangeCity(e.target.innerHTML));
                  dispatch(ChangeValue(''));
                }}>
                {element}
              </li>
            );
          })}
        </ul>
      </div>
      <img className={'loupe-img'} src={Glass} alt="loupe" />
    </div>
  );
}

export default Loupe;
