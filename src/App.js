import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Pages/Home/Home';
import Navigation from './components/Navigation/Navigation';
import Shop from './components/Pages/Shop/Shop';
import ProductPage from './components/Pages/Shop/AdditionToShop/ProductPage';
import BasketPage from './components/Pages/BasketPage/BasketPage';
import FavoritePage from './components/Pages/FavoritePage/FavoritePage';
import { fetchProduct } from './components/Reducer/HomeReducer';
import { useDispatch, useSelector } from 'react-redux';

let App = React.memo(function App() {
  const dispatch = useDispatch();
  const { page, sort } = useSelector(({ HomeReducer }) => {
    return {
      page: HomeReducer.page,
      sort: HomeReducer.sort,
    };
  });

  React.useEffect(() => {
    dispatch(fetchProduct(page, sort));
  }, [page, sort]);

  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route path={'/home'} exact component={Home} />
        <Route path={'/shop'} exact component={Shop} />
        <Route path={'/shop/:id'} component={ProductPage} />
        <Route path={'/favorite'} exact component={FavoritePage} />
        <Route path={'/basket'} exact component={BasketPage} />
        <Redirect to={'/home'} />
      </Switch>
    </BrowserRouter>
  );
});

export default App;
