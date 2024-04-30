import { Box, CircularProgress, Typography } from "@mui/material"
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import ProgressBar from 'react-bootstrap/ProgressBar';


import GmailLogo from '../../assets/Gmail_2023.gif'

 import './SuspenseLoader.css'





const SuspenseLoader = () => {



 
  
  return (
    <Box>
{/*       
        <CircularProgress/>
        <Typography>Loading...</Typography> */}
        

      <Container className="Containerloading"> 
      
       <div className="imgBox gif-container play" >
      <Image src={GmailLogo} rounded />
      </div>
      <div className="progressBar">
            <span></span>
        </div>
        <div className="titleBox">
            Google Workspace
        </div> 
        
       </Container>
      </Box>
  )
}

export default SuspenseLoader