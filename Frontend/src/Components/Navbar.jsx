import React, { useState } from "react";
import logo from "../Images/logo.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <div>
      <nav className="bg-[#275380] stikcy top-0 z-60 shadow-lg ">
        <div className="max-w-screen mx-auto px-3  sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img className="h-12 w-auto" src={logo} alt="Logo" />
            </div>

            {/* Navigation links */}
            <div className="hidden sm:block">
              <div className="ml-10 space-x-4">
                <a
                  href="#"
                  className="text-white  hover:text-white px-3 py-2  text-sm font-medium relative hover:border-b-2  hover:border-[#0096FF]"
                  onMouseEnter={() => toggleDropdown(5)}
                  onMouseLeave={() => toggleDropdown(5)}
                >
                  Home
                </a>

                <a
                  href="#"
                  className="text-white  hover:text-white px-3 py-2  text-sm font-medium relative hover:border-b-2  hover:border-[#0096FF]"
                  onMouseEnter={() => toggleDropdown(6)}
                  onMouseLeave={() => toggleDropdown(6)}
                >
                  Working
                </a>

                <a
                  href="#"
                  className="text-white  hover:text-white px-3 py-2  text-sm font-medium relative hover:border-b-2  hover:border-[#0096FF]"
                  onMouseEnter={() => toggleDropdown(7)}
                  onMouseLeave={() => toggleDropdown(7)}
                >
                  About
                </a>

                <a
                  href="#"
                  className="text-white  hover:text-white px-3 py-2  text-sm font-medium relative hover:border-b-2  hover:border-[#0096FF]"
                  onMouseEnter={() => toggleDropdown(8)}
                  onMouseLeave={() => toggleDropdown(8)}
                >
                  Places
                </a>

                <a
                  href="#"
                  className="text-white  hover:text-white px-3 py-2  text-sm font-medium relative hover:border-b-2  hover:border-[#0096FF]"
                  onMouseEnter={() => toggleDropdown(9)}
                  onMouseLeave={() => toggleDropdown(9)}
                >
                  Career
                </a>

                <a
                  href="#"
                  className="text-white  hover:text-white px-3 py-2  text-sm font-medium relative hover:border-b-2  hover:border-[#0096FF]"
                  onMouseEnter={() => toggleDropdown(10)}
                  onMouseLeave={() => toggleDropdown(10)}
                >
                  Contact Us
                </a>
              </div>
            </div>

            {/* Hamburger icon for mobile */}
            <div className="flex sm:hidden">
              <button
                type="button"
                className="text-white  hover:text-white px-2 py-2  text-sm font-medium"
                onClick={toggleMobileMenu}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a
                  href="#"
                  className="text-white  hover:text-white block px-3 py-2  text-base font-medium"
                  onClick={() => toggleDropdown(5)}
                >
                  MSCS Acts
                </a>

                <a
                  href="#"
                  className="text-white  hover:text-white block px-3 py-2  text-base font-medium"
                  onClick={() => toggleDropdown(6)}
                >
                  Application
                </a>

                <a
                  href="#"
                  className="text-white  hover:text-white block px-3 py-2  text-base font-medium"
                  onClick={() => toggleDropdown(7)}
                >
                  MSCS-MIS
                </a>

                <a
                  href="#"
                  className="text-white  hover:text-white block px-3 py-2  text-base font-medium"
                  onClick={() => toggleDropdown(8)}
                >
                  Reports
                </a>

                <a
                  href="#"
                  className="text-white  hover:text-white block px-3 py-2  text-base font-medium"
                  onClick={() => toggleDropdown(9)}
                >
                  Liquidation
                </a>

                <a
                  href="#"
                  className="text-white  hover:text-white block px-3 py-2  text-base font-medium"
                  onClick={() => toggleDropdown(10)}
                >
                  Banks
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
