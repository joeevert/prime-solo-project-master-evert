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

// cancels request
function* cancelSeedRequest (action) {
  console.log('cancel seed request', action.payload);
  const messageId = action.payload
  try {
    yield call(axios.delete, `/api/messages/${messageId}`);
    yield put( { type: 'GET_INBOX' } );
  }
  catch(error) {
    console.log('error with delete request', error);
  }
}

function* inboxSaga() {
  yield takeEvery( 'GET_INBOX', fetchInbox);
  yield takeEvery( 'CANCEL_REQUEST', cancelSeedRequest)
}

export default inboxSaga;