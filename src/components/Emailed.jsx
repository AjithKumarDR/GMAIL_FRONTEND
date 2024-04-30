import { Star, StarBorder } from "@mui/icons-material";
import { Box, Typography, Checkbox, styled } from "@mui/material";
import { Router, useNavigate ,useParams} from "react-router-dom";
import ComposeMail from "../components/ComposeMail";
import  {Emailroutes}  from "../utils/EmailRoutes";
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes'
import toast from 'react-hot-toast';
import React, { useState } from "react";
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import LabelImportantTwoToneIcon from '@mui/icons-material/LabelImportantTwoTone';
import { useAuthContext } from "../Contexts/AuthContext";

const Emailed = ({
  email,
  selectedEmails,
  setRefreshScreen,
  setSelectedEmails,
}) => {


  const navigate = useNavigate();
  const { type } = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDraft, setOpenDraft] = useState('');
  const { isLoggedIn, decodedToken,isExpired } = useAuthContext();
  const usermail= decodedToken?decodedToken.email:"";
  const UserName=  decodedToken?decodedToken.name:"";
 

  const toggleStarredMail = async() => {
    const payload = {
      id: email._id, 
      value: !email.starred ,
      usermail:usermail
    }


    let res = await AxiosService.post(ApiRoutes.ToggleStarredEmail.path,payload,{
      authenticate:ApiRoutes.ToggleStarredEmail.authenticate
    })
    if(res.status===200)
    {
      
       toast.success(res.data.message)
    }
    else{
      toast.success(res.data.message)
    }

    setRefreshScreen((prevState) => !prevState);
  };
  

  const toggleImportantEmails = async() => {
    const payload = {
      id: email._id, 
      value: !email.imporrtant ,
      usermail:usermail
    }

   
    let res = await AxiosService.post(ApiRoutes.ToggleImportantEmails.path,payload,{
      authenticate:ApiRoutes.ToggleImportantEmails.authenticate
    })
    if(res.status===200)
    {
    
       toast.success(res.data.message)
    }
    else{
      toast.success(res.data.message)
    }

    setRefreshScreen((prevState) => !prevState);
  };

  const MailOpen = () => {
    if(  type=="drafts"){
      setOpenDraft({ email: email })
      setOpenDialog(true);
    }
    else{
      navigate(Emailroutes.view.path, { state: { email: email } })
    }
    
  };

  const onValueChange = () => {
    if(selectedEmails.includes(email._id)){
      setSelectedEmails(prevState => prevState.filter(id => id !== email._id))
    }else{
      setSelectedEmails(prevState => [...prevState, email._id])
    }
  };


  
    const createTextVersion = (html) => {
      const doc = new DOMParser().parseFromString(html, "text/html");
      return doc.body.textContent || "";
    };


 

  return <>
    <BoxWrapper>
      <Checkbox
        size="small"
        checked={
          email._id? selectedEmails.includes(email._id):""
        }
        onChange={() => onValueChange()}
      />
      {email.starred ? (
        <Star
          fontSize="small"
          style={{ marginRight: 10, color: "#FADA5E" }}
          onClick={() => toggleStarredMail()}
        />
      ) : (
        <StarBorder
          fontSize="small"
          style={{ marginRight: 10 }}
          onClick={() => toggleStarredMail()}
        />
      )}
      {email.imporrtant ? (
        < LabelImportantIcon  style={{marginRight: 10 ,color:"rgb(250, 218, 94)"} } onClick={() => toggleImportantEmails()}  /> 
        
      ) : (
        <LabelImportantTwoToneIcon style={{marginRight: 10,color:"rgb(0 0 0 / 68%)"}} onClick={() => toggleImportantEmails()} /> 
        
      )}
      

      <Box style={{width:"92%"}}
        onClick={ () => MailOpen() }
      >
        <Typography style={{ width: "18%", overflow: "hidden",whiteSpace: "nowrap", textOverflow: "ellipsis" ,paddingRight:"3%" }}>
          {email.name}
        </Typography>
        <Indicator>Inbox</Indicator>
        <Typography style={{width:"60%", whiteSpace: "nowrap", textOverflow: "ellipsis" ,overflow: "hidden"}} >
          {email.subject} {email.body && "-"} {  createTextVersion(email.body)}
        </Typography>
        <Date>
          {new window.Date(email.date).getDate()}&nbsp;
          {new window.Date(email.date).toLocaleString("default", {
            month: "short",
          })}
        </Date>
      </Box>
    </BoxWrapper>
    <ComposeMail
    key={1}
    openDialog={openDialog}
    setOpenDialog={setOpenDialog}
    openDraft={openDraft}
    setOpenDraft={setOpenDraft}
  />
  </>


};

export default Emailed;

const BoxWrapper = styled(Box)({
  padding: "0 0 0 10px",
  background: "#f2f6fc",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  "& > div": {
    display: "flex",
    width: "100%",
    "& > p": {
      fontSize: 14,
    },
  },
});

const Indicator = styled(Typography)({
  fontSize: "12px !important",
  background: "#ddd",
  color: "#222",
  padding: "0 4px",
  borderRadius: 4,
  marginRight: 6,
});

const Date = styled(Typography)({
  marginLeft: "auto",
  marginRight: 10,
  fontSize: 12,
  color: "#5F6368",
});
