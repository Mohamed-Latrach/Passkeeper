import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Spinner from 'react-bootstrap/Spinner';

import { requestCreatingPassword } from "../store/passwordsSlice";


function CreateItem() {
  const { isLoading } = useSelector(state => state.passwords)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [website, setWebsite] = useState("")
  const [username, setUsername] = useState("")
  const [value, setValue] = useState("")
  const [file, setFile] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append("website", website)
    formData.append("username", username)
    formData.append("value", value)
    formData.append("photo", file)
    dispatch(requestCreatingPassword({formData, navigate}))
  }

  return (
    <Container className="mt-3">
      <h1>Create New Password</h1>

      <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3">
          <Form.Label>Website</Form.Label>
          <Form.Control name="website" value={website} onChange={e => setWebsite(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control name="username" value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Photo</Form.Label>
          <Form.Control type="file" accept="image/*" multiple={false} onChange={e => setFile(e.target.files[0])} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Value</Form.Label>
          <Form.Control name="value" value={value} onChange={e => setValue(e.target.value)} />
        </Form.Group>

        <Button type="submit" className="mx-auto d-block w-100" disabled={isLoading}>
          {isLoading ? <Spinner size="sm" /> : <span>Add</span>}
        </Button>

      </Form>
    </Container>
  )
}

export default CreateItem;