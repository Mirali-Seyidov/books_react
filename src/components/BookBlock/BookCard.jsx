import React from 'react';
import classNames from 'classnames';
import Button from '../Button';
import { useSelector, useDispatch } from 'react-redux';
import Another from './Another';

function BookCard(payload) {
  const { imageUrl, price, name, year, id, category, types, author, description, currentPrice, currentBook="" } = payload.location.state;
  const cartItems = useSelector(({ cart }) => cart.items);
  const availableTypes = ['Эксмо', 'Азбука'];
  const currTypes = currentBook === "" ? types : currentBook.types;
  const addedCount = cartItems[id] && cartItems[id].items.length;
  const [activeType, setActiveType] = React.useState(currTypes[0]);
  const dispatch = useDispatch();
  const handleAddBookToCart = (obj) => {
    dispatch({
      type: 'ADD_BOOK_CART',
      payload: obj,
    });
  };
  const items = useSelector(({ books }) => books.items);
  const onSelectType = (index) => {
    setActiveType(index);
  };
 
  const onAddBook = () => {
    console.log(price);
    const obj = {
      id,
      name,
      imageUrl,
      author,
      description,
      year,
      price,
      type: availableTypes[activeType],
      category,
    };
    handleAddBookToCart(obj);
  };
  const bookCard = {
    bBlock: {
      display: "block",
      padding: 50,
      marginBottom: 40,
      background: "white",
    },
    bImg: {
      float: "left",
      
    },
  };
  const bookButtons = {
    bSelector: {
      height: bookCard.bImg.maxHeight,
    },
  };
  const bookAnother = {
    pAnother: {
      clear: "both",
    },
  };
  console.log(category)
  return (
    <div className="book-block" style={bookCard.bBlock}>
      <img className="book-block__image" style={bookCard.bImg} src={imageUrl} alt="book" />
      <h4 className="book-block__title">{name}</h4>
      <div className="book-block__selector book-block__left" style={bookButtons.bSelector}>
        <ul>
        {availableTypes.map((type, index) => (
            <li
              key={type}
              onClick={() => onSelectType(index)}
              className={classNames({
                active: activeType === index,
                disabled: !currTypes.includes(index),
              })}>
              {type}
            </li>
          ))}
        </ul>
      
        
      </div>
      <div className="book-block__info">
      <h4 className="book-block__year">Год выпуска {year}</h4>
        <h4 className="book-block__card-author">Автор {author}</h4>
      <br />
      <p>{description}</p>

      </div>
      
      <div className="book-block__bottom" style={bookButtons.pBottom}>
        <div className="book-block__price">{price} AZN</div>
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
          <span>Добавить</span>
          {addedCount && <i>{addedCount}</i>}
        </Button>
      </div>
      <Another style={bookAnother.bAnother} id={id} currentPrice={currentPrice} category={category} name={name} handleAddBookToCart={handleAddBookToCart} />
    </div>
  );
}

export default BookCard;
