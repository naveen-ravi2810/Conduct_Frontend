"use client";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Change_Password = () => {
  const [PasswordDetails, setPasswordDetails] = useState({});

  function update_password(event) {
    setPasswordDetails({
      ...PasswordDetails,
      [event.target.name]: event.target.value,
    });
  }

  async function handle_password_change(event) {
    event.preventDefault();
    const resp = await fetch("/api/change_password", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(PasswordDetails),
    });
    if (resp.ok) {
      toast.success("Updated successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      const data = await resp.json();
      toast.error(data.detail, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }

  return (
    <div>
      <Navbar />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
        <form onSubmit={handle_password_change} className="space-y-4">
          <div>
            <label htmlFor="old_password" className="block">
              OLD PASSWORD
            </label>
            <input
              type="password"
              id="old_password"
              name="old_password"
              onChange={update_password}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="new_password" className="block">
              NEW PASSWORD
            </label>
            <input
              type="password"
              id="new_password"
              name="new_password"
              onChange={update_password}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="re_enter_new_password" className="block">
              RE-ENTER NEW PASSWORD
            </label>
            <input
              type="password"
              id="re_enter_new_password"
              name="re_enter_new_password"
              onChange={update_password}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Change_Password;
