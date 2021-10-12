import {take, put} from 'redux-saga/effects'
import *as actions from './actions'
import axios from 'axios'

const API_GET_DOCUMNETS = 'http://localhost:5000/api/getDocuments'
const API_UPLOAD_FILE = 'http://localhost:5000/api/uploadFile'

export const watchGetDocumentsSaga =  function *() {
  while(1) {
    yield take(actions.ACTION_GET_DOCUMENTS)
    let response = {}
    try {
      response = yield axios(API_GET_DOCUMNETS, { method : 'GET'})
     const data = yield response.data
     if(response.status === 200) {
      yield put(actions.setDocuments(data.documents));
     } else {
      yield put(actions.setFailureMessage({failureMessage: true}));
     }
     
    } catch (e) {
      console.log(e)
    }
  }
}

export const watchUploadFileSaga =  function *() {
  while(1) {
    let action = yield take(actions.ACTION_UPLOAD_FILES)
    const {data, config} = action.payload
    let response = {}
    try {
      response = yield axios.put(API_UPLOAD_FILE, data, config)
      const file = data.get('file')
      const date = new Date(file.lastModified)
     if(response.status === 200) {
      yield put(actions.setUploadedFiles({
        "fileName": file.name,
        "url": `./${file.name}`,
        "timeStamp": `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
      }))
     } else {
      yield put(actions.setFailureMessage({failureMessage: true}));
     }
     
    } catch (e) {
      console.log(e)
    }
  }
}