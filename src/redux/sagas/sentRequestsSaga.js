import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

// gets user's sent requests
function* fetchRequests(action) {
    console.log('fetching seeds generator: ', action);
    try {
      const response = yield call(axios.get, '/api/messages');
      yield put( { type: 'SET_SENT_REQUESTS', payload: response.data } ); 
    }
    catch(error) {
      console.log('error in fetch seeds generator', error);
    }
}

function* sentRequestsSaga() {
    yield takeEvery( 'GET_SENT_REQUESTS', fetchRequests);
}

export default sentRequestsSaga;