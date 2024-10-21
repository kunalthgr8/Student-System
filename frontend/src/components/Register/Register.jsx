import React, { useState } from 'react';
import { Input, Button } from "../index"; // Assuming custom Input and Button components are being imported
import authService from '../../apis/auth/auth';
import { useDispatch } from 'react-redux';
import { login } from '../../app/features/authSlice';
import { useNavigate } from 'react-router-dom'; // Assuming you are using react-router

function Register() {
  const [formData, setFormData] = useState({
    fullName: '', 
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword, email, fullName } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError('');
    setIsLoading(true); 

    try {
      const userData = await authService.createAccount({ fullName, email, password });
      dispatch(login(userData.data)); 
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="flex w-1/3 h-full mt-8 gap-5 flex-col justify-center text-center self-center px-5 py-8 rounded-lg bg-nav-white">
      <h1 className="flex justify-center text-center font-bold tracking text-primary-color text-4xl bg-nav-white">Register</h1>
      <span className="bg-nav-white text-xl text-heading-color">Sign Up to create an account</span>
      <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center self-center bg-nav-white">
        <div className="flex flex-col p-3 gap-4 bg-nav-white">
          <Input
            label="Full Name" 
            name="fullName"
            type="text"
            placeholder="Full Name"
            className="text-xl placeholder:text-lg"
            value={formData.fullName}
            onChange={handleChange}
            aria-label="full-name"
            required
          />
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Email"
            className="text-xl placeholder:text-lg"
            value={formData.email}
            onChange={handleChange}
            aria-label="email"
            required
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
            className="text-xl placeholder:text-lg"
            value={formData.password}
            onChange={handleChange}
            aria-label="password"
            required
          />
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            className="text-xl placeholder:text-lg"
            value={formData.confirmPassword}
            onChange={handleChange}
            aria-label="confirm-password"
            required
          />
        </div>

        {error && <p className="text-logout-color">{error}</p>}

        <div className="p-4 pt-3 bg-nav-white">
          <Button
            type="submit"
            className="rounded-xl text-lg bg-primary-color hover:bg-[#6235b1] text-nav-white outline-none focus:bg-gray-50 duration-200 w-full"
            disabled={isLoading} 
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
      <hr className="text-nav-active w-[80%] m-auto" />
      <span className="text-primary-color font-bold bg-nav-white cursor-pointer" onClick={() => navigate("/login")}>Already have an account?</span>
    </div>
  );
}

export default Register;
