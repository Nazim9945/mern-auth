import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../redux/slices/userSlice";

const LoginPage = () => {
    const dispatch = useDispatch();
  const [formData, setFormData] = useState({  
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const submitHandler = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
    try {
        setLoading(true);
        const option = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        };
        const data = await fetch("http://localhost:4000/api/v1/signin", option);
        const result = await data.json();
        if(result.success===false){
            setLoading(false);
            setError(result.message);
            return;
        }
        localStorage.setItem("token", result.token);
        let newuser = JSON.stringify(result.user);
        console.log(newuser);
        localStorage.setItem("user", newuser);
        dispatch(setUser(newuser));
        setLoading(false);
        setFormData({ email: "", password: "" });
        navigate("/");

    } catch (error) {
        setLoading(false);
        console.log(error);
        setError("error while registering");
    }
    
    
  };
  return (
    <div className="max-w-screen-sm  h-screen mx-auto p-4 flex flex-col  items-center justify-center">
      <form className="flex flex-col gap-6" onSubmit={submitHandler}>
        <label>
          <div>
            Email<sup>*</sup>
          </div>
          <input
            className="border-2 border-gray-500 px-3 py-2 rounded-md lg:w-[300px]"
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
            className="border-2 border-gray-500 px-3 py-2 rounded-md lg:w-[300px]"
            type="Password"
            name="password"
            value={formData.password}
            required
            onChange={handler}
          />
        </label>
        <button
          disabled={loading}
          className="bg-blue-500 text-white px-3 py-2 rounded-md disabled:bg-red-600 lg:w-[300px]"
          type="submit"
        >
          {loading ? "Loading..." : "signin"}
        </button>
      </form>
      <div>Don't have an account? <Link className="underline text-blue-900" to={'/signup'}>Signup</Link></div>
      <div>{error && <div className="text-red-600 italic">{error}</div>}</div>
    </div>
  );
};

export default LoginPage;
