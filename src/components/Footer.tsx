// import React from 'react';
// import { DiReact } from 'react-icons/di';
import UM from "../assets/um.svg"

const Footer = () => {
  return (
    <div className="w-full px-5 py-5 xl:m-0 mt-5 flex justify-between gap-2 font-semibold xl:text-sm">
      <span className="hidden xl:inline-flex text-sm">
        Admin Dashboard
      </span>
      <div className="flex gap-1 items-center">
        <span className="text-sm">© Student Helpcare UM</span>
          <img src={UM} alt="" className="h-5" />
        {/*<DiReact className="text-2xl xl:text-xl 2xl:text-2xl text-primary animate-spin-slow" />*/}
      </div>
    </div>
  );
};

export default Footer;
