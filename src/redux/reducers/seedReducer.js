import { combineReducers } from 'redux';

const seed = (state = [], action) => {
    switch (action.type) {
      case 'SET_SEEDS':
        return action.payload;
      default:
        return state;
    }
}

export default seed;