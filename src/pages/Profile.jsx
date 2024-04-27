
import React from 'react'
import { useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import { Avatar } from "@files-ui/react";

function Profile() {
  const userDetails = useSelector(state => state.user.details)
  return (
    <>
      <h1 className='text-center'>Profile</h1>
      <Link className='button' to='/update-profile'>Update Profile</Link>
      <Avatar className='avatar2'
        readOnly
        src={userDetails.photoPath}
        alt={userDetails.firstName}

      />
      <Table striped bordered hover style={{ maxWidth: 500 }} className="mx-auto">
        <tbody>
          <tr>
            <td>First Name</td>
            <td> {userDetails.firstName} </td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td> {userDetails.lastName} </td>
          </tr>
          <tr>
            <td>Email</td>
            <td> {userDetails.email} </td>
          </tr>
        </tbody>
      </Table>

    </>
  )
}

export default Profile
