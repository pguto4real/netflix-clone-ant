import { signOut } from "next-auth/react";
import React from "react";

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  return !visible ? null : (
    <div
      className="bg-black w-56 absolute top-14
        right-0 py-5 flex-col border-2 border-green-800 flex"
    >
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full ">
          <img
            src="/images/default-blue.png"
            alt=""
            className="w-8 rounded-md"
          />
          <p className="text-white text-sm group-hover/item:underline">ewewe</p>
        </div>
        <hr className="bg-gray-600 border-0 h-px my-4" />
        <div
          className="px-3 text-center text-white text-sm hover:underline"
          onClick={() => signOut()}
        >
            Sign out of all Netflix
        </div>
      </div>
      hshshs
    </div>
  );
};

export default AccountMenu;
