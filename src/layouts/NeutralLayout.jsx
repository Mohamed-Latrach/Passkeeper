import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'


function NeutralLayout() {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  return (
    <>
      {isAuthenticated ? <Sidebar /> : <Navbar />}
      <Container className="my-5">
        <Outlet />
      </Container>
    </>
  )
}

export default NeutralLayout
