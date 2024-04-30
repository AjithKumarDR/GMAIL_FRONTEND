import React, { useEffect,useState  } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom'
import toast from 'react-hot-toast';
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes'
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GoogleIcon from '../assets/Google_ICON.png'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../App.css'
function SignUp() {
  const navigate = useNavigate()
  const [startDate, setStartDate] = useState(new Date());
  useEffect(()=>{
    sessionStorage.clear()
  },[])
  
  const handleSignUp = async(e)=>{
    e.preventDefault()
    try {
      let formData = new FormData(e.target)
      let data = Object.fromEntries(formData)
      if(data.password===data.Confirmpassword){
      if(data.email && data.password && data.name && data.Recoveryemail)
      {
        let res = await AxiosService.post(ApiRoutes.SIGNUP.path,data,{
          authenticate:ApiRoutes.SIGNUP.authenticate
        })

        if(res.status===201)
        {
          toast.success(res.data.message)
          navigate('/')
        }
      }
      else
      {
        toast.error("Fill All Fields..!")
      }
    }
    else{
      toast.error("Pasword and Confirmpassword Not Match...!")
    }
    } catch (error) {
        toast.error(error.response.data.message || error.message)
    }
  }

  return <div className='loginWrapper'>
    
    <Row> <Col>
    <div className='sigup'>
    <img src={GoogleIcon} className='Glogo' alt="BigCo Inc. logo"/>
    <h2 className='userinput'>Create Account</h2>
    </div>
    </Col>
    <Col className='userinput'>
  <Form onSubmit={handleSignUp}>
      <Form.Group className="mb-3" >
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" name='name'/>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email'/>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Recovery Email address</Form.Label>
        <Form.Control type="email" placeholder="Recovery email" name='Recoveryemail'/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>D.O.B</Form.Label>
        <div className="fullWidthDatePicker">
        <DatePicker className='form-control' name='DOB' selected={startDate} onChange={(date) => setStartDate(date)} />
        </div>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password'/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" name='Confirmpassword'/>
      </Form.Group>
      
      <Button variant="primary" className='btn-lg' type="submit">
        Create
      </Button>
      <p className='userinput'>Already Have an account? <Link to='/'>Login here</Link></p>
    </Form>
    </Col>
    </Row> 
  </div>
}

export default SignUp