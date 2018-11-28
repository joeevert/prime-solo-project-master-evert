import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

// gets user's sent requests
function* confirmRequest(action) {
    console.log('confirm request generator: ', action);
    try {
      const itemId = action.payload
      yield call(axios.put, `/api/messages/${itemId}`);
      yield put( { type: 'GET_INBOX' } ); 
    }
    catch(error) {
      console.log('error confirm request generator', error);
    }
}

function* confirmSaga() {
    yield takeEvery( 'CONFIRM_REQUEST', confirmRequest);
}

export default confirmSaga;