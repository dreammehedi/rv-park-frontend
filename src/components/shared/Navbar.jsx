import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { useGetRvCampsitesQuery } from "../../services/api/pages/rvCampsitesSlice";

const Navbar = () => {
  const { data: campsiteData, isLoading: campsiteLoading } =
    useGetRvCampsitesQuery();
  const combinedData = [
    ...(campsiteData?.payload || []).map((item) => ({
      id: item._id,
      title: item.title,
      shortDescription: item.description?.substring(0, 100) + "...",
      longDescription: item.description,
      image: item.image || "/placeholder.svg",
      type: "campsite",
      redirectPath: `/reservation-details/${item._id}`,
      cta: item.cta || "Book Now",
    })),
  ];
  const links = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Reservation", path: "/reservation" },
    { label: "Local Attraction", path: "/attractions" },
    { label: "Contact", path: "/contact" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef(null);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="sticky top-0  bg-black/30 backdrop-blur-lg shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-1 flex justify-between items-center">
        {/* Logo */}
        <div className="w-16 h-16  flex items-center justify-center rounded-full">
          <Logo />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex w-full items-center gap-8">
          <div className="flex flex-1 justify-end gap-6">
            {links.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-500 font-semibold"
                    : "text-white hover:text-yellow-500"
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          {combinedData.map((item) => (
            <NavLink
              key={item.id}
              to={item.redirectPath}
              onClick={closeDrawer}
              className="bg-yellow-500 text-white px-4 py-2 hover:bg-yellow-600"
            >
              {item.cta}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleDrawer}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed inset-0 z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black opacity-50"
          onClick={closeDrawer}
        ></div>

        {/* Drawer Content */}
        <div
          ref={drawerRef}
          className="relative w-full bg-white  h-screen p-1 px-4 flex flex-col items-start space-y-6"
        >
          <div className="flex justify-between items-center w-full ">
            <div className="w-16 h-16  flex items-center justify-center rounded-full">
              <Logo />
            </div>
            <button
              onClick={closeDrawer}
              className="!text-black focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              onClick={closeDrawer}
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-500 font-semibold"
                  : "text-black hover:text-yellow-500"
              }
            >
              {link.label}
            </NavLink>
          ))}
          {combinedData.map((item) => (
            <NavLink
              key={item.id}
              to={item.redirectPath}
              onClick={closeDrawer}
              className="bg-yellow-500 text-black px-4 py-2 hover:bg-yellow-600"
            >
              {item.cta}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
