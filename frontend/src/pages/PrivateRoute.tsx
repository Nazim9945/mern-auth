import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { RootState } from "../redux/store"

const PrivateRoute = () => {
    const currentuser=useSelector((store:RootState)=>store.user.currentuser)
  return (
   <>
   {currentuser ? <Outlet/> : <Navigate to="/signin" />}  
   </>
  )
}

export default PrivateRoute