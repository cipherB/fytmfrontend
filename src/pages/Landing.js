import React from 'react';
import illustrator from '../assets/Completed task _Monochromatic.svg';
import { BsArrowRight, BsFillCheckCircleFill } from 'react-icons/bs';
import FeatureCard from '../components/FeatureCard';
import Navbar from '../components/Navbar';
import { useUsersQuery, useLoginMutation, useUserQuery } from '../services/api';
import { useDispatch } from 'react-redux'
import { login as loginSLice, login_user } from '../slice/UserSlice';

const LoginTest = () => {
  const [skip, setSkip] = React.useState(true)
  const [ login, {isLoading, isSuccess, data} ] = useLoginMutation();
  const { isSuccess:userIsSuccess, data:singleUserData } = useUserQuery("bbb@gmal.com", { skip });
  const dispatch = useDispatch()
  const formData = {
    email: "bbb@gmal.com",
    password: "boluwatife"
  }
  const addHandler = async() => {
    await login(formData)
    setSkip(false)
  }

  const setHandler = () => {
    sessionStorage.setItem('access_token', data.access)
    sessionStorage.setItem('refresh_token', data.refresh)
    dispatch(loginSLice({access_token:data.access, refresh_token:data.refresh}))
    dispatch(login_user(JSON.stringify(singleUserData)))
    userIsSuccess && sessionStorage.setItem('user', JSON.stringify(singleUserData))
    userIsSuccess && console.log("singlels", singleUserData)
  }

  isSuccess && setHandler();
  return (
    <>
    {isLoading && <p>...login loading</p>}
      <button onClick={addHandler} >login</button>
    </>
  )
}

const Landing = () => {
  const { data, error, isLoading, isFetching, isSuccess } = useUsersQuery();
  return (
    <div>
      <Navbar />
      <div className='landing-hero' >
        <img src={illustrator} alt="illustrator" className='landing-illustrator' />
        <h1 className='landing-heading' >Final Year<br /> Task Manager</h1>
      </div>
      <div className='landing-padding'>
        <p className='landing-summary' >Keep track of your personal tasks, build up a team, work on a project and monitor the project progress by keeping track of the tasks using FYTM.</p>
        <div className='landing-btn-contain'>
          <button className='landing-btn' >Get Started <BsArrowRight /> </button>
        </div>
        <div className='landing-features' >
          <FeatureCard 
            icon={<BsFillCheckCircleFill />}
            feature="Simplicity"
            description="Easy to use with hands on tutorial taking you step by step on each process"
          />
        </div>
        <div>
          {isLoading && <p>...loading</p>}
          {isFetching && <p>...fetching</p>}
          {error && <p>something went wrong</p>}
          {isSuccess && (
            <div>
              {data.map((item, id) => {
                return <div key={id} ><pre>{item.email} </pre>  </div>
              })}
            </div>
          )}
        </div>
        <div>
          <LoginTest />
        </div>
      </div>
    </div>
  )
}

export default Landing