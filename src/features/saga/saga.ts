import { call, takeEvery, put } from "redux-saga/effects";
import Axios from "axios";
import { createUserSucess, delUserSuccess, getUsersSuccess, updateUserSuccess } from "../slice/userReducer";

let callAPI = async (config: { url: string, method?: string, data?: any }) => {
    return await Axios(config);
};

function* fetchUsersSaga() {
    try {
        let result = yield call(() =>
            callAPI({ url: "https://api-generator.retool.com/1tdqbQ/user" })
        );
        yield put(getUsersSuccess(result.data));
    } catch (e) {
        console.error("Error fetch >>>>>> ", e)
        yield put({ type: "USERS_FETCH_FAILED" });
    }
}

function* createUsersSaga(action) {
    console.log('action createUsersSaga >> ', action)
    try {
        let result = yield call(() =>
            callAPI({ url: "https://api-generator.retool.com/1tdqbQ/user", method: 'POST', data: action.payload })
        );
        yield put(createUserSucess(result.data));
    } catch (e) {
        console.error("Error createUsersSaga >>>>>> ", e)
        yield put({ type: "TODO_FETCH_FAILED" });
    }
}

function* updateUsersSaga(action) {
    console.log('updateUsersSaga started', action)

    try {
        let result = yield call(() =>
            callAPI({ url: `https://api-generator.retool.com/1tdqbQ/user/${action.payload.id}`, method: 'PUT', data: action.payload })
        );
        console.log('updateUsersSaga completed')
        yield put(updateUserSuccess(result.data));
    } catch (e) {
        console.error("Error updateUsersSaga >>>>>> ", e)
        yield put({ type: "TODO_FETCH_FAILED" });
    }
}


function* deleteUsersSaga(action) {
    try {
        let result = yield call(() =>
            callAPI({ url: `https://api-generator.retool.com/1tdqbQ/user/${action.payload}`, method: 'DELETE' })
        );
        if (result.status === 200) {
            yield put(delUserSuccess(action.payload));
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
    yield takeEvery('users/getUsersFetch', fetchUsersSaga);
    yield takeEvery('users/createUser', createUsersSaga);
    yield takeEvery('users/updateUser', updateUsersSaga);
    yield takeEvery('users/delUser', deleteUsersSaga);

}

export default rootSaga