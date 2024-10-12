import React, { useId } from "react";

function Input({ label, extra, type = "text", className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      <div className="flex justify-between">
        {label && (
          <label className="inline-block mb-1 pl-1 text-lg" htmlFor={id}>
            {label}
          </label>
        )}
        {extra && <div className="flex hover:text-logout-color justify-between mb-2">{extra}</div>}
      </div>
      <input
        type={type}
        className={`px-3 py-2 rounded-xl bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
}

export default React.forwardRef(Input);
