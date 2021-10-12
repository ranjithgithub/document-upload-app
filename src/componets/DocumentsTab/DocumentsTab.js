import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import TabPanel from '../TabPanel/TabPanel'
import UploadFiles from '../UploadFiles/UploadFiles'
import { fetchDocuments } from '../../store/documents/actions'

const a11yProps = index => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
} 

const DocumentsUpload = () => {
    const dispatch = useDispatch()
    const documentsData = useSelector((state) => state)

    const [value, setValue] = useState(0)
    const [fileName, setFileName] = useState('')

    useEffect(() => {
      dispatch(fetchDocuments())
    },[dispatch])
   
    const updateMessageTab = fileName => {
      setFileName(fileName)
    }

    const handleTabChange = (event, newValue) => setValue(newValue)
    
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleTabChange} aria-label="Documents Tab">
            <Tab label="Documents" {...a11yProps(0)} />
            <Tab label="Messages" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <UploadFiles updateMessageTab={updateMessageTab} documentsData={documentsData}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Stack sx={{ width: '100%' }} spacing={2}>
            { fileName && <Alert severity="success">{fileName} Uploaded successfully!</Alert> }
          </Stack>
        </TabPanel>
      </Box>
    )
}

export default DocumentsUpload