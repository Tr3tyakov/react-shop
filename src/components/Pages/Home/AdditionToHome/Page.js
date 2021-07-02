import React from 'react';
import WatchPage from './PageCategories/WatchPage';
import EarringsPage from './PageCategories/EarringsPage';
import Rings from './PageCategories/Rings';

function Page({ page, fetch, favorite, qty }) {
  if (page === 'watches') {
    return <WatchPage fetch={fetch} favorite={favorite} qty={qty} />;
  }
  if (page === 'earrings') {
    return <EarringsPage fetch={fetch} favorite={favorite} qty={qty} />;
  }
  return <Rings fetch={fetch} favorite={favorite} qty={qty} />;
}

export default Page;
