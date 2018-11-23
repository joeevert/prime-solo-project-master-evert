import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

// add seed to user's inventory table
function* addSeed(action) {
    console.log('add seed saga:', action);
    try {
        yield call(axios.post, '/api/seed_inventory', action.payload);
        yield put( { type: 'GET_SEEDS' } );
    }
    catch (error) {
        console.log('error with add seed POST request', error);
    }
}

// gets user's seed inventory
function* fetchSeeds(action) {
    console.log('fetching seeds generator: ', action);
    try {
      const response = yield call(axios.get, '/api/seed_inventory');
      yield put( { type: 'SET_SEEDS', payload: response.data } ); 
    }
    catch(error) {
      console.log('error in fetch seeds generator', error);
    }
}

function* seedSaga() {
    yield takeEvery( 'ADD_SEED', addSeed);
    yield takeEvery( 'GET_SEEDS', fetchSeeds);
}

export default seedSaga;