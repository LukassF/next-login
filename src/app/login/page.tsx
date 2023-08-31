"use client";

import axios from "axios";
import { useState, useCallback, useRef } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const errorClass = [
  "bg-rose-100",
  "border-2",
  "border-red-600",
  "border-solid",
];

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
  }, [user]);

  return (
    <>
      <form className="flex flex-col w-1/2 gap-2 p-2">
        <input
          type="text"
          value={user.nameOrEmail}
          placeholder="Email or username"
          onChange={(e) => {
            e.target.classList.remove(...errorClass);
            setUser({ ...user, nameOrEmail: e.target.value });
          }}
          ref={nameRef}
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
            logInUser();
          }}
        >
          {loading ? "Loading..." : "Log In"}
        </button>
      </form>
      <Link key={Math.random()} href={"/signup"}>
        Sign Up
      </Link>
    </>
  );
};

export default LogIn;
