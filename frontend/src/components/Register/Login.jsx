import React, { useState } from "react";
import { Input, Button } from "../index";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle login
    console.log("Email:", email, "Password:", password);
  };

  return (
    <>
      <div className="flex w-1/3 h-full mt-20 gap-5 flex-col justify-center text-center self-center border border-nav-active p-5 rounded-lg">
        <h1 className="flex justify-center text-center font-bold tracking-widest text-4xl">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center self-center">
          <div className="flex flex-col p-4 gap-4">
            <Input
              label="Email"
              type="email"
              placeholder="Email"
              className="text-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              extra="Forgot Password?"
              type="password"
              placeholder="Password"
              className="text-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="p-4 pt-3">
            <Button
              type="submit"
              className="rounded-xl text-xl bg-text-green hover:bg-button-color text-nav-white outline-none focus:bg-gray-50 duration-200 w-full"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
