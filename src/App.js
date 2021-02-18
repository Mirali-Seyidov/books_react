import React from 'react';

import { BookCard, Header, Search } from './components';
import { Home, Cart } from './pages';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Route path="/" component={Home} exact />
        <Route path="/cart" component={Cart} exact />
        <Route path="/BookCard" component={BookCard} exact />
        <Route path="/Search" component={Search} exact />
      </div>
    </div>
  );
}

export default App;
