"use client";

import { sendMessage } from "@/utils/sendMessage";
import { useRef } from "react";
import Input from "../custom/Input";

const Form = ({ selectedChat }: { selectedChat: number }) => {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      action={async (data: FormData) => {
        await sendMessage({ formData: data, chatId: selectedChat });
        formRef.current?.reset();
      }}
      ref={formRef}
      className="shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] flex-initial bg-slate-100 h-full px-4 flex items-center justify-between gap-4 "
    >
      <Input
        type="text"
        placeholder="Your message."
        name="message"
        className="bg-stone-200 py-2 w-9/10"
      />
      <button
        type="submit"
        className=" bg-indigo-900 text-slate-100 h-10 rounded-full text-md min-w-100 w-1/10 px-3 py-1"
      >
        Send <i className="fa fa-send"></i>
      </button>
    </form>
  );
};

export default Form;
