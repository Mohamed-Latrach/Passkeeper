import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";

import { fetchPasswordById, requestUpdatingPassword } from "../store/passwordsSlice";


function UpdatePassword() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const [passwordData, setPasswordData] = useState({
    website: '',
    username: '',
    logoPath: '',
    value: ''
  })

  const [file, setFile] = useState(null)

  useEffect(() => {
    dispatch(fetchPasswordById(id))
    .unwrap()
    .then(item => setPasswordData(item))
    .catch(err => console.log(err));
  }, [dispatch, id])

  function handleChange(e) {
    setPasswordData(prevPasswordData => ({ ...prevPasswordData, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append("website", passwordData.website)
    formData.append("username", passwordData.username)
    formData.append("value", passwordData.value)
    if (file) {
      formData.append("photo", file)
    }
    await dispatch(requestUpdatingPassword({id, formData})).unwrap()
    navigate(`/passwords/${id}`)
  }

  return (
    <Container className="mt-3">
      <h1>Update Password</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Website</Form.Label>
          <Form.Control name="website" value={passwordData.website} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control name="username" value={passwordData.username} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Photo</Form.Label>
          <Form.Control type="file" accept="image/*" multiple={false} onChange={e => setFile(e.target.files[0])} />
          <img src={file ? URL.createObjectURL(file) : passwordData.logoPath} className="mt-2" style={{maxHeight: 150}} alt="photo" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Value</Form.Label>
          <Form.Control name="value" value={passwordData.value} onChange={handleChange} />
        </Form.Group>
        <Button type="submit" className="mx-auto d-block w-100">Update</Button>
      </Form>
    </Container>
  )
}

export default UpdatePassword;