import React, {Text} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BookBlock from './index';
function Another({category, id}) {
    const items = useSelector(({ books }) => books.items);
    const cartItems = useSelector(({ cart }) => cart.items);
    const dispatch = useDispatch();

    const handleAddBookToCart = (obj) => {
        dispatch({
          type: 'ADD_BOOK_CART',
          payload: obj,
        });
      };


      const bookOther = {
        pBlock: {
          clear: "both",
          marginTop: "100px",
        },
        pFlex: {
          display: "flex",
          clear: "both",
          flexWrap: "wrap",
          justifyContent: "space-around",
          marginTop: "50px",
        },
        pOther: {
          width: "30%",
        }
      };

  return (
    <div className="book-main" style={bookOther.pBlock}>
        <h2>Другие книги этого же жанра</h2>
        <div className="book-other" style={bookOther.pFlex}>
          {
          items.map((obj) => (
              (obj.category == category && obj.id !== id) ?
                <BookBlock
                  onClickAddbook={handleAddBookToCart}
                  key={obj.id}
                  addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                  {...obj}
                  pOther={bookOther.pOther}
                /> : console.log('false')
              ))
          }
        </div>
        
    </div>
  );
}

export default Another;
