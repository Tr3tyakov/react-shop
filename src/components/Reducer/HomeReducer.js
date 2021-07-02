import axios from 'axios';

const PAGE = 'PAGE';
const BOOL = 'BOOL';
const FETCH = 'FETCH';
const SORT = 'SORT';

let defaultState = {
  fetch: [],
  categories: ['watches', 'earrings', 'rings'],
  page: 'watches',
  sort: 'desc',
  isLoading: true,
};

export default function HomeReducer(state = defaultState, action) {
  switch (action.type) {
    case PAGE:
      return { ...state, page: action.payload };
    case BOOL:
      return { ...state, isLoading: action.payload };
    case FETCH:
      return { ...state, fetch: action.payload, isLoading: false };
    case SORT:
      return { ...state, sort: action.payload };
    default:
      return state;
  }
}

export const setPage = (page) => ({ type: PAGE, payload: page });
export const setLoading = (bool) => ({ type: BOOL, payload: bool });
export const setFetch = (fetch) => ({ type: FETCH, payload: fetch });
export const setSort = (string) => ({ type: SORT, payload: string });

export const fetchProduct = (page, sort) => (dispatch) => {
  dispatch(setLoading(true));
  axios.get(`/${page}?_sort=price&_order=${sort}`).then(({ data }) => {
    dispatch(setFetch(data));
  });
};
