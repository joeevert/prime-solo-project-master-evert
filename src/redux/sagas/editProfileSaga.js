// import { takeLatest , call, put } from 'redux-saga/effects';
// import axios from 'axios';
import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

function* editProfile(action) { 
    console.log('edit profile generator: ', action);
    try {
        const userEdits = action.payload
        console.log('userEdits:', userEdits);
        
        yield call(axios.put, `api/user/editProfile/${userEdits.id}`, userEdits);
        yield put({ type: 'FETCH_USER' })
    } 
    catch (error) {
        console.log('error confirm request generator', error);
    }
}

function* editProfileSaga() {
  yield takeEvery('EDIT_PROFILE', editProfile);
}

export default editProfileSaga;