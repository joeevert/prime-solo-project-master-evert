import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

// add seed to user's inventory table
function* addSeed(action) {
    console.log('add seed generator:', action);
    try {
        yield call(axios.post, '/seedsinventory', action.payload);
        yield put( { type: 'FETCH_SEEDS' } );
    }
    catch (error) {
        console.log('error adding seed', error);
    }
}

// gets user's seed inventory
function* fetchSeeds(action) {
    console.log('fetching seeds generator: ', action);
    try {
      const response = yield call(axios.get, '/seedsinventory');
      yield put( { type: 'SET_SEEDS', payload: response.data } ); 
    }
    catch(error) {
      console.log('error in fetch seeds generator', error);
    }
}

function* seedSaga() {
    yield takeEvery( 'ADD_SEED', addSeed);
    yield takeEvery( 'FETCH_SEEDS', fetchSeeds);
}

export default seedSaga;