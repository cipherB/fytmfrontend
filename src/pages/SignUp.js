import React from 'react';
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { TextField } from '../components/FormInput';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation, useAddWorkspaceMutation } from '../services/api';

const SignUp = () => {

  const [ register, {isLoading, isSuccess, data} ] = useRegisterMutation();
  const [ addWorkspace ] = useAddWorkspaceMutation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if(isSuccess) {
      addWorkspace({
        name: data.user.name,
        user: data.user.user_id
      })
      navigate('/login');
    }
  }, [isSuccess])

  const validate = Yup.object({
    name: Yup.string()
      .max(50, "Must be 50 characters or less")
      .required("Required"),
    email: Yup.string().email("Email is invalid").required("Email is Required"),
    phone_number: Yup.string()
      .required("Required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        "Must contain 8 Characters,One Uppercase, One Lowercase and One Number"
      )
      .required("Password is Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm Password is Required"),
  });

  const handleSubmit = async (formData) => {
    const { email, name, phone_number, password } = formData;
    const signup_form = {
      email, name, phone_number, password
    }
    await register(signup_form)
  }

  return (
    <div className='auth-contain' >
      <div className='auth-logo' ><h1><Link to='/' style={{textDecoration:"none"}} >FYTM</Link></h1></div>
      <Formik
      initialValues={{
        name: "",
        email: "",
        phone_number: "",
        password: "",
        confirmPassword: "",
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
            label="Name"
            name="name"
            inputType="text"
            placeholder="Enter your name"
          />
          <TextField
            label="Phone Number"
            name="phone_number"
            inputType="tel"
            placeholder="Enter your phone number"
          />
          <TextField
            label="Password"
            name="password"
            inputType="password"
            placeholder="Enter your password"
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            inputType="password"
            placeholder="Confirm your password"
          />
          <div className='auth-btn-contain' >
            <button
              type="submit"
              className="auth-btn"
              style={{opacity: !(formik.dirty && formik.isValid) && "50%"}}
              disable={!(formik.dirty && formik.isValid)}
            >
              {isLoading ? <p>...loading</p> : <p>Register</p>}
            </button>
          </div>
        </Form>
      )}
    </Formik>
    </div>
  )
}

export default SignUp