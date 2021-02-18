import React from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CartItem = ({ name, price, sizes, imageUrl, id, types, totalPrice, totalCount, onRemove, onMinus, onPlus }) => {
  const handleRemoveClick = () => {
    onRemove(id);
  };
  const cartItems = useSelector(({ cart }) => cart.items);

  const items = useSelector(({ books }) => books.items);
  const handlePlusItem = () => {
    onPlus(id);
  };
  var currentBook = "";
  const currentObj = items.map(arr => arr.name == name ? currentBook=arr : console.log("false"));
  const handleMinusItem = () => {
    onMinus(id);
  };
  const addedCount = cartItems[id] && cartItems[id].items.length
  const cartBlock = {
    cartImage: {
      minHeight: "290px",
    }
  };
  console.log(price, "цена")
  return (
    <div className="cart__item">
      <Link to={{
       pathname: '/BookCard',
       state: {
         payload: name, price, addedCount, sizes, imageUrl, id, totalPrice, types, totalCount, currentBook
       }
     }}>
        <div className="cart__item-img">
          <img
            className="book-block__image"
            src={imageUrl}
            style={cartBlock.cartImage}
            alt="book"
          />
        </div>
        <div className="cart__item-info">
          <h3>{name}</h3>
        </div>
      </Link>
      <div className="cart__item-count">
        <div
          onClick={handleMinusItem}
          className="button button--outline button--circle cart__item-count-minus">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
              fill="#EB5A1E"
            />
            <path
              d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
              fill="#EB5A1E"
            />
          </svg>
        </div>
        <b>{totalCount}</b>
        <div
          onClick={handlePlusItem}
          className="button button--outline button--circle cart__item-count-plus">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
              fill="#EB5A1E"
            />
            <path
              d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
              fill="#EB5A1E"
            />
          </svg>
        </div>
      </div>
      <div className="cart__item-price">
        <b>{totalPrice} ₽</b>
      </div>
      <div className="cart__item-remove">
        <Button onClick={handleRemoveClick} className="button--circle" outline>
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
              fill="#EB5A1E"
            />
            <path
              d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
              fill="#EB5A1E"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
