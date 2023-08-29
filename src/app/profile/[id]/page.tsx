"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useLayoutEffect, useState } from "react";
import toast from "react-hot-toast";

const Profile = ({ params }: { params: { id: number } }) => {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<{
    id: number;
    name: string;
    email: string;
  }>({ id: 0, name: "", email: "" });

  const logout = useCallback(async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful!");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }, []);

  useLayoutEffect(() => {
    axios
      .get("/api/users/current")
      .then((userResponse) => setCurrentUser(userResponse.data.user))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div>Id: {currentUser.id}</div>
      <div>Name: {currentUser.name}</div>
      <div>Email: {currentUser.email}</div>
      <button onClick={logout}>Log out</button>
    </div>
  );
};

export default Profile;
