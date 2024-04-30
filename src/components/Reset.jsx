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
function Reset() {
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate()

  useEffect(()=>{
    sessionStorage.clear()
  },[])

 
  const handleResetPass = async(e)=>{
    e.preventDefault()
    try {
      let formData = new FormData(e.target)
      let data = Object.fromEntries(formData)          
      if(data.password == data.Confirmpassword && data.password){

        data.URL=window.location.href;
        
        console.log(data)
        let res = await AxiosService.post(ApiRoutes.Reset.path,data,{
          authenticate:ApiRoutes.Reset.authenticate
        })

        if(res.status===200)
        {
          toast.success(res.data.message)
          navigate('/')
        }
      }
      else
      {
        toast.error("Password Not Match..!")
      }

    } catch (error) {
        toast.error(error.response.data.message || error.message)
    }
  }

  return<Card >
     <Card.Body>
  
    <div className='loginHeader'>
  
    <img src={google} alt="BigCo Inc. logo"/>
    <h1 className='textsign'>Reset Password</h1>
      
    </div>
  
  <Form id="ResetMail"  onSubmit={handleResetPass}>
  <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password'/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" name='Confirmpassword'/>
      </Form.Group>
      
       
      <div className='btns'>     
      <Button variant="primary" className='rounded-pill btn-lg'  type="submit">
        Reset
      </Button></div>
    </Form>
 
  </Card.Body>
  </Card>
}

export default Reset