import { all } from 'redux-saga/effects';
import { watchJoin, watchLogin } from "./userSaga.ts";
import {watchAddTodo} from "./todoSaga.ts";

export default function* rootSaga() {
    yield all([watchJoin(), watchAddTodo(),watchLogin()])

}