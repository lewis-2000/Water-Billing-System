import React, { useState } from "react";

export default function RegistrationView() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Registered: ${form.name}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Register New Account</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-3 max-w-md bg-gray-100 p-4 rounded-lg"
      >
        <input
          className="w-full p-2 border rounded"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 border rounded"
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 border rounded"
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
