import React from "react";

interface NavBarItemProps {
  label: string;
}
const NavbarItem: React.FC<NavBarItemProps> = ({ label }) => {
  return (
    <div
      className="text-white cursor-pointer
    hover:text-gray-300 transition"
    >
      {label}
    </div>
  );
};
export default NavbarItem;
