import React from "react";
import { Outlet } from "react-router-dom";
import Headers from "../Navigations/Headers";
import SideBars from "../Navigations/SideBars";
import Footers from "../Navigations/Footers";

const PagesLayout = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden ">
      <Headers />

      <div className="flex flex-1 overflow-hidden">
        <SideBars />

        <main className="flex-1 p-6 overflow-x-hidden overflow-y-auto bg-gray-100 no-scrollbar pr-[2%] rounded-lg">
          <Outlet />
        </main>
      </div>

      <Footers />
    </div>
  );
};

export default PagesLayout;
