import React, { useId } from "react";

function Input({ label, extra, type = "text", className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full bg-nav-white my-1">
      <div className="flex justify-between bg-nav-white">
        {label && (
          <label className="inline-block mb-1 pl-1 text-lg bg-nav-white" htmlFor={id}>
            {label}
          </label>
        )}
        {extra && <div className="flex text-primary-color font-bold hover:text-[#6235b1] bg-nav-white justify-between mb-2 cursor-pointer">{extra}</div>}
      </div>
      <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-nav-white text-black outline-none focus:bg-gray-50 duration-200 border border-nav-active w-full ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
}

export default React.forwardRef(Input);
