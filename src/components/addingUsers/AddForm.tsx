"use client";

import React, { useRef } from "react";
import { createChat } from "@/utils/createChat";

const AddForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <form
      action={async (data: FormData) => {
        await createChat(data);
        // await sendMessage({ formData: data, chatId: selectedChat });
        formRef.current?.reset();
      }}
      ref={formRef}
    >
      <input
        type="text"
        name="user"
        placeholder="Find others to chat with!"
        className="border-2 border-black border-solid text-black"
      />
      <button type="submit" className="bg-slate-900 text-slate-100 py-1 px-3">
        Start chat
      </button>
    </form>
  );
};

export default AddForm;
