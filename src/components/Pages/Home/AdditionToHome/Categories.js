import React from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../../../Reducer/HomeReducer';

const Categories = React.memo(({ element, page }) => {
  const dispatch = useDispatch();

  return element.map((category, index) => {
    return (
      <span
        className={page === category ? 'subtitles__subtitle active' : 'subtitles__subtitle'}
        onClick={(e) => {
          dispatch(setPage(e.target.innerHTML));
        }}
        key={index}>
        {category}
      </span>
    );
  });
});

export default Categories;
