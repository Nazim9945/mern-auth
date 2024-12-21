import { Link, useLocation } from "react-router-dom";


const NavBar = () => {
    const {pathname}=useLocation();
   
  return (
    <div className="bg-slate-300 p-3 w-full text-black border-gray-500 border-b-1">
      <div className="flex justify-between items-center gap-3">
        <div className="text-3xl">
          <Link to={"/"}>
            <div>Mern-Auth</div>
          </Link>
        </div>
        <div className="flex space-x-3">
          <div className={`${pathname == "/about" && "text-red-700"}`}>
            <Link to="/about">About</Link>
          </div>
          <div>
            <Link to="/signin">
              <p className={`${pathname == "/signin" && "text-red-700"} `}>
                Signin
              </p>
            </Link>
          </div>
          <div className={`${pathname == "/signup" && "text-red-700"}`}>
            <Link to="/signup">Signup</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;