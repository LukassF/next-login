"use client";

import axios from "axios";
import { useState, useCallback, useRef,useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Watch } from "react-loader-spinner";

const errorClass = ["bg-rose-100", "border-red-600"];

const LogIn = () => {
  const router = useRouter();

  console.log(errorClass.join(","));

  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState<{
    nameOrEmail: string;
    password: string;
  }>({ nameOrEmail: "", password: "" });
  const [loading, setLoading] = useState(false);

  const logInUser = useCallback(async () => {
    let errorContent: string = "";

    if (user.nameOrEmail.length > 0 && user.password.length > 0)
      try {
        setLoading(true);
        const response = await axios.post("/api/users/login", user);
        toast.success("Logged in successfully!");
        router.push(`/profile/${response.data.id}`);
        window.location.reload();
      } catch (error: any) {
        if (error.response.data.error) {
          errorContent = error.response.data.error;
          toast.error(errorContent);
        }
      } finally {
        setLoading(false);
      }
    else toast.error("Fill in all fields.");

    errorClass.map((cls) => {
      if (nameRef.current)
        nameRef.current.classList.toggle(
          cls,
          user.nameOrEmail.length === 0 ||
            errorContent === "User doesn't exist."
        );
      if (passwordRef.current)
        passwordRef.current.classList.toggle(
          cls,
          user.password.length === 0 || errorContent === "Invalid password"
        );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);


  return (
    <main className="w-screen h-screen overflow-hidden sm:p-6 bg-indigo-900">
      <section className="w-full h-full bg-slate-200 sm:rounded-2xl grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
        <div className="flex flex-col items-center justify-center gap-4 px-5 sm:px-20">
          <h1 className="text-4xl sm:text-5xl font-medium text-center">
            Welcome to{" "}
            <span className="text-indigo-900 font-bold">Text&apos;em</span>!
          </h1>
          <h2 className="text-xl font-medium text-slate-600">Log In below</h2>
          <form className="flex flex-col items-center w-full w-1/2 gap-4">
            <input
              type="text"
              value={user.nameOrEmail}
              placeholder="Email or username"
              className="py-3 px-5 text-lg rounded-2xl outline-none border-2 border-solid w-full min-w-72"
              onChange={(e) => {
                e.target.classList.remove(...errorClass);
                setUser({ ...user, nameOrEmail: e.target.value });
              }}
              ref={nameRef}
              required
            />
            <div className=" w-full relative flex justify-center items-center">
              <input
                type="password"
                placeholder="Password"
                className="py-3 text-lg px-5 rounded-2xl outline-none border-2 border-solid w-full min-w-72"
                onChange={(e) => {
                  e.target.classList.remove(...errorClass);
                  setUser({ ...user, password: e.target.value });
                }}
                value={user.password}
                ref={passwordRef}
                required
              />
              <i
                className='fa fa-eye absolute right-5 top-1/2 -translate-y-1/2 text-xl text-slate-600 cursor-pointer'
                onClick={() =>{
                  if(passwordRef.current)
                  (passwordRef.current.type =
                    passwordRef.current.type === "text" ? "password" : "text")
                }
                 
                }
              ></i>
            </div>
            <button
              type="submit"
              className="h-14 w-full min-w-72 flex justify-center items-center py-2 px-5 rounded-2xl self-center border-4 border-solid border-indigo-900 text-indigo-900 font-bold text-xl hover:bg-indigo-900 hover:text-slate-100 focus:bg-indigo-900 focus:text-slate-100 transition-all"
              onClick={(e) => {
                e.preventDefault();
                logInUser();
              }}
            >
              {loading ? (
                <Watch
                  height="28"
                  width="28"
                  radius="48"
                  color="white"
                  ariaLabel="watch-loading"
                />
              ) : (
                "Log In"
              )}
            </button>
          </form>
          <h2 className="text-xl font-medium text-slate-600">
            Don&apos;t have an account?
          </h2>
          <Link
            key={Math.random()}
            href={"/signup"}
            className=" h-14 w-full min-w-72 flex justify-center items-center opacity-70  py-2 px-5 rounded-2xl self-center border-4 border-solid border-slate-600 text-slate-600 font-bold text-xl hover:bg-slate-600 hover:text-slate-100 transition-all"
          >
            Sign Up
          </Link>
        </div>

        <article className="hidden lg:block bg-cover bg-no-repeat bg-center bg-[url('https://i.pinimg.com/originals/6b/1b/22/6b1b22573f9f3d4bba11a9fa5cb45652.png')]"></article>

      </section>
    </main>
  );
};

export default LogIn;
