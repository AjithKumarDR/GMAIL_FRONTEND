import React, { useEffect,useState  } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom'
import toast from 'react-hot-toast';
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes'
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import google from '../assets/Google.png'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../App.css'
function Login() {
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate()

  useEffect(()=>{
    sessionStorage.clear()
  },[])

  const handleForgotmail = async(e)=>{
    e.preventDefault()
    try {
      let formData = new FormData(e.target)
      let data = Object.fromEntries(formData)
      
      if(data.email){
        let res = await AxiosService.post(ApiRoutes.ForgotMail.path,data,{
          authenticate:ApiRoutes.ForgotMail.authenticate
        })

        if(res.status===200)
        {
          toast.success(res.data.message)
          document.getElementById("Forgotmail").style.display="none"
          document.getElementById("Recoverymail").style.display=""
          


        }
      }
      else
      {
        toast.error("Enter Valid Email Address ")
      }

    } catch (error) {
        toast.error(error.response.data.message || error.message)
    }
  }

  const handleRecoverymaill = async(e)=>{
    e.preventDefault()
    try {
      let formData = new FormData(e.target)
      let data = Object.fromEntries(formData)
      let email =document.getElementById("email").value
      const { hostname, port } = window.location;
      if(data.UserName && data.DOB && email){
        data.email=email;
        data.URL=window.location.href;
        
        console.log(data)
        let res = await AxiosService.post(ApiRoutes.RecoveryMail.path,data,{
          authenticate:ApiRoutes.RecoveryMail.authenticate
        })

        if(res.status===200)
        {
          toast.success(res.data.message)
          navigate('/')
        }
      }
      else
      {
        toast.error("Enter Valid Email Addressss ")
      }

    } catch (error) {
        toast.error(error.response.data.message || error.message)
    }
  }

  return<Card >
     <Card.Body>
 
    <div className='loginHeader'>
  
    <img src={google} alt="BigCo Inc. logo"/>
    <h1 className='textsign'>Forgot Mail</h1>
      
    </div>
  <Form id="Forgotmail" onSubmit={handleForgotmail}>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control id="email" type="email" placeholder="Enter email" name='email'/>
      </Form.Group>

      
       
      <div className='btns'>
      <Link to="/" className=" rounded-pill btn btn-lg btn-light">Back To Login</Link>
      <Button variant="primary" className='rounded-pill btn-lg'  type="submit">
        Next
      </Button></div>
    </Form>
  <Form id="Recoverymail" style={{display:"none"}} onSubmit={handleRecoverymaill}>
      <Form.Group className="mb-3">
        <Form.Label>User Name</Form.Label>
        <Form.Control type="text" placeholder="Enter User Name" name='UserName'/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>D.O.B</Form.Label>
        <div className="fullWidthDatePicker">
        <DatePicker className='form-control' name='DOB' selected={startDate} onChange={(date) => setStartDate(date)} />
        </div>
      </Form.Group>
      
       
      <div className='btns'>
      <Link to="/" className=" rounded-pill btn btn-lg btn-light">Back To Login</Link>
      <Button variant="primary" className='rounded-pill btn-lg'  type="submit">
        Next
      </Button></div>
    </Form>

  </Card.Body>
  </Card>
}

export default Login