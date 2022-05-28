import React from 'react';
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { TextField } from '../components/FormInput';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation, useUserQuery } from '../services/api';
import { useDispatch } from 'react-redux';
import { login as loginSLice, login_user } from '../slice/UserSlice';

const Login = () => {

  const [skip, setSkip] = React.useState(true)
  const [emailQuery, setEmailQuery] = React.useState("")
  const [ login, {isLoading, isSuccess, data} ] = useLoginMutation();
  const { isSuccess:userIsSuccess, data:singleUserData } = useUserQuery(emailQuery, { skip });
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const setHandler = () => {
    sessionStorage.setItem('access_token', data.access)
    sessionStorage.setItem('refresh_token', data.refresh)
    dispatch(loginSLice({access_token:data.access, refresh_token:data.refresh}))
    setSkip(false)
  }

  const handleUserProfile = () => {
    dispatch(login_user(JSON.stringify(singleUserData)))
    userIsSuccess && sessionStorage.setItem('user', JSON.stringify(singleUserData))
  }

  const handleSubmit = async (formData) => {
    const { email, password } = formData;
    const login_form = {
      email, password
    }
    await login(login_form)
    setEmailQuery(email)
  }

  React.useEffect(() => {
    isSuccess && setHandler();
  }, [isSuccess])

  React.useEffect(() => {
    userIsSuccess && handleUserProfile();
    userIsSuccess && navigate(`/dashboard/${singleUserData.email}/workspace`);
  }, [userIsSuccess])

  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is Required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        "Must contain 8 Characters,One Uppercase, One Lowercase and One Number"
      )
      .required("Password is Required"),
  });

  return (
    <div className='auth-contain' >
      <div className='auth-logo' ><h1><Link to='/' style={{textDecoration:"none"}} >FYTM</Link></h1></div>
      <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validate}
      validateOnBlur
      onSubmit={values => handleSubmit(values)}
    >
      {(formik) => (
        <Form className='auth-body' onSubmit={formik.handleSubmit} >
          <TextField
            label="Email"
            name="email"
            inputType="email"
            placeholder="Enter your e-mail"
          />
          <TextField
            label="Password"
            name="password"
            inputType="password"
            placeholder="Enter your password"
          />
          
          <div className='auth-btn-contain' >
            <button
              type="submit"
              className="auth-btn"
              style={{opacity: !(formik.dirty && formik.isValid) && "50%"}}
              disable={!(formik.dirty && formik.isValid)}
            >
              {isLoading ? <p>...loading</p> : <p>Login</p>}
            </button>
          </div>
        </Form>
      )}
    </Formik>
    </div>
  )
}

export default Login