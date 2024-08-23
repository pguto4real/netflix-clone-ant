import React from "react";

interface MobileMenuItemsProps {
  label: string;
}
const MobileMenuItems: React.FC<MobileMenuItemsProps> = ({ label }) => {
  return (
    <div className="px-3 text-center text-white hover:underline">{label}</div>
  );
};
export default MobileMenuItems;
