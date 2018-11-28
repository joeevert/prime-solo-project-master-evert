import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

// gets user's sent requests
function* fetchInbox(action) {
    console.log('fetch inbox generator: ', action);
    try {
      const response = yield call(axios.get, '/api/messages');
      yield put( { type: 'SET_INBOX', payload: response.data } ); 
    }
    catch(error) {
      console.log('error in fetch seeds generator', error);
    }
}

function* inboxSaga() {
    yield takeEvery( 'GET_INBOX', fetchInbox);
}

export default inboxSaga;