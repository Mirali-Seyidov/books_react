import { combineReducers } from 'redux';

import filters from './filters';
import books from './books';
import cart from './cart';

const rootReducer = combineReducers({
  filters,
  books,
  cart,
});

export default rootReducer;
