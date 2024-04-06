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
    <div>
      <div className="flex justify-between">
        <div>
          <h1 className="tracking-widest text-4xl border-b-violet-400 border-b-2 text-center">
            Contact
          </h1>
          <p className="text-sm text-center pt-1 uppercase">
            Get Help From Others
          </p>
        </div>
        <div className="items-center flex px-3">
          <ul className="flex items-center gap-3">
            <li>
              <Link href="/">Home</Link>{" "}
            </li>
            {IsLoggedIN === true && (
              <div className="flex gap-3">
                <li>
                  <Link href="/skills">Skills</Link>{" "}
                </li>
                <li>
                  <Link href="/people">People</Link>{" "}
                </li>
                <li>
                  <Link href={`/forum`}>Forum</Link>{" "}
                </li>
                <li>
                  <Link href={`/profile/${User["id"]}`}>Profile</Link>{" "}
                </li>
                <li>
                  <button onClick={() => fn_logout()}>Logout</button>{" "}
                </li>
              </div>
            )}
            {IsLoggedIN === false && (
              <div className="flex gap-3">
                <li>
                  <Link href="/login">Login</Link>{" "}
                </li>
                <li>
                  <Link href="/signup">SignUp</Link>{" "}
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Navbar;
