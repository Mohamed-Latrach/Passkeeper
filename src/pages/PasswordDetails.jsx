import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'

import { fetchItemById } from '../store/itemsSlice'
import Loader from '../components/Loader'
import { fetchPasswordById } from '../store/passwordsSlice'


export default function PasswordDetails() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { selected, isLoading, error } = useSelector(state => state.passwords)

  useEffect(() => {
    dispatch(fetchPasswordById(id))
    .unwrap()
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }, [dispatch, id])

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return (
      <div className='alert alert-danger'>
        <h3>Password not found</h3>
      </div>
    )
  }

  if (selected) {
    return (
      <>
        <h1>Password details</h1>
        <img alt="item-img" className="mb-3 d-block mx-auto" style={{ maxWidth: 250 }} src={selected.logoPath} />
        <Table striped bordered hover style={{ maxWidth: 500 }} className="mx-auto">
          <tbody>
            <tr>
              <td>Website</td>
              <td> {selected.website} </td>
            </tr>
            <tr>
              <td>Username</td>
              <td> {selected.username} </td>
            </tr>
            <tr>
              <td>Value</td>
              <td> {selected.value} </td>
            </tr>
          </tbody>
        </Table>
      </>
    )
  }
}