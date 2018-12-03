// import { takeLatest , call, put } from 'redux-saga/effects';
// import axios from 'axios';
import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

function* updateLocation(action) { 
    console.log('edit profile generator: ', action);
    try {
        const locationEdits = action.payload
        console.log('userEdits:', locationEdits);
        
        yield call(axios.put, `api/user/editLocation/${locationEdits.id}`, locationEdits);
        yield put({ type: 'FETCH_USER' })
    } 
    catch (error) {
        console.log('error confirm request generator', error);
    }
}

function* editLocationSaga() {
  yield takeEvery('EDIT_LOCATION', updateLocation);
}

export default editLocationSaga;