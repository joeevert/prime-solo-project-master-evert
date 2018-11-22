import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

function* fetchCategories(action){
    console.log('in fetchCategories')
    try {
        const response = yield call(axios.get, '/api/seed_category');
        yield put( {type: 'SET_CATEGORIES', payload: response.data} );
        console.log(response.data)
    }
    catch(error) {
        console.log('Error with categories GET request', error);
    }
}

function* seedSaga() {
    yield takeEvery( 'GET_CATEGORIES', fetchCategories);
}

export default seedSaga;