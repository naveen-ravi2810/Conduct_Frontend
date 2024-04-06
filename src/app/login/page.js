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
      <div className="flex justify-center h-[90vh] items-center">
        <div>
          <form onSubmit={handle_login}>
            <div className="pb-3" id="login_topic">
              <h1>LOGIN</h1>
            </div>
            <div className="pb-3" id="email">
              <input
                className="outline-none p-2 border-green-500 border-[1px]"
                onChange={updateLoginDetails}
                type="email"
                name="email"
                placeholder="example@sece.ac.in"
                autoFocus
                required
              />
            </div>
            <div className="pb-3" id="password">
              <input
                className="outline-none p-2 border-green-500 border-[1px]"
                onChange={updateLoginDetails}
                type="password"
                name="password"
                placeholder="sece@123"
                required
              />
            </div>
            <div className="pb-3" id="login_btn">
              <button type="submit">Login</button>
            </div>
            <div className="pb-3" id="register_btn">
              <Link href="/signup">
                <button>Register</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
