import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
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
        console.log(result);
        if(result.success===false){
            setLoading(false);
            setError(result.message);
            return;
        }
        localStorage.setItem("token", result.token);
        setLoading(false);
        setFormData({ email: "", password: "" });
        navigate("/dashboard");

    } catch (error) {
        setLoading(false);
        console.log(error);
        setError("error while registering");
    }
    
    
  };
  return (
    <div>
      <form
        className="flex flex-col gap-4 max-w-screen-sm"
        onSubmit={submitHandler}
      >
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
          {loading ? "Loading..." : "signin"}   
        </button>
      </form>
      <div>
        {error && <div className="text-red-600 italic">{error}</div>}
        </div>
    </div>
  );
};

export default LoginPage;
