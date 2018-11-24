import { combineReducers } from 'redux';

const seed = (state = [], action) => {
    switch (action.type) {
      case 'SET_SEEDS':
        return action.payload;
      default:
        return state;
    }
}

const allSeeds = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_SEEDS':
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  seed,
  allSeeds,
});