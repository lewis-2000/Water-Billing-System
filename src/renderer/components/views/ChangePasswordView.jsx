import React, { useState } from "react";

export default function ChangePasswordView() {
  const [form, setForm] = useState({ old: "", newPass: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Password changed!");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-3 max-w-md bg-gray-100 p-4 rounded-lg"
      >
        <input
          className="w-full p-2 border rounded"
          name="old"
          type="password"
          placeholder="Old Password"
          value={form.old}
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 border rounded"
          name="newPass"
          type="password"
          placeholder="New Password"
          value={form.newPass}
          onChange={handleChange}
          required
        />
        <button className="w-full bg-green-600 text-white py-2 rounded">
          Update Password
        </button>
      </form>
    </div>
  );
}
