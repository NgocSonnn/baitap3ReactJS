import React from "react";
import HeaderComponents from "../../components/headerComponent";
import SideBar from "../../components/sideBar";
import "../mainLayout/style.scss";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="main-layout-container">
      <HeaderComponents></HeaderComponents>
      <div className="main-layout-container__content">
        <SideBar></SideBar>
        <div className="right-side">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
