import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import CreateItem from "./pages/CreateItem"
import Profile from "./pages/Profile"
import NotFound from "./pages/NotFound"
import PasswordDetails from "./pages/PasswordDetails"
import UpdatePassword from "./pages/UpdatePassword"
import OutsideLayout from "./layouts/OutsideLayout"
import InsideLayout from "./layouts/InsideLayout"
import NeutralLayout from "./layouts/NeutralLayout"
import { requestMe } from "./store/userSlice"
import Loader from "./components/Loader"
import UpdateProfile from "./pages/UpdateProfile"


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    // Check if user alredy logged in
    const checkUser = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        await dispatch(requestMe(token))
      }
      setLoading(false)
    }
    checkUser()
  }, [])

  if (loading) return <Loader />

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>

          <Route element={<OutsideLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<InsideLayout />}>
            <Route path="/create-item" element={<CreateItem />} />
            <Route path="/update-password/:id" element={<UpdatePassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<NeutralLayout />}>
            <Route path="/passwords/:id" element={<PasswordDetails />} />
            <Route path="*" element={<NotFound />} />
          </Route>

        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
