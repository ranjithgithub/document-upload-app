import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import LinearProgress from '@material-ui/core/LinearProgress';
import { Box, Typography, Button, ListItem, withStyles } from '@material-ui/core';
import { uploadFiles } from '../../store/documents/actions'

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#EEEEEE",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);


const getFilesToRender = files => files.map((file, index) => {  
  return (
    <ListItem display="flex"
      divider
      key={index}>
      <a href={file.url} download={file.fileName}>{file.fileName}</a>
      <Box sx={{marginLeft:'10rem'}}>
        <Typography variant="span"> Date: {file.timeStamp} </Typography> 
      </Box>
    </ListItem>
  )
})

const UploadFiles =  ({updateMessageTab, documentsData}) => {

  const dispatch = useDispatch()

  const [selectedFiles, setSelectedFiles] = useState(undefined)
  const [currentFile, setCurrentFile] = useState(undefined)
  const [progress, setProgress] = useState(0)
  const [isError, setError] = useState(false)
  
  const validateFile = file => {
    let isError = false
    const fileExt = file?.name?.split('.').pop()
    isError = !(['docx', 'xlsx', 'xlsm', 'pdf'].includes(fileExt)) || Math.floor(file.size/1024/1024) > 5
    isError && setError(isError)
    return !isError
  }

  const handlesSelectFile = event => {
    const files = event.target.files
    validateFile(files[0]) && setSelectedFiles(event.target.files)
  }

  const handleUpload = () => {
    let data = new FormData()
    const config = {
      onUploadProgress: function(progressEvent) {
        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        setProgress(percentCompleted)
        percentCompleted === 100 && updateMessageTab(selectedFiles[0].name)
      }
    }
    
    data.append('file', selectedFiles[0])
    setCurrentFile(selectedFiles[0])
    dispatch(uploadFiles({data, config}))
  }
    
  return (
    <div className="mg20">
      {currentFile && (
        <Box className="mb25" display="flex" alignItems="center">
          <Box width="100%" mr={1}>
            <BorderLinearProgress variant="determinate" value={progress} />
          </Box>
          <Box minWidth={35}>
            <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
          </Box>
        </Box>)
      }
      <Box  display="flex">
      <label htmlFor="btn-upload">
        <input
          id="btn-upload"
          name="btn-upload"
          style={{ display: 'none' }}
          type="file"
          multiple={true}
          onChange={handlesSelectFile} />
        <Button
          className="btn-choose"
          variant="outlined"
          component="span" >
            {selectedFiles && selectedFiles.length > 0 ? selectedFiles[0].name : 'Choose File'}  
        </Button>
      </label>
      <Box sx={{marginLeft:'8rem'}}>
        <Button
          className="btn-upload"
          color="primary"
          variant="contained"
          component="span"
          disabled={!selectedFiles}
          onClick={handleUpload}>   
            UPLOAD
        </Button>
        </Box>
      </Box>
      <Stack sx={{ width: '100%' }} spacing={2}>
          { isError && <Alert severity="error">Invalid file</Alert> }
       </Stack>
      <Typography variant="h6" className="list-header">
        List of Files
      </Typography>
        {documentsData && getFilesToRender(documentsData)}
    </div >
  )
}
export default UploadFiles

























































