import React from "react";
import Wrapper from "../assets/wrappers/Navbar";
import Logo from "./Logo";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <div className="nav-center">
        <div>
          <Logo />
          <h3 className="logo-text">Dashboard</h3>
        </div>
        <div className="btn-container">
          <button type="button" className="btn">
            <FaUserCircle /> {user?.name} <FaCaretDown />
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
