import * as actions from './actions'
//create a reducer
export function documentsReducer(state = [], action) {
    switch(action.type) {
        case actions.ACTION_SET_DOCUMENTS: 
            return action.documentsData
        case actions.ACTION_SET_UPLOADED_FILES: 
            return [...state, action.data]
        case actions.ACTION_SET_FAILURE: 
            return action.failureMessage
        default:
          return state
    }
}