import React from "react";
import Wrapper from "../assets/wrappers/SideBar";
import Logo from "./Logo";
import { useSelector, useDispatch } from "react-redux";
import NavLinks from "./NavLinks";
import { toggleSideBar } from "../features/user/userSlicer";

const SideBar = () => {
  const { isSideBarOpen } = useSelector((store) => store.user);

  return (
    <Wrapper>
      <div
        className={
          isSideBarOpen
            ? "sidebar-container "
            : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default SideBar;
