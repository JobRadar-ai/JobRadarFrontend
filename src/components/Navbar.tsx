import { NavLink } from "react-router-dom";
import "./css/Navbar.css";
import { useState } from "react";
import { Spin as Hamburger } from 'hamburger-react'
import { FaArrowRight } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { logout, checkLogIn } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from '../redux/store'

import { useToast } from "@/components/ui/use-toast"

function Navbar() {
  const dispatch = useDispatch();
  dispatch(checkLogIn());  // check if the user is logged in or not

  const isLogged = useSelector((state: RootState) => state.authorization.isLoggedIn);
  const navigate = useNavigate();

  const [isVertVisible, setVertVisible] = useState(true);

  const { toast } = useToast()

  function clickHandler() {
    setVertVisible(!isVertVisible);
  }
  return (
    <div className="nav_bar">
      <div>
        <NavLink to="/" >
         <h1 className="text-4xl text-black"><span className="span_1">C</span>N</h1>
        </NavLink>
      </div>
      <div className={isVertVisible ? "vert_nav" : "vert_nav vert_visible"}>
        <div className="nav_options">

          <NavLink to="./" className="nav_option_text" onClick={() => {
            clickHandler()
          }}>
            Home
          </NavLink>
          <NavLink to="https://find-jobs-v1.taipy.cloud/" className="nav_option_text" target="_blank">
             Jobs
          </NavLink>
          
          <NavLink className="nav_option_text" to="./resources" onClick={() => {
            clickHandler()
          }}>
            Resources
          </NavLink>
          {
            isLogged ? <NavLink className="nav_option_text" to="./dashboard" onClick={() => {
              clickHandler()
            }}>
              Dashboard
            </NavLink> : null
          }
        </div>
        <div className="auth_buttons">
          {
            !isLogged ?
              (<NavLink
                to="./login"
                className="Sign_in"
                style={{ color: "white" }}
                onClick={() => {
                  clickHandler()
                }}
              >
                Log in <FaArrowRight />{" "}
              </NavLink  >) :
              (<div className="authrized_options">
                <button
                  onClick={() => {
                    dispatch(logout());
                    navigate('/');
                    clickHandler()
                    localStorage.removeItem('communet_user_sub');

                                    toast({
                      title: "Logged out successfully ",
                      className: " bg-green-100 text-green-600 tracking-wider",
                    })
                  }}
                  className="authzed_buttn"
                  style={{ color: "white" }}
                >
                  Log out <FaArrowRight />{" "}
                </button></div>)
          }
        </div>
      </div>
      <div className={"hamburger" + `${isVertVisible ? " text-black " : " text-white "}`} onClick={() => {
        clickHandler()
      }}>
        <Hamburger toggled={!isVertVisible} toggle={setVertVisible} />
      </div>
    </div>
  );
}

export default Navbar;
