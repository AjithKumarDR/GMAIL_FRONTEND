import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom'
import toast from 'react-hot-toast';
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes'
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import google from '../assets/Google.png'
import { useAuthContext } from "../Contexts/AuthContext";
import './common/SuspenseLoader.css'

function Login() {
  const navigate = useNavigate()
  const { setLoggedIn } = useAuthContext();
  useEffect(()=>{
    sessionStorage.clear()
  },[])

  const handleLogin = async(e)=>{
    e.preventDefault()
    try {
      let formData = new FormData(e.target)
      let data = Object.fromEntries(formData)



      if(data.email && data.password){
        let res = await AxiosService.post(ApiRoutes.LOGIN.path,data,{
          authenticate:ApiRoutes.LOGIN.authenticate
        })

        if(res.status===200)
        {
          setLoggedIn(true);
          sessionStorage.setItem('token',res.data.token)
          sessionStorage.setItem('name',res.data.name)
          sessionStorage.setItem('userId',res.data.id)
          toast.success(res.data.message)         
           
            navigate('/emails/inbox')
          
        }
      }
      else
      {
        toast.error("Input Email and Password")
      }

    } catch (error) {
        toast.error(error.response.data.message || error.message)
    }
  }

  return<>
  <Card >
     <Card.Body>
   {/* <div className='loginWrapper'> */}
    <div className='loginHeader'>
  
    <img src={google} alt="Google logo"/>
    <h1 className='textsign'>Sign in</h1>
      
    </div>
  <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email'/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password'/>
      </Form.Group>
       <Link to='/ForgotMail'>Forgot Password</Link>
      <div className='btns'>
      <Link to="/signup" className=" rounded-pill btn btn-lg btn-light">Create Account</Link>
      <Button variant="primary" className='rounded-pill btn-lg' type="submit">
        login
      </Button></div>
    </Form>
  {/* </div> */}
  </Card.Body>

  
  </Card>
  
  </>
}

export default Login