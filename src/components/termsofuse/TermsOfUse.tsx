import React from "react";
import { terms } from "@/utils/data/terms.json";

const TermsOfUse = () => {
  return (
    <article className="w-full h-full hidden md:flex flex-col gap-6 bg-slate-100 scrollbar scrollbar-thin rounded-2xl overflow-x-hidden overflow-y-auto p-8">
      <h1 className="text-indigo-900 text-2xl lg:text-3xl text-center w-full font-bold">
        Text'em terms of use and legal agreement
      </h1>

      <hr className="w-full h-1 rounded-full bg-slate-300"></hr>

      {terms.map((term) => (
        <div key={term.title}>
          <h1 className="text-md lg:text-xl text-indigo-900 font-medium">
            {term.title}
          </h1>
          <p className="text-xs lg:text-sm text-slate-600 px-6">{term.text}</p>
        </div>
      ))}
    </article>
  );
};
export default TermsOfUse;
