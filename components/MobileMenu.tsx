import React from "react";
import MobileMenuItems from "./MobileMenuItems";
interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  return !visible ? null : (
    <div
      className="bg-black w-56 absolute top-8 left-0
 py-5 flex-col border-2 border-green-800 flex transition"
    >
      <div className="flex flex-col gap-4  ">
        <MobileMenuItems label="Home" />
        <MobileMenuItems label="Series" />
        <MobileMenuItems label="Films" />
        <MobileMenuItems label="New & Popula" />
        <MobileMenuItems label="My List" />
        <MobileMenuItems label="Browse by languages" />
      </div>
    </div>
  );
};
export default MobileMenu;
