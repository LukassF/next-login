"use client";

import { sendMessage } from "@/utils/sendMessage";
import { useRef } from "react";

const Form = () => {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      action={async (data: FormData) => {
        await sendMessage(data);
        formRef.current?.reset();
      }}
      ref={formRef}
    >
      <input
        type="text"
        placeholder="Your message."
        name="message"
        className="border-2 border-black border-solid"
      />
      <button type="submit" className="bg-slate-900 text-slate-100 py-1 px-3">
        Send
      </button>
    </form>
  );
};

export default Form;
