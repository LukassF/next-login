import React from "react";

const Divider = ({ date, margin }: { date: Date; margin: string }) => {
  return (
    <span className={`${margin} w-full text-center text-sm`}>
      {new Date(date).toDateString()}{" "}
      {new Date(date).getHours().toString().padStart(2, "0")}:
      {new Date(date).getMinutes().toString().padStart(2, "0")}
    </span>
  );
};

export default Divider;
