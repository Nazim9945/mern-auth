import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import About from "./pages/About"
import NavBar from "./component/NavBar"
import PrivateRoute from "./pages/PrivateRoute"
import ProfilePage from "./pages/ProfilePage"


function App() {
  

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/about" element={<About />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route path="*" element={<h1>404 Not Found</h1>} />

         
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
