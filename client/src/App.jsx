import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar.jsx'

function App() {

  return (
    <>
      <nav className='lg:container mx-auto'>
        <Navbar></Navbar>
      </nav>
      <Outlet></Outlet>
    </>
  )
}

export default App
