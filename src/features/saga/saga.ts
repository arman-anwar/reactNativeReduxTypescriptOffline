import { call, takeEvery, put, all, fork } from "redux-saga/effects";
import Axios from "axios";
import { createUserFailure, createUserSucess, delUserSuccess, getUsersSuccess, updateUserFailure, updateUserSuccess } from "../slice/userReducer";
import { createUserAPI, deleteUserAPI, fetchUserAPI, updateUserAPI } from "../../services/APIService";
import { networkSaga } from 'react-native-offline';
import {
    handleMetaNavigation,
} from '../../services/utils';

function* fetchUsersSaga() {
    try {
        const response = yield call(fetchUserAPI);

        yield put(getUsersSuccess(response.data));

    } catch (e) {
        console.error("Error fetch >>>>>> ", e)
        yield put({ type: "USERS_FETCH_FAILED" });
    }
}

function* createUsersSaga(action) {
    try {
        const { name, email, id } = action.payload;
        const result = yield call(createUserAPI, { name, email });
        const code = result.status;
        if (code === 201) {
            yield put(createUserSucess({
                user: result.data,
                offlineId: id < 0 ? id : null,
                queued: action.meta.queued
            }));

            return handleMetaNavigation(action.meta);
        }
        console.log('failure createUsersSaga >>', result.data);
        yield put(createUserFailure());
    } catch (e) {
        console.error("Error createUsersSaga >>>>>> ", e)
        yield put(createUserFailure());
    }
}

function* updateUsersSaga(action) {
    console.log('updateUsersSaga 22222222', action)

    try {
        const response = yield call(updateUserAPI, action.payload);
        const code = response.status;
        if (code === 200) {
            yield put(updateUserSuccess(response.data));
            return handleMetaNavigation(action.meta);
        }
        yield put(updateUserFailure());
        yield put(updateUserSuccess(response.data));
    } catch (err) {
        console.error("Error updateUsersSaga >>>>>>", err)
        // console.log(err.message);
        yield put(updateUserFailure());
    }
}


function* deleteUsersSaga(action) {
    try {
        const result = yield call(deleteUserAPI, action.payload);
        const code = result.status;

        if (result.status === 200) {
            yield put(delUserSuccess(action.payload));
            return handleMetaNavigation(action.meta);
        } else {
            console.log('deleted error > ', result.status)
            yield put({ type: "TODO_FETCH_FAILED" });
        }
    } catch (e) {
        console.error("Error delete >>>>>> ", e)
        yield put({ type: "TODO_FETCH_FAILED" });
    }
}

function* rootSaga() {
    yield all([

        yield takeEvery('users/getUsersRequest', fetchUsersSaga),
        yield takeEvery('users/createUserRequest', createUsersSaga),
        yield takeEvery('users/updateUserRequest', updateUsersSaga),
        yield takeEvery('users/delUser', deleteUsersSaga),
        fork(networkSaga),
    ]);


}

export default rootSaga