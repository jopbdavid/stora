import React, { useState } from "react";
import Wrapper from "../assets/wrappers/Navbar";
import Logo from "./Logo";
import { FaUserCircle, FaCaretDown, FaAlignLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar } from "../features/user/userSlicer";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <div className="nav-center">
        <button
          type="button"
          className="toggle-btn"
          onClick={() => dispatch(toggleSideBar())}
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">Dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setToggle(!toggle)}
          >
            <FaUserCircle /> {user?.name} <FaCaretDown />
          </button>
          {toggle ? (
            <div className={toggle ? "dropdown show-dropdown" : "dropdown"}>
              <button
                type="button"
                className="dropdown-btn"
                onClick={() => setToggle(!toggle)}
              >
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
