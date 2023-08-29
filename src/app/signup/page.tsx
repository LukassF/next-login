"use client";

import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Watch } from "react-loader-spinner";
import Link from "next/link";

const SignUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<{
    name: string;
    email: string;
    password: string;
  }>({ name: "", email: "", password: "" });

  const signUpUser = useCallback(async () => {
    console.log(user);
    if (
      user.name.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    )
      try {
        setLoading(true);
        await axios.post("/api/users/signup", user);
        toast.success("Signed Up successfully!");
        router.push("/");
      } catch (error: any) {
        toast.error(error.response.data.error);
      } finally {
        setLoading(false);
      }
  }, [user]);

  return (
    <main>
      <form className="flex flex-col w-1/2 gap-2 p-2">
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          value={user.password}
        />
        <button
          type="button"
          onClick={signUpUser}
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
