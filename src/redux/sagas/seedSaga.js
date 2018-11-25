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

// gets all seeds inventory
function* fetchAllSeeds(action) {
    console.log('fetching all seeds generator: ', action);
    try {
      const response = yield call(axios.get, '/api/all_seeds');
      yield put( { type: 'SET_ALL_SEEDS', payload: response.data } ); 
    }
    catch(error) {
      console.log('error in fetch all seeds generator', error);
    }
}

// saga to deletes items from server
function* deleteSeed (action) {
    console.log('delete seed generator', action.payload);
    const seedid = action.payload
    try {
        yield call(axios.delete, `/api/seed_inventory/${seedid}`);
        yield put( { type: 'GET_SEEDS' } );
    }
    catch(error) {
        console.log('error with delete request', error);
    }
}

function* seedSaga() {
    yield takeEvery( 'ADD_SEED', addSeed);
    yield takeEvery( 'GET_SEEDS', fetchSeeds);
    yield takeEvery( 'GET_ALL_SEEDS', fetchAllSeeds);
    yield takeEvery( 'DELETE_SEED', deleteSeed);
}

export default seedSaga;