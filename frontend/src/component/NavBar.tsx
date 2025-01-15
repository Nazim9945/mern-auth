import {  useSelector } from "react-redux";
import { Link,useLocation} from "react-router-dom";
import { RootState } from "../redux/store";



const NavBar = () => {
  const currentuser=useSelector((store:RootState)=>store.user.currentuser)
    const {pathname}=useLocation();
  
   
  return (
    <div className="bg-blue-900 p-3 text-white">
      <div className="mx-auto flex justify-between items-center gap-3 w-[1000px]">
        <div className="text-3xl">
          <Link to={"/"}>
            <div>Mern-Auth</div>
          </Link>
        </div>
        <div className="flex space-x-3 items-center justify-center">
          <div className={`${pathname == "/about" && "text-yellow-100"}`}>
            <Link to="/about">About</Link>
          </div>
          <div>
            {currentuser ? (
              <div className="flex gap-4 items-center justify-center">
                <div>
                  <Link to="/profile">
                    <img
                      src={currentuser.image}
                      alt="profileImage"
                      className="h-9 w-9 rounded-full"
                    />
                  </Link>
                </div>
              </div>
            ) : (
             
                
                  <Link to="/signin">
                    <p
                      className={`${pathname == "/signin" && "text-yellow-100"}`}
                    >
                      Signin
                    </p>
                  </Link>
                
              
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;