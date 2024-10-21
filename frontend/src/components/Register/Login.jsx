import React, { useState } from "react";
import { Input, Button } from "../index";
import toast from "react-hot-toast"; 
import authService from "../../apis/auth/auth.js";
import { useNavigate } from "react-router-dom"; 
import { useDispatch } from "react-redux";
import { login as authLogin } from "../../app/features/authSlice.js"; 

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(""); 
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true); 
    setError("");

    try {
      const response = await authService.login({ email, password });
      
      if (response) {
        toast.success("Login successful");

        const userData = await authService.getCurrentUser();
        dispatch(authLogin(userData)); 
        navigate("/");
      } 
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      toast.error(errorMessage); 
      setError(errorMessage); 
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <div className="flex w-1/3 h-full mt-20 gap-5 flex-col justify-center text-center self-center px-5 py-10 rounded-lg bg-nav-white">
      <h1 className="flex justify-center text-center font-bold tracking text-primary-color text-4xl bg-nav-white">
        Login
      </h1>
      <span className="bg-nav-white text-xl text-heading-color">Enter your credentials to continue</span>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col justify-center self-center bg-nav-white"
      >
        <div className="flex flex-col p-4 gap-4 bg-nav-white">
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Email"
            aria-label="Email"
            className="text-xl bg-nav-white placeholder:text-lg"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Input
            label="Password"
            extra="Forgot Password?"
            type="password"
            name="password"
            placeholder="Password"
            aria-label="Password"
            className="text-xl bg-nav-white placeholder:text-lg"
            value={formData.password}
            onChange={handleInputChange}
          />
          {error && <p className="text-red-500 text-sm bg-nav-white">{error}</p>} 
        </div>
        <div className="p-4 pt-3 bg-nav-white">
          <Button
            type="submit"
            className="rounded-xl text-lg bg-primary-color hover:bg-[#6235b1] text-nav-white outline-none focus:bg-gray-50 duration-200 w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
      <hr className="text-nav-active w-[80%] m-auto" />
      <span className="text-primary-color font-bold bg-nav-white cursor-pointer" onClick={() => navigate("/signup")}>Don't have an account?</span>
    </div>
  );
}

export default Login;
