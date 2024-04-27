import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { Avatar } from "@files-ui/react";

import { requestUpdatingProfile } from "../store/userSlice";


function UpdateProfile() {
  const { details: userDetails } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const [profielData, setProfileData] = useState({
    firstName: userDetails.firstName || '',
    lastName: userDetails.lastName || '',
    email: userDetails.email || '',
    photoPath: userDetails.photoPath || ''
  })

  const [file, setFile] = useState(null)

  function handleChange(e) {
    setProfileData(prevProfileData => ({ ...prevProfileData, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append("firstName", profielData.firstName)
    formData.append("lastName", profielData.lastName)
    formData.append("email", profielData.email)
    if (file) {
      formData.append("photo", file)
    }
    await dispatch(requestUpdatingProfile({formData, navigate}))
  }

  return (
    <Container className="mt-3">
      <h1>Update Profile</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control name="firstName" value={profielData.firstName} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control name="lastName" value={profielData.lastName} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control disabled name="email" value={profielData.email} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Photo</Form.Label>
          <Avatar alt="Avatar" src={file ? file : profielData.photoPath} onChange={(file) => setFile(file)} />
        </Form.Group>
        <Button type="submit" className="mx-auto d-block w-100">Update</Button>
      </Form>
    </Container>
  )
}

export default UpdateProfile;