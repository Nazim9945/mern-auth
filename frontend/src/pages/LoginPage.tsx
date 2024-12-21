import { ChangeEvent, useState } from "react";

const LoginPage = () => {
  const [formData, setFormData] = useState({
   
   
    email: "",
    password: "",
  });
  const handler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    setFormData({ email: "", password: "" });
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
        <button className="bg-blue-500 text-white p-2 rounded-md" type="submit">
          signin
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
