import { Box, Checkbox, List } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import Emailed from "./Emailed";
import NoMails from "./common/NoMails";
import { EMPTY_TABS } from "../utils/constant";
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes'
import toast from 'react-hot-toast';
import InboxIcon from '@mui/icons-material/Inbox';
import GroupIcon from '@mui/icons-material/Group';
import SellIcon from '@mui/icons-material/Sell';
import RefreshIcon from '@mui/icons-material/Refresh';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAuthContext } from "../Contexts/AuthContext";
import useLogout from '../hooks/useLogout'
const Emails = () => {
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [refreshScreen, setRefreshScreen] = useState(false);
  
 
    let logout = useLogout()
  const { openDrawer } = useOutletContext();

  const { type } = useParams();
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn, decodedToken,isExpired } = useAuthContext();
  const Email= decodedToken?decodedToken.email:"";
  const UserName=  decodedToken?decodedToken.name:"";

 
  useEffect(() => {
 
fetchData();
  }, [type, refreshScreen]);

  const fetchData = async () => {
  
    try{
    setResponse(null);
    setError("");
    setIsLoading(true);
    
    let res = await AxiosService.get(`${ApiRoutes.GetEmailFromType.path}/${type}/${Email}`,{
      authenticate:ApiRoutes.USERS.authenticate
    })

    console.log(res.status)
    if(res.status===200)
    {
      setResponse(res.data);
   
    }
    else{
      
      toast.success(res.status)
    }
  }catch (error) {
    setError(error.message);
    
    if(error.response.status===402){
      toast.error(error.response.data.message)
    logout()

       }else{
        toast.error(error.message)
       }

  } finally {
    setIsLoading(false);
  }
  return { response, error, isLoading };
}



  const selectAllEmails = async(e) => {
    if (e.target.checked) {
     
      
      const emails =response?.map((email) => email._id);
      setSelectedEmails(emails);
    } else {
      setSelectedEmails([]);
    }
  };



  const deleteSelectedEmails = async(e) => {
    try{
    if (type === "bin") {
   

      let res = await AxiosService.post(ApiRoutes.DeleteEmails.path,{selectedEmails,Email},{
        authenticate:ApiRoutes.DeleteEmails.authenticate
      })
      console.log(res.status)
      if(res.status===200)
      {
          
         toast.success(res.data.message)
      }
      else{
        toast.success(res.data.message)
      }
  
    } else {
  
      let res = await AxiosService.post(ApiRoutes.MoveEmailsToBin.path,{selectedEmails,Email},{
        authenticate:ApiRoutes.MoveEmailsToBin.authenticate
      })
      if(res.status===200)
      {
         
         toast.success(res.data.message)
      }
      else{
        toast.success(res.data.message)
      }
  
    }
    setRefreshScreen((prevState) => !prevState);
  }catch (error) {
    setError(error.message);
    
    if(error.response.status===402){
      toast.error(error.response.data.message)
    logout()

       }else{
        toast.error(error.message)
       }

  } 
  };


  return (
    <Box 
      style={
        openDrawer
          ? { marginLeft: 250, width: "calc(100% - 250px)" }
          : { width: "100%" }
      }
    >
      <Box 
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px 10px 0px 10px",
        }}
      >
        <Checkbox className="pl18" size="small" onChange={(e) => selectAllEmails(e)} />
        <DeleteOutline  className="pl18" onClick={(e) => deleteSelectedEmails(e)} />
         <RefreshIcon  className="pl18" onClick={(e) => fetchData()} />
         <MoreVertIcon  className="pl18"/>
      </Box>
     { type=="inbox"?<Box>
      <div className="emailList__sections">
          <div className="emailsection section__selected">
          {/* <div className="emailsection"> */}
            {/* <span className="material-icons"> inbox </span> */}
            
            <InboxIcon style={{marginRight:"10px"}} /> <h6> Primary</h6>
          </div>

          <div className="emailsection">
          
            {/* <span className="material-icons"> people </span> */}
            <GroupIcon style={{marginRight:"10px"}}/><h6>  Social</h6>
          </div>

          <div className="emailsection">
            {/* <span className="material-icons"> local_offer </span> */}
            <h6> <SellIcon style={{marginRight:"10px"}}/>Promotions</h6>
          </div>
        </div>
      </Box>:""}
      <List id="testsize" >
        
         {response?.map((email) => (
          <Emailed
            key={email._id}
            email={email}
            selectedEmails={selectedEmails}
            setRefreshScreen ={setRefreshScreen}
            setSelectedEmails = {setSelectedEmails}
          />
        ))} 
      </List>
      {
        response?.length === 0 &&
        <NoMails message={EMPTY_TABS[type]}/>
      }
    </Box>
  );
};

export default Emails;
