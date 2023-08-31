"use client";

import axios from "axios";
import { useState, useCallback, useRef } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Watch } from "react-loader-spinner";
import Link from "next/link";

const errorClass = [
  "bg-rose-100",
  "border-2",
  "border-red-600",
  "border-solid",
];

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
      user.password.length >= 5
    )
      try {
        setLoading(true);
        await axios.post("/api/users/signup", user);
        toast.success("Signed Up successfully!");
        router.push("/");
      } catch (error: any) {
        errorContent = error.response.data.error;
        toast.error(errorContent);
      } finally {
        setLoading(false);
      }
    else toast.error("All fields have to be at least 5 characters long.");

    errorClass.map((cls) => {
      if (nameRef.current)
        nameRef.current.classList.toggle(cls, user.name.length < 5);
      if (emailRef.current)
        emailRef.current.classList.toggle(cls, user.email.length < 5);
      if (passwordRef.current)
        passwordRef.current.classList.toggle(cls, user.password.length < 5);
    });
    //react-hooks/exhaustive-deps
  }, [user]);

  return (
    <main>
      <form className="flex flex-col w-1/2 gap-2 p-2">
        <input
          type="text"
          placeholder="Username"
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
          onChange={(e) => {
            e.target.classList.remove(...errorClass);
            setUser({ ...user, email: e.target.value });
          }}
          value={user.email}
          ref={emailRef}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            e.target.classList.remove(...errorClass);
            setUser({ ...user, password: e.target.value });
          }}
          value={user.password}
          ref={passwordRef}
          required
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            signUpUser();
          }}
          className="flex justify-center items-center h-12 bg-slate-600 text-slate-100"
        >
          {loading ? (
            <Watch
              height="20"
              width="20"
              radius="48"
              color="white"
              ariaLabel="watch-loading"
            />
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
      <Link key={Math.random()} href={"/login"}>
        Log In
      </Link>
    </main>
  );
};

export default SignUp;
