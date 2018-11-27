const sentRequests = (state = [], action) => {
    switch (action.type) {
      case 'SET_SENT_REQUESTS':
        return action.payload;
      default:
        return state;
    }
}

export default sentRequests;