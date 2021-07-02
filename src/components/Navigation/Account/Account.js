import React from 'react';
import './Account.scss';
const Account = React.memo(() => {
  return (
    <div className={'account'}>
      <p className={'account__title'}>Login</p>
    </div>
  );
});

export default Account;
