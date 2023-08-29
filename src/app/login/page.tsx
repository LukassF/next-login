"use client";

import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();
  const [user, setUser] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });

  const logInUser = useCallback(async () => {
    if (user.email.length > 0 && user.password.length > 0)
      try {
        const response = await axios.post("/api/users/login", user);
        toast.success("Logged in successfully!");
        router.push(`/profile/${response.data.id}`);
      } catch (error: any) {
        if (error.response.data.error) toast.error(error.response.data.error);
      }
  }, [user]);

  return (
    <form className="flex flex-col w-1/2 gap-2 p-2">
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
      <button type="button" onClick={logInUser}>
        Log In
      </button>
    </form>
  );
};

export default SignUp;
