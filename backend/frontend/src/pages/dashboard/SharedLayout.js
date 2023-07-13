import React from "react";
import Wrapper from "../../assets/wrappers/SharedLayout";
import { SideBar } from "../../components";
import { Outlet } from "react-router";
import Navbar from "../../components/Navbar";
const SharedLayout = () => {
  return (
    <>
      <Wrapper>
        <main className="dashboard">
          <SideBar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </>
  );
};

export default SharedLayout;
