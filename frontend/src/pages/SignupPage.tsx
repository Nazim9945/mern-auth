import { ChangeEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RootState} from "../redux/store"
import { signInFailure, signInStart, setUser } from "../redux/slices/userSlice"



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
       dispatch(signInStart())
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
           dispatch(signInFailure(result.message))
            return;
        }
       dispatch(setUser(result.newuser));
        localStorage.setItem("token", result.token);
        let newuser = JSON.stringify(result.newuser);
        localStorage.setItem("user", newuser);
        
    } catch (error) {
        //@ts-ignore
       dispatch(signInFailure(error.message))
        console.log(error)
    }
    

    // console.log(formData)
    setFormData({firstName:"",lastName:"",email:"",password:""})
    navigate("/")
    
    }
  return (
    <div>
      <form
        className="flex flex-col gap-4 max-w-screen-sm"
        onSubmit={submitHandler}
      >
        <label>
          <div>
            FirstName<sup>*</sup>
          </div>
          <input
            className="border-2 border-gray-500 p-2 rounded-md"
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
            className="border-2 border-gray-500 p-2 rounded-md"
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
            className="border-2 border-gray-500 p-2 rounded-md"
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
            className="border-2 border-gray-500 p-2 rounded-md"
            type="Password"
            name="password"
            value={formData.password}
            required
            onChange={handler}
          />
        </label>
        <button disabled={loading} className="bg-blue-500 text-white p-2 rounded-md disabled:bg-red-600" type="submit">
          {loading ? "loading..." : "signup"}
        </button>
      </form>
      <div>
        {error && <div className="text-red-600 italic">{error}</div>}   
      </div>
    </div>
  );
}

export default SignupPage