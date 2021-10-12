import DocumentsUpload from './componets/DocumentsTab/DocumentsTab'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AppBar from '@mui/material/AppBar'

const App = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar  position="static"> 
            <Typography align="center" variant="h4" color="inherit" component="div">
              Upload Files
            </Typography> 
          </AppBar>
          <DocumentsUpload />
        </Box>
    )
}


export default App