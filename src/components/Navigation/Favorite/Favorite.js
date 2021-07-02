import React from 'react';
import './Favorite.scss';
import favoriteImg from '../../../images/body/favorite.png';

function Favorite({ favorite }) {
  return (
    <div className={favorite.length ? 'favorite favorite--active' : 'favorite'}>
      <img className={'favorite__img'} src={favoriteImg} alt="favorite" />
    </div>
  );
}

export default Favorite;
