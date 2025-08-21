import React from "react";
import Header from "./header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* <Login /> */}
      <Header />
      <div className="p-4">
      {children}
      </div>
    </div>
  )
};

export default Layout;
