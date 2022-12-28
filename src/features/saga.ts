import { call, takeEvery, put } from "redux-saga/effects";
import Axios from "axios";
import { getUsersSuccess } from "./userReducer";

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
        yield put({ type: "TODO_FETCH_FAILED" });
    }
}

function* rootSaga() {
    yield takeEvery('users/getUsersFetch', fetchUsersSaga);
}

export default rootSaga