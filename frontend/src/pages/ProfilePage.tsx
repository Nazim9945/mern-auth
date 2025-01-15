import { useDispatch, useSelector } from "react-redux"
import { RootState} from "../redux/store"
import { useState } from "react"
import { setUser, signOut } from "../redux/slices/userSlice"
import { useNavigate } from "react-router-dom"

import { FiEye, FiEyeOff } from "react-icons/fi"
const PorfilePage = () => {
  const dispatch=useDispatch()
  const [newshow,setnewShow]=useState(true);
  const [oldshow,setoldShow]=useState(true);
  const[error,setError]=useState("");
  const [firstName,setFirstName]=useState("") 
  const [lastName,setLastName]=useState("")
  const [newpassword,setNewPassword]=useState("") 
  const [oldpassword,setOldPassword]=useState("") 
  const currentuser=useSelector((store:RootState)=>store.user.currentuser)

  const navigate=useNavigate();


  const submitHandler=async(e:React.FormEvent<HTMLFormElement>)=>{ 
    e.preventDefault()
    if (!firstName && !lastName && !newpassword && (!oldpassword || oldpassword)) return;
    const options={
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        "token":`${localStorage.getItem("token")}`
      },
      body:JSON.stringify({firstName,lastName,newpassword,oldpassword,token:localStorage.getItem("token")})
    }
    const data=await fetch("http://localhost:4000/api/v1/updateProfile",options);
    const result=await data.json();
    if(result.success===false){
     setError(result.message);
      return;
    }
    dispatch(setUser(result.user))
     let newuser = JSON.stringify(result.user);
     localStorage.setItem("user", newuser);
     setFirstName("");
     setLastName("");
     setNewPassword("");
     setOldPassword("");
    console.log(result.user)

  }
  const dltUserHandler=async()=>{
    const options={
      method:"DELETE",
      headers:{
        "Content-Type":"application/json",
        "token":`${localStorage.getItem("token")}`
      },
      body:JSON.stringify({token:localStorage.getItem("token")})

  }
  const data=await fetch("http://localhost:4000/api/v1/deleteUser",options);  
  const result=await data.json();
  if(result.success===false){
    console.log(result.message)
    return;
  }
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch(setUser(null))
  navigate("/signin")
}
  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <div className="flex flex-col gap-4 justify-center items-center">
        <div className="text-2xl text-slate-700 text-center inline-block p-2 rounded-md mx-auto">
          MY PROFILE
        </div>
        <div>
          <img
            src={currentuser?.image}
            alt="profile image"
            className="w-24 h-24 rounded-full "
          />
        </div>
        <form onSubmit={submitHandler} className="flex flex-col gap-4 relative">
          <label className="">
            <div>FirstName:</div>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              className="border-2 border-gray-500 px-4 py-2 rounded-md w-[400px]"
              defaultValue={currentuser?.firstName}
              placeholder="first name"
            />
          </label>
          <label htmlFor="">
            <div>LastName:</div>
            <input
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              className="border-2 border-gray-500 px-4 py-2 rounded-md w-[400px]"
              defaultValue={currentuser?.lastName}
              placeholder="last name"
            />
          </label>
          <label>
            <div>New Password</div>
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              type={!newshow ? "text" : "password"}
              placeholder="New password"
              className="border-2 border-gray-500 px-4 py-2 rounded-md w-[400px]"
            />
          </label>
          <div
            onClick={() => setnewShow(!newshow)}
            className="cursor-pointer absolute bottom-[153px] right-2"
          >
            {!newshow ? <FiEye /> : <FiEyeOff />}
          </div>

          <label>
            <div>Old Password</div>
            <input
              onChange={(e) => setOldPassword(e.target.value)}
              type={!oldshow ? "text" : "password"}
              placeholder="Old password"
              className="border-2 border-gray-500 px-4 py-2 rounded-md w-[400px]"
            />
          </label>
          <div
            className="cursor-pointer absolute bottom-[69px] right-2"
            onClick={() => setoldShow(!oldshow)}
          >
            {!oldshow ? <FiEye /> : <FiEyeOff />}
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-[400px] active:scale-95 transition duration-150">
            update
          </button>
        </form>
        <div className="flex justify-between items-center gap-2">
          <div
            onClick={dltUserHandler}
            className=" inline-block text-sm italic font-semibold text-red-900 cursor-pointer active:scale-50 transition-all duration-200"
          >
            Delete user
          </div>
          <button
            onClick={() => (
              dispatch(signOut()),
              localStorage.removeItem("user"),
              localStorage.removeItem("token"),
              navigate("/signin")
            )}
          >
            <p className="underline">signout</p>
          </button>
        </div>
        <div className="text-red-500 italic">{error && <div>{error}</div>}</div>
      </div>
    </div>
  );
}

export default PorfilePage