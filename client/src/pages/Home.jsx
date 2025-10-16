import React from 'react'
import { useAuth } from '../contexts/AuthProvider'
import LogIn from './LogIn';

const Home = () => {
  const {user} = useAuth();
  return (<>
    {user ? (<>
      <h1 className='text-3xl text-center mt-20'>Welcome to Task Manager</h1>
      </>) : (
      <LogIn></LogIn>
    )}
  </>);

}

export default Home