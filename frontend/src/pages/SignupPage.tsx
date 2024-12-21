import { ChangeEvent, useState } from "react"


const SignupPage = () => {
    const [formData,setFormData]=useState({ firstName:"",lastName:"",email:"",password:""}) 
    const handler=(e:ChangeEvent<HTMLInputElement>)=>{
    const {name,value}=e.target
    setFormData({...formData,[name]:value})
    }
    const submitHandler=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    console.log(formData)
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
        <button className="bg-blue-500 text-white p-2 rounded-md" type="submit">
          signup
        </button>
      </form>
    </div>
  );
}

export default SignupPage