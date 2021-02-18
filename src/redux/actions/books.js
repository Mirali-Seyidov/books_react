import axios from 'axios';

export const setLoaded = (payload) => ({
  type: 'SET_LOADED',
  payload,
});

export const fetchBooks = (sortBy, category) => (dispatch) => {
  dispatch({
    type: 'SET_LOADED',
    payload: false,
  });

  axios
    .get(
      `/books?${category !== null ? `category=${category}` : ''}&_sort=${sortBy.type}&_order=${
        sortBy.order
      }`,
    )
    .then(({ data }) => {
      dispatch(setBooks(data));
    });
};

export const setBooks = (items) => ({
  type: 'SET_BOOKS',
  payload: items,
});
