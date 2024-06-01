"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [IsLoggedIN, setIsLoggedIN] = useState(null);
  const [User, setUser] = useState(null);
  const router = useRouter();

  async function check_token_status() {
    const resp = await fetch("/api/token", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (resp.ok) {
      const data = await resp.json();
      setUser(data);
      setIsLoggedIN(true);
    } else {
      setIsLoggedIN(false);
      localStorage.removeItem("token");
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      check_token_status();
    } else {
      setIsLoggedIN(false);
    }
  }, []);

  async function fn_logout() {
    const resp = await fetch("/api/logout", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (resp.ok) {
      localStorage.removeItem("token");
      setIsLoggedIN(false);
      router.replace("/");
    } else {
      alert("Some error");
    }
  }

  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-center">
          <h1 className="tracking-widest text-4xl text-purple-600 font-bold">
            Contact
          </h1>
          <p className="text-sm text-gray-600 uppercase">Get Help From Others</p>
        </div>
        <div className="items-center flex">
          <ul className="flex items-center gap-6">
            <li>
              <Link href="/" className="text-gray-800 hover:text-purple-600 transition duration-300">
                Home
              </Link>
            </li>
            {IsLoggedIN === true && (
              <div className="flex items-center gap-6">
                <li>
                  <Link href="/skills" className="text-gray-800 hover:text-purple-600 transition duration-300">
                    Skills
                  </Link>
                </li>
                <li>
                  <Link href="/people" className="text-gray-800 hover:text-purple-600 transition duration-300">
                    People
                  </Link>
                </li>
                <li>
                  <Link href="/forum" className="text-gray-800 hover:text-purple-600 transition duration-300">
                    Forum
                  </Link>
                </li>
                <li>
                  <Link href={`/profile/${User?.id}`} className="text-gray-800 hover:text-purple-600 transition duration-300">
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={fn_logout}
                    className="text-gray-800 hover:text-purple-600 transition duration-300"
                  >
                    Logout
                  </button>
                </li>
              </div>
            )}
            {IsLoggedIN === false && (
              <div className="flex items-center gap-6">
                <li>
                  <Link href="/login" className="text-gray-800 hover:text-purple-600 transition duration-300">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="text-gray-800 hover:text-purple-600 transition duration-300">
                    SignUp
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
      <hr className="border-t-2 border-gray-200" />
    </div>
  );
};

export default Navbar;
