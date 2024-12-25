import { useDispatch, useSelector } from "react-redux"
import { RootState} from "../redux/store"
import { useState } from "react"
import { setUser } from "../redux/slices/userSlice"

const PorfilePage = () => {
  const dispatch=useDispatch()
  const [firstName,setFirstName]=useState("") 
  const [lastName,setLastName]=useState("")
  const [newpassword,setNewPassword]=useState("") 
  const [oldpassword,setOldPassword]=useState("") 
  const currentuser=useSelector((store:RootState)=>store.user.currentuser)
  const submitHandler=async(e:React.FormEvent<HTMLFormElement>)=>{ 
    e.preventDefault()
    console.log({firstName,lastName,newpassword,oldpassword})
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
      console.log(result.message)
      return;
    }
    dispatch(setUser(result.newuser))
    console.log(result.newuser)

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
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
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
              type="password"
              placeholder="New password"
             
              className="border-2 border-gray-500 px-4 py-2 rounded-md w-[400px]"
            />
          </label>
          <label>
            <div>Old Password</div>
            <input
              onChange={(e) => setOldPassword(e.target.value)}
              type="password"
              placeholder="Old password"
             
              className="border-2 border-gray-500 px-4 py-2 rounded-md w-[400px]"
            />
          </label>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-[400px] active:scale-95 transition duration-150">
            update
          </button>
        </form>
      </div>
    </div>
  );
}

export default PorfilePage