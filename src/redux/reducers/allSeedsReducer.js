const allSeeds = (state = [], action) => {
    switch (action.type) {
      case 'SET_ALL_SEEDS':
        return action.payload;
      default:
        return state;
    }
  }

export default allSeeds;
