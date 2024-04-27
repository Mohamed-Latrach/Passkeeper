import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

import PasswordCard from '../components/PasswordCard';
import { fetchItems } from '../store/itemsSlice';
import Loader from '../components/Loader';
import { fetchPasswords } from '../store/passwordsSlice';

function Home() {
  const { list, error, isLoading } = useSelector(state => state.passwords)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPasswords())
  }, [])

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return (
      <Alert variant="danger" className='m-5'>
        {error}
      </Alert>
    )
  }

  return (
    <Row>
      {list.map((password, i) => (
        <Col sm={6} md={4} lg={3} key={i} className='mb-4'>
          <PasswordCard password={password} />
        </Col>
      ))}
    </Row>
  )
}

export default Home