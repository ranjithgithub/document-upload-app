export const ACTION_GET_DOCUMENTS  = 'ACTION_GET_DOCUMENTS'
export const ACTION_SET_DOCUMENTS  = 'ACTION_SET_DOCUMENTS'
export const ACTION_SET_FAILURE  = 'ACTION_SET_FAILURE'
export const ACTION_UPLOAD_FILES  = 'ACTION_UPLOAD_FILES'
export const ACTION_SET_UPLOADED_FILES  = 'ACTION_SET_UPLOADED_FILES'

export const fetchDocuments = () => ({
    type: ACTION_GET_DOCUMENTS
})

export const setDocuments = documentsData => ({
    type: ACTION_SET_DOCUMENTS,
    documentsData
})

export const setFailureMessage = failureMessage => ({
    type: ACTION_SET_FAILURE,
    failureMessage
})

export const uploadFiles = payload => ({
    type: ACTION_UPLOAD_FILES,
    payload
})

export const setUploadedFiles = data => ({
    type: ACTION_SET_UPLOADED_FILES,
    data
})

