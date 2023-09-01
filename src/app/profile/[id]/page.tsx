"use client";

import Loader from "@/components/custom/Loader";
import TermsOfUse from "@/components/termsofuse/TermsOfUse";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

const Profile = ({ params }: { params: { id: number } }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState<{
    id: number;
    name: string;
    email: string;
    numchats: string;
    nummessages: string;
  }>({ id: 0, name: "", email: "", numchats: "0", nummessages: "0" });

  const logout = useCallback(async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful!");
      router.push("/");
      window.location.reload();
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    setLoading(true);
    axios
      .get("/api/users/current")
      .then((userResponse) => setCurrentUser(userResponse.data.user))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  if (loading) return <Loader />;

  return (
    <main className="w-screen overflow-hidden h-screen bg-center bg-[url('https://wallpaper.dog/large/17027482.jpg')] bg-cover py-0 px-0 sm:py-8 sm:px-4 lg:px-12">
      <section className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-profile sm:gap-2">
        <article className="w-full scrollbar scrollbar-thin overflow-x-hidden overflow-y-auto h-full bg-slate-200 sm:rounded-2xl flex flex-col items-center justify-start pt-20 sm:pt-8 p-8 gap-4">
          <div className="w-150px md:w-1/3 max-w-150px lg:w-1/2 xl:w-2/5 aspect-square rounded-full bg-slate-600 flex justify-center items-center text-4xl font-extrabold text-slate-100">
            {currentUser.name.slice(0, 1).toUpperCase()}
          </div>

          <h1 className="max-w-full text-3xl font-bold ">{currentUser.name}</h1>
          <h2 className="text-xl max-w-full text-slate-500 -mt-4">
            {currentUser.email}
          </h2>

          <hr className="w-full h-1 bg-slate-300 rounded-full "></hr>
          <p className="text-xs xl:text-sm text-slate-500 font-normal text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error enim,
            aut delectus eligendi commodi voluptatum molestiae! Excepturi totam
            harum nam adipisci inventore cumque culpa nemo officia quod
            doloremque. Eos, obcaecati?
          </p>

          <div className="w-full flex flex-col xs:flex-row  md:flex-col xl:flex-row justify-around items-center">
            <div className="flex flex-col items-center justify-center text-slate-500 text-lg gap-1">
              Messages sent
              <span className="flex gap-2 items-center justify-center text-indigo-900">
                <i className="fa fa-message"></i>
                {currentUser.nummessages}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center text-slate-500 text-lg gap-1 ">
              Chats attended
              <span className="flex gap-2 items-center justify-center text-indigo-900">
                <i className="fa fa-people-group"></i>
                {currentUser.numchats}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center text-slate-500 text-lg gap-1 -mt-4">
            User id
            <span className="flex gap-2 items-center justify-center text-indigo-900">
              <i className="fa fa-file"></i>
              {currentUser.id}
            </span>
          </div>

          <div className="grid grid-cols-2 w-full gap-4 mt-auto">
            <Link
              href={"/"}
              key={Math.random()}
              className="flex-1 h-14 flex justify-center items-center py-2 px-5 rounded-2xl self-center border-4 border-solid border-indigo-900 text-indigo-900 font-bold text-lg hover:bg-indigo-900 hover:text-slate-100 focus:bg-indigo-900 focus:text-slate-100 transition-all"
            >
              Chat
            </Link>
            <button
              onClick={logout}
              className="flex-1 h-14 flex justify-center items-center py-2 px-5 rounded-2xl self-center border-4 border-solid border-slate-600 text-slate-600 font-bold text-lg hover:bg-slate-600 hover:text-slate-100 focus:bg-slate-600 focus:text-slate-100 transition-all"
            >
              Log out
            </button>
          </div>
        </article>
        <TermsOfUse />
      </section>
    </main>
  );
};

export default Profile;
