import { ChangeEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { RootState} from "../redux/store"
import { signUpFailure, signUpStart, setUser } from "../redux/slices/userSlice"



const SignupPage = () => {
    const dispatch=useDispatch()

    const {loading,error}=useSelector((store:RootState)=>store.user)
    const [formData,setFormData]=useState({ firstName:"",lastName:"",email:"",password:""}) 
   
    const navigate=useNavigate();
    const handler=(e:ChangeEvent<HTMLInputElement>)=>{
    const {name,value}=e.target
    setFormData({...formData,[name]:value})
    }
    const submitHandler=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    try {
       dispatch(signUpStart())
        const option = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        };
        const data = await fetch("http://localhost:4000/api/v1/signup", option);
        const result = await data.json();
        console.log(result);
        if(result.success===false){
           dispatch(signUpFailure(result.message))
            return;
        }
       dispatch(setUser(result.user));
        localStorage.setItem("token", result.token);
        let newuser = JSON.stringify(result.user);
        localStorage.setItem("user", newuser);
        
    } catch (error) {
        //@ts-ignore
       dispatch(signUpFailure(error.message))
        console.log(error)
    }
    

    // console.log(formData)
    setFormData({firstName:"",lastName:"",email:"",password:""})
    navigate("/")
    
    }
  return (
    <div className="max-w-screen-sm h-screen mx-auto p-4 flex flex-col items-center justify-center">
      <form className="flex flex-col  gap-4" onSubmit={submitHandler}>
        <label>
          <div>
            FirstName<sup>*</sup>
          </div>
          <input
            className="border-2 border-gray-500 px-4 py-2 lg:w-[300px]  rounded-md"
            type="text"
            name="firstName"
            value={formData.firstName}
            required
            onChange={handler}
          />
        </label>
        <label>
          <div>
            LastName<sup>*</sup>
          </div>
          <input
            className="border-2 border-gray-500 px-4 py-2 lg:w-[300px]  rounded-md"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handler}
          />
        </label>
        <label>
          <div>
            Email<sup>*</sup>
          </div>
          <input
            className="border-2 border-gray-500 px-4 py-2 lg:w-[300px]  rounded-md"
            type="email"
            name="email"
            value={formData.email}
            required
            onChange={handler}
          />
        </label>
        <label>
          <div>
            Password<sup>*</sup>
          </div>
          <input
            className="border-2 border-gray-500 px-4 py-2 lg:w-[300px]  rounded-md"
            type="Password"
            name="password"
            value={formData.password}
            required
            onChange={handler}
          />
        </label>
        <button
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 lg:w-[300px]  rounded-md disabled:bg-red-600"
          type="submit"
        >
          {loading ? "loading..." : "signup"}
        </button>
      </form>
      <div>
        Have an account already?{" "}
        <Link className="underline text-blue-900" to={"/signin"}>
          Signin
        </Link>
      </div>
      <div>{error && <div className="text-red-600 italic">{error}</div>}</div>
    </div>
  );
}

export default SignupPage