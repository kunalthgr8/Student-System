import React, { useState } from 'react';
import { Input, Button } from "../index"; // Assuming custom Input and Button components are being imported

function Register() {
  // State management for form inputs
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  // Handling input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Basic form submission handler with password validation
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError('');
      // Add form submission logic (e.g., calling an API, Redux action, etc.)
      console.log('Form Submitted', formData);
    }
  };

  return (
    <div className="flex w-1/3 h-full mt-20 gap-5 flex-col justify-center text-center self-center border border-nav-active p-5 rounded-lg">
      <h1 className="text-4xl font-bold tracking-widest">Register</h1>
      
      <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center self-center">
        <div className="p-4 gap-4">
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

        {error && <p className="text-red-500">{error}</p>} {/* Display error if passwords don't match */}

        <div className="p-4 pt-3">
          <Button
            type="submit"
            className="w-full rounded-xl text-xl bg-text-green hover:bg-button-color text-nav-white focus:bg-gray-50 duration-200"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Register;
