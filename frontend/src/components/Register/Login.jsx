import React, { useState } from "react";
import { Input, Button } from "../index";
import toast from "react-hot-toast"; // For notifications
import authService from "../../apis/auth/auth.js"; // Auth service for login
import { useNavigate } from "react-router-dom"; // For navigation
import { useDispatch } from "react-redux"; // Redux hook
import { login as authLogin } from "../../app/features/authSlice.js"; // Redux action

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(""); // Handle error state
  const dispatch = useDispatch(); // For Redux dispatch
  const navigate = useNavigate(); // For redirecting

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    // Basic validation
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true); // Set loading state
    setError(""); // Clear error state

    try {
      const response = await authService.login({ email, password }); // Use the imported login function
      if (response && response.status === 200) {
        toast.success("Login successful");

        // Fetch user data (assuming your auth service has a method for it)
        const userData = await authService.getCurrentUser();

        // Store user data in localStorage and Redux
        // localStorage.setItem("userData", JSON.stringify(userData.data));
        dispatch(authLogin(userData.data)); // Dispatch to Redux store

        // Redirect to home or dashboard
        navigate("/");
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      toast.error(error.message || "Login failed");
      setError(error.message); // Set error state if needed
    } finally {
      setIsSubmitting(false); // Reset loading state
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
          {error && <p className="text-red-500 text-sm">{error}</p>} {/* Error display */}
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
