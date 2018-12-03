import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import seedSaga from './seedSaga';
import categorySaga from './categorySaga';
import requestSaga from './requestSaga';
import submitRequestSaga from './submitRequestSaga';
import inboxSaga from './inboxSaga';
import confirmSaga from './confirmSaga';
import editProfileSaga from './editProfileSaga';
import updateLocationSage from './updateLocationSaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {  
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    seedSaga(),
    categorySaga(),
    requestSaga(),
    submitRequestSaga(),
    inboxSaga(),
    confirmSaga(),
    editProfileSaga(),
    updateLocationSage()
  ]);
}
