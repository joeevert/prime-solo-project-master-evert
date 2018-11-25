import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

function* setRequest(action){
    console.log('set request saga:', action)
    const seedid = action.payload
    try {
        const response = yield call(axios.get, `/api/seed_inventory/${seedid}`);
        yield put( {type: 'FETCH_SEED_REQUEST', payload: response.data} );
        console.log('request', response.data)
    }
    catch(error) {
        console.log('error with item requested GET request', error);
    }
}

function* requestSaga() {
    yield takeEvery( 'GET_SEED_REQUEST', setRequest);
}

export default requestSaga;