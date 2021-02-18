import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BookBlock } from './index';
import { setCategory, setSortBy } from '../redux/actions/filters';


function Search() {
  const dispatch = useDispatch();
  const items = useSelector(({ books }) => books.items);
  const [searchValue, setSearchValue] = React.useState("a");
  const cartItems = useSelector(({ cart }) => cart.items);
  const console = (name) => {
    setSearchValue(name.target.value);
  }
  const onSelectCategory = React.useCallback((index) => {
    dispatch(setCategory(index));
  }, []);
  const handleAddBookToCart = (obj) => {
    dispatch({
      type: 'ADD_BOOK_CART',
      payload: obj,
    });
  };
  return (
    <div className="container">
      <input
        type='text'
        autoFocus
        className="search"
        placeholder="Вводите название книги"
        onChange={console}
      />
      <div className="foundItems">{        
         items.map((obj) => (
//            (obj.name.toLowerCase()[searchLength] == searchValue.toLowerCase()[searchLength]) ? 

            (obj.name.toLowerCase().substr(0, searchValue.length) == searchValue.toLowerCase()) ? 
            <div className="item"><BookBlock
                onClickAddBook={handleAddBookToCart}
                key={obj.id}
                addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                value="$"
                {...obj}/></div> : ""
        ))
      }</div>
    </div>
  );
}

export default Search;
