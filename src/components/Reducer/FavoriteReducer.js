const ADD__FAVORITE = 'ADD__FAVORIT';

let defaultState = { favorite: [] };

export default function FavoriteReducer(state = defaultState, action) {
  switch (action.type) {
    case ADD__FAVORITE: {
      const check = state.favorite.some((element) => {
        return element.id === action.payload.id;
      });

      if (check) {
        return {
          ...state,
          favorite: state.favorite.filter((element) => element !== action.payload),
        };
      }
      return { ...state, favorite: state.favorite.concat(action.payload) };
    }
    default:
      return state;
  }
}

export const AddFavorite = (favoriteProduct) => ({
  type: ADD__FAVORITE,
  payload: favoriteProduct,
});
