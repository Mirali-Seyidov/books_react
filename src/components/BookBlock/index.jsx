import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../Button';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function BookBlock({ id, description, year, name, author, imageUrl, price, types, pOther, value, addedCount, category }) {
  const availableTypes = ['Эксмо', 'Азбука'];
  console.log(description, name, id, year);
  const [currentPrice, setCurrentPrice] = React.useState(price);
  const [activeType, setActiveType] = React.useState(types[0]);
  const dispatch = useDispatch();
  console.log(id);
  const handleAddBookToCart = (obj) => {
    dispatch({
      type: 'ADD_BOOK_CART',
      payload: obj,
    });
  };
  const onSelectType = (index) => {
    setActiveType(index);
  };
  var aValue = value;

  useEffect(() => {
    aValue == "₽" ? setCurrentPrice(price) : setCurrentPrice(Math.round(price/75));
  }, [value]);

  const arrTypes = [];

  const onAddBook = () => {
    arrTypes.push(availableTypes[activeType]);
    const price = value == "$" ? currentPrice*75 : currentPrice; 
    const obj = {
      id,
      name,
      imageUrl,
      price,
      type: availableTypes[activeType],
    };
    handleAddBookToCart(obj);
  };
  const bookOther = {
    pNothing: {
    }
  };
  return (
    <div style={pOther ? pOther : bookOther.pNothing} className="book-block" >
     <Link to={{
       pathname: '/BookCard',
       state: {
         payload: "", name, year, author, imageUrl, id, description, price, types, addedCount, category, currentPrice, value
       }
     }}>
      <img className="book-block__image" src={imageUrl} alt="book" />
    </Link>
      <h4 className="book-block__title">{name}</h4>
      <h5 className="book-block__author">{author}</h5>
      <div className="book-block__selector">
        <ul>
          {availableTypes.map((type, index) => (
            <li
              key={type}
              onClick={() => onSelectType(index)}
              className={classNames({
                active: activeType === index,
                disabled: !types.includes(index),
              })}>
              {type}
            </li>
          ))}
        </ul>
      </div>
      <div className="book-block__bottom">
        <div className="book-block__price">от {currentPrice} {value}</div>
        <Button onClick={onAddBook} className="button--add" outline>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Перейти</span>
          {addedCount && <i>{addedCount}</i>}
        </Button>
      </div>
    </div>
  );
}

BookBlock.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  price: PropTypes.number,
  types: PropTypes.arrayOf(PropTypes.number),
  onClickAddbook: PropTypes.func,
  addedCount: PropTypes.number,
};

BookBlock.defaultProps = {
  name: '---',
  price: 0,
  types: [],
};

export default BookBlock;
