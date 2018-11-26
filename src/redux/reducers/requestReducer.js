const request = (state = {}, action) => {
    switch (action.type) {
      case 'FETCH_SEED_REQUEST':
        return action.payload;
      default:
        return state;
    }
}

export default request;