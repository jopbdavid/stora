import React from "react";
import Wrapper from "../../assets/wrappers/SharedLayout";
import { Outlet } from "react-router";
import Navbar from "../../components/Navbar";
const SharedLayout = () => {
  return (
    <Wrapper>
      <main className="dashboard">
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default SharedLayout;
