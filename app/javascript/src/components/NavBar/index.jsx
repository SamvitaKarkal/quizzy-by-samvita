import React from "react";
import NavItem from "./NavItem";
import authApi from "apis/auth";
import { getFromLocalStorage, setToLocalStorage } from "helpers/storage";

const NavBar = ({ isLoggedIn }) => {
  const userName = getFromLocalStorage("authUserName");

  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({
        email: null,
        userId: null,
        userName: null,
      });
      window.location.href = "/login";
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <nav className="bg-white shadow">
      <div className="px-2 mx-auto max-w-7xl sm:px-4 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex px-2 lg:px-0">
            <div className="py-4 lg:flex">
              <NavItem name="Quizzy" path="/" />
            </div>
          </div>
          {isLoggedIn ? (
            <div className="flex items-center justify-end">
              <a
                className="inline-flex items-center px-1 pt-1 text-lg
                font-regular leading-5 text-bb-black text-opacity-50
                transition duration-150 ease-in-out border-b-2
                border-transparent hover:text-bb-gray-600 focus:outline-none
                focus:text-bb-gray-700 cursor-pointer"
              >
                Reports
              </a>
              <span
                className="inline-flex items-center px-2 pt-1 text-lg
              font-regular leading-5 text-black text-opacity-50
              transition duration-150 ease-in-out border-b-2 
              border-transparent focus:outline-none
              focus:text-bb-black"
              >
                {userName}
              </span>
              <a
                onClick={handleLogout}
                className="inline-flex items-center px-1 pt-1 text-lg
              font-regular leading-5 text-bb-black text-opacity-50
              transition duration-150 ease-in-out border-b-2
              border-transparent hover:text-bb-gray-600 focus:outline-none
              focus:text-bb-gray-700 cursor-pointer"
              >
                LogOut
              </a>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
