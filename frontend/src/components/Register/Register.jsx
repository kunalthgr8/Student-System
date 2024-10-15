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
    <div className="flex w-1/3 h-full mt-20 gap-5 flex-col justify-center text-center self-center border border-nav-active p-5 rounded-lg">
      <h1 className="text-4xl font-bold tracking-widest">Register</h1>
      
      <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center self-center">
        <div className="p-4 gap-4">
          <Input
            label="Full Name" 
            name="fullName"
            type="text"
            placeholder="Full Name"
            className="text-xl"
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
            className="text-xl"
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
            className="text-xl"
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
            className="text-xl"
            value={formData.confirmPassword}
            onChange={handleChange}
            aria-label="confirm-password"
            required
          />
        </div>

        {error && <p className="text-logout-color">{error}</p>}

        <div className="p-4 pt-3">
          <Button
            type="submit"
            className="w-full rounded-xl text-xl bg-text-green hover:bg-button-color text-nav-white focus:bg-gray-50 duration-200"
            disabled={isLoading} 
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Register;
