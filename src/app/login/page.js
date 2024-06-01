"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const [LoginDetails, setLoginDetails] = useState({});
  const router = useRouter();

  function updateLoginDetails(event) {
    setLoginDetails({
      ...LoginDetails,
      [event.target.name]: event.target.value,
    });
  }

  async function handle_login(event) {
    event.preventDefault();
    const resp = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(LoginDetails),
    });
    if (resp.ok) {
      const data = await resp.json();
      localStorage.setItem("token", data.access_token);
      router.replace("/people");
    } else {
      alert("Invalid Credentials");
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
          <form onSubmit={handle_login}>
            <div className="pb-3 text-center">
              <h1 className="text-2xl font-bold text-gray-700">LOGIN</h1>
            </div>
            <div className="pb-3">
              <input
                className="outline-none p-2 border border-green-500 rounded w-full"
                onChange={updateLoginDetails}
                type="email"
                name="email"
                placeholder="example@sece.ac.in"
                autoFocus
                required
              />
            </div>
            <div className="pb-3">
              <input
                className="outline-none p-2 border border-green-500 rounded w-full"
                onChange={updateLoginDetails}
                type="password"
                name="password"
                placeholder="sece@123"
                required
              />
            </div>
            <div className="pb-3">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
              >
                Login
              </button>
            </div>
            <div className="pb-3 text-center">
              <Link href="/signup">
                <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-700">
                  Register
                </button>
              </Link>
            </div>
            <div className="text-center">
              <Link href="/forgot_password">
                <button className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-700">
                  Forgot Password
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
