"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [UserDetails, setUserDetails] = useState({});
  const [OTP_send, setOTP_send] = useState(false);
  const router = useRouter();

  function updateRegister(event) {
    setUserDetails({
      ...UserDetails,
      [event.target.name]: event.target.value,
    });
  }

  async function send_otp(event) {
    event.preventDefault();
    if (UserDetails["email"].endsWith("@sece.ac.in")) {
      const resp = await fetch(`/api/email_verification?email=${UserDetails["email"]}`);
      if (resp.ok) {
        toast.success(`OTP SENT TO ${UserDetails["email"]}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setOTP_send(true);
      } else {
        const data = await resp.json();
        toast.error(data.detail, {
          position: "top-right",
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
  }

  async function handle_register(event) {
    event.preventDefault();
    if (UserDetails["email"].endsWith("@sece.ac.in")) {
      if (UserDetails["password"].length > 7) {
        const resp = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(UserDetails),
        });
        if (resp.ok) {
          toast.success("Registered successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          router.replace("/login");
        } else {
          const data = await resp.json();
          toast.error(data.detail, {
            position: "top-right",
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
    } else {
      alert("Error");
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
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form onSubmit={handle_register} className="bg-white border border-gray-200 p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">REGISTER</h1>
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-3 border rounded-md outline-none focus:border-blue-500"
              name="name"
              onChange={updateRegister}
              placeholder="Name"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="w-full p-3 border rounded-md outline-none focus:border-blue-500"
              name="password"
              onChange={updateRegister}
              placeholder="Password"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-3 border rounded-md outline-none focus:border-blue-500"
              name="phone"
              onChange={updateRegister}
              placeholder="Phone"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              className="w-full p-3 border rounded-md outline-none focus:border-blue-500"
              name="email"
              onChange={updateRegister}
              placeholder="Email (must be @sece.ac.in)"
              required
            />
          </div>
          <div className="mb-4 flex items-center gap-3">
            <p>Select pass out year</p>
            <select
              className="p-3 border rounded-md outline-none focus:border-blue-500"
              name="year"
              onChange={updateRegister}
              required
            >
              <option value="">Select Year</option>
              {Array.from({ length: 28 }, (_, index) => index + 2000).map(
                (number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ),
              )}
            </select>
          </div>
          <div className="mb-4 flex justify-center">
            {!OTP_send ? (
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                onClick={send_otp}
              >
                Send OTP
              </button>
            ) : (
              <div className="w-full">
                <div className="mb-4">
                  <input
                    type="text"
                    className="w-full p-3 border rounded-md outline-none focus:border-blue-500"
                    name="otp"
                    onChange={updateRegister}
                    placeholder="OTP"
                    required
                  />
                </div>
                <button
                  className="bg-blue-500 text-white w-full px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  type="submit"
                >
                  Register
                </button>
              </div>
            )}
          </div>
          <p className="text-center text-sm">Already have an account?</p>
          <div className="flex justify-center mt-4">
            <Link href="/login" legacyBehavior>
              <a className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50">
                Login
              </a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
