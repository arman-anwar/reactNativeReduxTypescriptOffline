import { call, takeEvery, put } from "redux-saga/effects";
import Axios from "axios";
import { createUser, delUser, getUsersSuccess, updateUser } from "../slice/userReducer";
import { CREATE_USER, DELETE_USER_BY_ID, GET_USERS, UPDATE_USER_BY_ID } from "../types";

let callAPI = async (config: { url: string, method?: string, data?: any }) => {
    return await Axios(config);
};

function* fetchUsersSaga() {
    // console.log('here >>>>>>>>')
    try {
        let result = yield call(() =>
            callAPI({ url: "https://api-generator.retool.com/1tdqbQ/user" })
        );
        // console.log("data >>>>>> ", result.data)
        yield put(getUsersSuccess(result.data));
    } catch (e) {
        console.error("Error fetch >>>>>> ", e)
        yield put({ type: "TODO_FETCH_FAILED" });
    }
}

function* createUsersSaga(action) {
    try {
        let result = yield call(() =>
            callAPI({ url: "https://api-generator.retool.com/1tdqbQ/user", method: 'POST', data: action.payload })
        );
        yield put(createUser(result.data));
    } catch (e) {
        console.error("Error createUsersSaga >>>>>> ", e)
        yield put({ type: "TODO_FETCH_FAILED" });
    }
}

function* updateUsersSaga(action) {
    try {
        let result = yield call(() =>
            callAPI({ url: `https://api-generator.retool.com/1tdqbQ/user/${action.payload.id}`, method: 'PUT', data: action.payload })
        );
        yield put(updateUser(result.data));
    } catch (e) {
        console.error("Error updateUsersSaga >>>>>> ", e)
        yield put({ type: "TODO_FETCH_FAILED" });
    }
}


function* deleteUsersSaga(action) {
    // console.log('delete', action)
    try {
        let result = yield call(() =>
            callAPI({ url: `https://api-generator.retool.com/1tdqbQ/user/${action.payload.id}`, method: 'DELETE' })
        );
        // console.log('deleted', result.data)
        yield put(delUser(action.payload.id));
    } catch (e) {
        console.error("Error delete >>>>>> ", e)
        yield put({ type: "TODO_FETCH_FAILED" });
    }
}

function* rootSaga() {
    yield takeEvery(GET_USERS, fetchUsersSaga);
    yield takeEvery(CREATE_USER, createUsersSaga);
    yield takeEvery(UPDATE_USER_BY_ID, updateUsersSaga);
    yield takeEvery(DELETE_USER_BY_ID, deleteUsersSaga);

}

export default rootSaga