import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

// add seed to user's inventory table
function* submitRequest(action) {
    console.log('submitting request:', action);
    try {
        yield call(axios.post, '/api/messages', action.payload);
        yield put( { type: 'GET_INBOX' } );
    }
    catch (error) {
        console.log('error with add seed POST request', error);
    }
}

function* submitRequestSaga() {
    yield takeEvery( 'SUBMIT_REQUEST', submitRequest);
}

export default submitRequestSaga;