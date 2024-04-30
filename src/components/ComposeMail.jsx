import { Close, DeleteOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  InputBase,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes'
import toast from 'react-hot-toast';
import  {Emailroutes}  from "../utils/EmailRoutes";
import { Router, useNavigate ,useParams} from "react-router-dom";
import { useAuthContext } from "../Contexts/AuthContext";
import useLogout from '../hooks/useLogout'
const ComposeMail = ({ openDialog, setOpenDialog,openDraft,setOpenDraft }) => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const { isLoggedIn, decodedToken,isExpired } = useAuthContext();
 const Email= decodedToken?decodedToken.email:"";
 const UserName=  decodedToken?decodedToken.name:"";
 let logout = useLogout()


 if(openDraft){
  let test =openDraft;
  let test1 =data;
  !data.to?setData(openDraft.email):"";
 }

 
  const closeComposeMail = async(e) => {
    e.preventDefault();
    try{
    const payload = {
      to: data.to,      
      from:Email ,
      subject: data.subject,
      body: data.body,
      date: new Date(),
      image: "",    
      name:UserName ,
      starred: false,
      imporrtant: false,
      type: "drafts",
    };

   

    if (Email!=""&& data.to!="" && data.to!=undefined &&  data.body!=undefined ){
    let res = await AxiosService.post(ApiRoutes.DarftMail.path,{payload,id:openDraft?openDraft.email._id:""},{
      authenticate:ApiRoutes.DarftMail.authenticate
    })
    if(res.status===200)
    {
     
       setData({});
       navigate(Emailroutes.emails.path+"/inbox")
       toast.success(res.data.message)
    }
    else{
      toast.success(res.data.message)
    }
   
  }
  setOpenDialog(false);

  openDraft="";
  
}
catch (error){
  catcherror(error);
}
  };

  const onValueChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value }); // if key is variable so need to wrap with square bracket
    
  };
 

  const sendMail = async(e) => {
    e.preventDefault();
try{
 
    
    
    const payload = {
      to: data.to,
      from: Email,
      subject: data.subject,
      body: data.body,
      date: new Date(),
      image: "",
      name: UserName,
      starred: false,
      imporrtant: false,
      type: "sent",
    };

    
           if (Email!=""&& data.to!="" && data.to!=undefined &&  data.body!=undefined){
    let res = await AxiosService.post(ApiRoutes.SentMail.path,{payload,id:openDraft?openDraft.email._id:""},{
      authenticate:ApiRoutes.SentMail.authenticate
    })
    if(res.status===200)
    {
      setOpenDialog(false);     
      openDraft="";
       setData({});
       navigate(Emailroutes.emails.path+"/inbox")
       toast.success("name:"+UserName+" Email:"+Email)
       toast.success(res.data.message)
    }
    else{
      toast.success(res.data.message)
    }

  }




     setOpenDialog(false);
   
    openDraft="";
    }catch (error){
      console.log(error)
      
    }
  };

  const catcherror=(error)=>{
     if (error.response.status){
    if(error.response.status===402){
      toast.error(error.response.data.message)
    logout()
  }
       }else{
        toast.error(error.message)
       }
      }

  return (
    <Dialog open={openDialog} PaperProps={{ sx: dialogStyle }}>
      <Header>
        <Typography>{data?data.subject:"New Message"}</Typography>
        <Close fontSize="small" onClick={closeComposeMail} cursor="pointer" />
      </Header>
      <RecipientWrapper>
        <InputBase
          placeholder="To"
          name="to"
          value={data.to?data.to:""}
          onChange={(e) => onValueChange(e)}
        />
        <InputBase
          placeholder="Subject"
          name="subject"
          value={data.subject?data.subject:""}
          onChange={(e) => onValueChange(e)}
        />
      </RecipientWrapper>
      <TextField
        multiline
        rows={20}
        sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
        name="body"
        value={data.body?data.body:""}
        onChange={(e) => onValueChange(e)}
      />
      <Footer>
        <SendButton onClick={(e) => sendMail(e)}>Send</SendButton>
        <DeleteOutline onClick={() => {setOpenDialog(false);openDraft="";setData({});}} cursor="pointer" />
      </Footer>
    </Dialog>
  );
};

export default ComposeMail;

const dialogStyle = {
  height: "90%",
  width: "80%",
  maxWidth: "100%",
  maxHeight: "100%",
  boxShadow: "none",
  borderRadius: "10px 10px 0 0",
};

const Header = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 15px",
  background: "#f2f6fc",
  "& > p": {
    fontSize: 14,
    fontWeight: 500,
  },
});

const RecipientWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: "0 15px",
  "& > div": {
    fontSize: 14,
    borderBottom: "1px solid #F5F5F5",
    marginTop: 10,
  },
});

const Footer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  padding: "15px 15px",
  alignItems: "center",
});

const SendButton = styled(Button)({
  background: "#0B57D0",
  color: "#FFF",
  fontWeight: 500,
  textTransform: "none",
  borderRadius: 18,
  width: 100,
});
