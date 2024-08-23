import React from "react";
import { signIn } from "next-auth/react";
export default function LoginIcon({ icon,through }:any) {
  return (
    <div
      className="
    w-10
    h-10
    bg-white
    rounded-full
    flex
    items-center
    justify-center
    hover:opacity-80
    transition
    cursor-pointer"

    onClick={() => signIn(through, { callbackUrl: "/profiles" })}
    >
      {icon}
    </div>
  );
}
