import Input from "@/components/Input";
import LoginIcon from "@/components/LoginIcon";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("null");

  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);
  const login = useCallback(async () => {
    console.log('i got here')
    try {
      console.log('i got here1')
      const signInData = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/profiles",
      });

      console.log('i got here2')
    } catch (error:any) {
      console.log('i got here3')
      setErrorMessage(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
 
    try {
      const registerData = await axios.post("/api/register", {
        email,
        name,
        password,
      });
     
      login();
    } catch (error:any) {
      setErrorMessage(error.response.data.error);
      console.error(error.response.data.error);
    }
  }, [email, name, password,login]);

  return (
    <div
      className="relative h-full w-full bg-[url('/images/hero.jpg')] 
        bg-no-repeat bg-center bg-fixed bg-cover"
    >
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5 ">
          <img src="/images/logo.svg" alt="logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div
            className="bg-black bg-opacity-70 px-16 py-16 self-center 
          mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full"
          >
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign In" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  label="Username"
                  onChange={(ev: any) => setName(ev.target.value)}
                  id="name"
                  type="text"
                  value={name}
                />
              )}
              <Input
                label="Email"
                onChange={(ev: any) => setEmail(ev.target.value)}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Password"
                onChange={(ev: any) => setPassword(ev.target.value)}
                id="password"
                type="password"
                value={password}
              />
            </div>
            <div className="text-white">
              {errorMessage === null && errorMessage}
            </div>
            <button
              className="bg-red-600 py-3 text-white rounded-md
            w-full mt-10 hover:bg-red-700
            transition"
              onClick={variant === "login" ? login : register}
            >
              {variant === "login" ? "Login" : "Sign Up"}
            </button>

            <div
              className="flex flex-row items-center gap-4
            mt-8 justify-center"
            >
              <LoginIcon icon={<FcGoogle size={30} />} through="google" />
              <LoginIcon icon={<FaGithub size={30} />} through="github" />
            </div>
            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already have an account"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Auth;
