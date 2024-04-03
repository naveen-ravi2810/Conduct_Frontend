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
      const resp = await fetch(
        `/api/email_verification?email=${UserDetails["email"]}`,
      );
      if (resp.ok) {
        toast.success(`OTP SENDED TO ${UserDetails["email"]}`, {
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
    console.log("first");
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
          toast.success("Register successfully", {
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
      <div className="flex justify-center pt-20">
        <form onSubmit={handle_register} className="border-[1px] p-5 rounded">
          <h1 className="text-3xl font-bold text-center py-2">REGISTER</h1>
          <div className="py-2">
            <input
              type="text"
              className="w-full rounded outline-none border-[1px] border-gray-500 p-2"
              name="name"
              onChange={updateRegister}
              placeholder="test user"
              required
            />
          </div>
          <div className="py-2">
            <input
              type="password"
              className="w-full rounded outline-none border-[1px] border-gray-500 p-2"
              name="password"
              onChange={updateRegister}
              placeholder="test123"
              required
            />
          </div>
          <div className="py-2">
            <input
              type="text"
              className="w-full rounded outline-none border-[1px] border-gray-500 p-2"
              name="phone"
              onChange={updateRegister}
              placeholder="987654321"
              required
            />
          </div>
          <div className="py-2">
            <input
              type="email"
              className="w-full rounded outline-none border-[1px] border-gray-500 p-2"
              name="email"
              onChange={updateRegister}
              placeholder="test.t2021eceb@sece.ac.in"
              required
            />
          </div>
          <div className="py-2 flex items-center gap-3">
            <p>Select pass out year</p>
            <select
              className="p-2 outline-none border-[1px] border-[#ddd]"
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
          <div className="py-3 flex justify-center">
            {!OTP_send && (
              <p
                className="border-[1px] border-gray-600 p-2 rounded bg-green-300 hover:bg-green-500"
                onClick={send_otp}
              >
                SEND OTP
              </p>
            )}
            {OTP_send && (
              <div>
                <div className="py-2">
                  <input
                    type="text"
                    className="w-full rounded outline-none border-[1px] border-gray-500 p-2"
                    name="otp"
                    onChange={updateRegister}
                    placeholder="123456"
                    required
                  />
                </div>
                <button
                  className="border-[1px] border-gray-600 p-2 rounded bg-green-300 hover:bg-green-500"
                  type="submit"
                >
                  Register
                </button>
              </div>
            )}
          </div>
          <p className="text-center text-sm">Already Have an account</p>
          <div className="py-3 flex justify-center">
            <Link
              className="border-[1px] border-gray-600 p-2 rounded bg-green-300 hover:bg-green-500"
              href="/login"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
