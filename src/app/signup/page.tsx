"use client";

import axios from "axios";
import { useState, useCallback, useRef } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Watch } from "react-loader-spinner";
import Link from "next/link";

const errorClass = ["bg-rose-100", "border-red-600"];
const regexEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUp = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<{
    name: string;
    email: string;
    password: string;
  }>({ name: "", email: "", password: "" });

  const signUpUser = useCallback(async () => {
    let errorContent: string = "";
    if (
      user.name.length >= 5 &&
      user.email.length >= 5 &&
      user.password.length >= 5 &&
      user.email.match(regexEmail)
    )
      try {
        setLoading(true);
        await axios.post("/api/users/signup", user);
        toast.success("Signed Up successfully!");
        await axios.post("/api/users/login", {
          nameOrEmail: user.name,
          password: user.password,
        });
        router.push(`/`);
        window.location.reload();
      } catch (error: any) {
        errorContent = error.response.data.error;
        toast.error(errorContent);
      } finally {
        setLoading(false);
      }
    else if (!user.email.match(regexEmail)) toast.error("Invalid email adress");
    else toast.error("All fields have to be at least 5 characters long.");

    errorClass.map((cls) => {
      if (nameRef.current)
        nameRef.current.classList.toggle(cls, user.name.length < 5);
      if (emailRef.current)
        emailRef.current.classList.toggle(cls, user.email.length < 5);
      if (emailRef.current)
        emailRef.current.classList.toggle(cls, !user.email.match(regexEmail));
      if (passwordRef.current)
        passwordRef.current.classList.toggle(cls, user.password.length < 5);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <main className="w-screen h-screen overflow-hidden sm:p-6 bg-indigo-900">
      <section className="w-full h-full bg-slate-200 sm:rounded-2xl grid grid-cols-1 lg:grid-cols-2 p-4 gap-4 overflow-x-hidden overflow-y-auto scrollbar-thin">
        <article className="flex flex-col items-center justify-center gap-4 px-5 sm:px-20">
          <h1 className="text-3xl md:text-4xl xl:text-5xl font-medium text-center sm:whitespace-nowrap">
            Welcome to{" "}
            <span className="text-indigo-900 font-bold">Text&apos;em</span>!
          </h1>
          <h2 className="text-xl font-medium text-slate-600">Sign up below</h2>
          <form className="flex flex-col items-center w-full gap-4">
            <input
              type="text"
              placeholder="Username"
              className="py-3 px-5 text-lg rounded-md outline-none border-2 border-solid w-full min-w-72"
              onChange={(e) => {
                e.target.classList.remove(...errorClass);
                setUser({ ...user, name: e.target.value });
              }}
              value={user.name}
              ref={nameRef}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="py-3 px-5 text-lg rounded-md outline-none border-2 border-solid w-full min-w-72"
              onChange={(e) => {
                e.target.classList.remove(...errorClass);
                setUser({ ...user, email: e.target.value });
              }}
              value={user.email}
              ref={emailRef}
              required
            />
            <div className=" w-full relative flex justify-center items-center">
              <input
                type="password"
                placeholder="Password"
                className="py-3 px-5 text-lg rounded-md outline-none border-2 border-solid w-full min-w-72"
                onChange={(e) => {
                  e.target.classList.remove(...errorClass);
                  setUser({ ...user, password: e.target.value });
                }}
                value={user.password}
                ref={passwordRef}
                required
              />
              <i
                className="fa fa-eye absolute right-5 top-1/2 -translate-y-1/2 text-xl text-slate-600 cursor-pointer"
                onClick={() => {
                  if (passwordRef.current)
                    passwordRef.current.type =
                      passwordRef.current.type === "text" ? "password" : "text";
                }}
              ></i>
            </div>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                signUpUser();
              }}
              className="h-14 w-full min-w-72 flex justify-center items-center py-2 px-5 rounded-md self-center border-2 border-solid border-indigo-900 text-indigo-900 font-medium text-xl hover:bg-indigo-900 hover:text-slate-100 focus:bg-indigo-900 focus:text-slate-100 transition-all"
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
                "Sign Up"
              )}
            </button>
          </form>
          <h2 className="text-md font-medium text-slate-600 mt-5">
            Already have an account?
          </h2>
          <Link
            key={Math.random()}
            href={"/login"}
            className=" h-14 w-full min-w-72 flex justify-center items-center opacity-70  py-2 px-5 rounded-md self-center border-2 border-solid border-slate-600 text-slate-600 font-medium text-xl hover:bg-slate-600 hover:text-slate-100 transition-all"
          >
            Log In
          </Link>
        </article>
        <article className="hidden lg:block bg-cover bg-no-repeat bg-center bg-[url('https://i.pinimg.com/originals/6b/1b/22/6b1b22573f9f3d4bba11a9fa5cb45652.png')]"></article>
      </section>
    </main>
  );
};

export default SignUp;
