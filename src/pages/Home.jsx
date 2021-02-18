import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Categories, SortPopup, BookBlock, bookLoadingBlock } from '../components';

import { setCategory, setSortBy } from '../redux/actions/filters';
import { fetchBooks } from '../redux/actions/books';

const categoryNames = ['Fiction', 'Философия', 'Психология', 'История', 'Религия'];
const sortIems = [
  { name: 'популярности', type: 'popular', order: 'desc' },
  { name: 'цене', type: 'price', order: 'desc' },
  { name: 'алфавит', type: 'name', order: 'asc' },
];

function Home() {
  const dispatch = useDispatch();
  const items = useSelector(({ books }) => books.items);
  const cartItems = useSelector(({ cart }) => cart.items);
  const isLoaded = useSelector(({ books }) => books.isLoaded);
  const { category, sortBy } = useSelector(({ filters }) => filters);
  const [value, setValue] = React.useState("₽");
  const [currentPage, setCurrentPage] = React.useState(1);
  React.useEffect(() => {
    dispatch(fetchBooks(sortBy, category));
  }, [category, sortBy]);
  const setCurrentValue = () => {
    (value == "₽") ? setValue("$") : setValue("₽");
  }
  const onSelectCategory = React.useCallback((index) => {
    dispatch(setCategory(index));
  }, []);
  
  const onSelectSortType = React.useCallback((type) => {
    dispatch(setSortBy(type));
  }, []);

  const handleAddBookToCart = (obj) => {
    dispatch({
      type: 'ADD_BOOK_CART',
      payload: obj,
    });
  };
  const colorChange = (s, e) => {
    let nextSibling = e.target.nextElementSibling;
    let previousSibling = e.target.previousElementSibling;

    while(nextSibling) {
      nextSibling.style.textShadow = "black 0 0 0";
    nextSibling = nextSibling.nextElementSibling;
   }
while(previousSibling) {
    previousSibling.style.textShadow = "black 0 0 0";
    previousSibling = previousSibling.previousElementSibling;

   }
    if(s == currentPage) {
      e.target.style.textShadow = "red 0 0 3px";
      
    };
  } 
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={category}
          onClickCategory={onSelectCategory}
          items={categoryNames}
        />
      
      </div>
      
      <div className="content__high">
        <h2 className="content__title">Все книги </h2>
        <Link to={"/Search"}>
          <h2 className="content__price">🔍 в разделе {category == null ? "все" : categoryNames[category].toLowerCase() }</h2>
        </Link>
      </div>
      <div className="content__items">
        {isLoaded
          ? items.map((obj) => (
            (obj.id < currentPage*10 && obj.id > currentPage*10-10) || category != null ?
               <BookBlock
                 onClickAddBook={handleAddBookToCart}
                 key={obj.id}
                 addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                 {...obj}
                 value={value}
               /> : console.log("")
             ))
          : Array(12)
              .fill(0)
              .map((_, index) => <bookLoadingBlock key={index} />)}
      </div>
      <div className="content_pages">
          {
            items.map((obj) => (  
              (obj.id.toString().substring(obj.id.toString().length-1, obj.id.toString().length) == "0") ?
              <h1 className="content__header" onClick={e => {setCurrentPage(obj.id.toString()/10+1); const s = currentPage; colorChange(s, e);}}>{category == null ? obj.id.toString()/10+1 : false }</h1> : console.log("")
            ))
          }

      </div>
      
    </div>
  );
}

export default Home;
