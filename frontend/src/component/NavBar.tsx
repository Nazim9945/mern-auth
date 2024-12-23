import { useSelector } from "react-redux";
import { Link,useLocation} from "react-router-dom";
import { RootState } from "../redux/store";


const NavBar = () => {
  const currentuser=useSelector((store:RootState)=>store.user.currentuser)
    const {pathname}=useLocation();
  //  const navigate = useNavigate();
   
  return (
    <div className="bg-slate-300 p-3 w-full text-black border-gray-500 border-b-1">
      <div className="flex justify-between items-center gap-3">
        <div className="text-3xl">
          <Link to={"/"}>
            <div>Mern-Auth</div>
          </Link>
        </div>
        <div className="flex space-x-3 items-center justify-center">
          <div className={`${pathname == "/about" && "text-red-700"}`}>
            <Link to="/about">About</Link>
          </div>
          <div>
            {currentuser ? (
              <div className="flex gap-4 items-center justify-center">
                <button
                  onClick={() => (
                    localStorage.removeItem("user"),
                    localStorage.removeItem("token"),
                    (window.location.pathname = "/signin")
                  )}
                >
                  <p>Logout</p>
                </button>
                <div>
                  <Link to="/profile">
                    <img
                      src={currentuser.image}
                      alt="profileImage"
                      className="h-9 w-9 rounded-full "
                    />
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <Link to="/signin">
                    <p
                      className={`${pathname == "/signin" && "text-red-700"} `}
                    >
                      Signin
                    </p>
                  </Link>
                </div>
                <div className={`${pathname == "/signup" && "text-red-700"}`}>
                  <Link to="/signup">Signup</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;