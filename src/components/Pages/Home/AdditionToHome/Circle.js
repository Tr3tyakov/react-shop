import React from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../../../Reducer/HomeReducer';

const Circle = React.memo(({ element, page }) => {
  let dispatch = useDispatch();
  return element.map((circle, index) => {
    return (
      <div
        className={
          page === circle
            ? 'categories-navigation__circle circle--active'
            : 'categories-navigation__circle'
        }
        onClick={() => {
          dispatch(setPage(circle));
        }}
        key={index}></div>
    );
  });
});

export default Circle;
