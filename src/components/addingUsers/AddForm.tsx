"use client";

import React, { useRef } from "react";
import { createChat } from "@/utils/createChat";
import Input from "../custom/Input";

const AddForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <form
      action={async (data: FormData) => {
        await createChat(data);
        formRef.current?.reset();
      }}
      ref={formRef}
      className="flex gap-2 justify-around h-10"
    >
      <Input
        type="text"
        name="user"
        placeholder="Find others to chat with!"
        className=""
      />
      <button
        type="submit"
        className="bg-slate-900 bg-opacity-50 text-slate-100 aspect-square rounded-full w-10"
      >
        <i className="fa fa-add"></i>
      </button>
    </form>
  );
};

export default AddForm;
