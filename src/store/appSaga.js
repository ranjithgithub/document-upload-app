
import {createStore, applyMiddleware} from 'redux'
import 'regenerator-runtime/runtime'
import createSagaMiddleware from 'redux-saga'
import {fork, all } from 'redux-saga/effects'
import { watchGetDocumentsSaga, watchUploadFileSaga } from './documents/saga'
import { documentsReducer } from './documents/reducer'


function *rootSaga(){
    yield all([
      fork (watchGetDocumentsSaga),
      fork (watchUploadFileSaga)
    ])
}

export const createAppStore = () => {
    const sagaMiddleware = createSagaMiddleware()
    const appStore =  createStore(documentsReducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga)
    return appStore
}
