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
    <div className="flex w-1/3 h-full mt-20 gap-5 flex-col justify-center text-center self-center border border-nav-active p-5 rounded-lg">
      <h1 className="flex justify-center text-center font-bold tracking-widest text-4xl">
        Login
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col justify-center self-center"
      >
        <div className="flex flex-col p-4 gap-4">
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Email"
            aria-label="Email"
            className="text-xl"
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
            className="text-xl"
            value={formData.password}
            onChange={handleInputChange}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>} 
        </div>
        <div className="p-4 pt-3">
          <Button
            type="submit"
            className="rounded-xl text-xl bg-text-green hover:bg-button-color text-nav-white outline-none focus:bg-gray-50 duration-200 w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
