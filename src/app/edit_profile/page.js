"use client";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Skills from "./skills";

const EditProfile = () => {
  const router = useRouter();
  const [UserData, setUserData] = useState({});

  function UpdateUserDetails(event) {
    setUserData({
      ...UserData,
      [event.target.name]: event.target.value,
    });
  }

  function set_data_null(key) {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [key]: null,
    }));
  }

  async function get_profile_link_and_skills() {
    const resp = await fetch("/api/update_uri", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "GET",
    });
    if (resp.ok) {
      const data = await resp.json();
      setUserData(data);
    }
  }

  async function handle_update(event) {
    event.preventDefault();
    const resp = await fetch("/api/update_user", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(UserData),
    });
    if (resp.ok) {
      const data = await resp.json();
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
      alert("An error");
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      get_profile_link_and_skills();
    } else {
      router.replace("/");
    }
  }, []);
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
      <div id="edit_links" className="flex justify-center">
        <form onSubmit={handle_update}>
          <h1 className="text-center text-3xl font-extrabold py-7">
            Update Links
          </h1>
          <div className="grid gap-3 grid-cols-3 border-2 p-2">
            <p className="uppercase font-bold flex items-center">
              LinkedIN URI
            </p>
            <input
              className="outline-none border-[1px] border-gray-700 p-2"
              value={UserData.linkedin_uri || ""}
              type="text"
              name="linkedin_uri"
              onChange={UpdateUserDetails}
              placeholder={
                UserData.linkedin_uri
                  ? UserData["linkedin_uri"]
                  : "Please Enter linkedin_uri"
              }
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                set_data_null("linkedin_uri");
              }}
            >
              Make Null
            </button>
          </div>
          <div className="grid gap-3 grid-cols-3 border-2 p-2">
            <p className="uppercase font-bold flex items-center">github URI</p>
            <input
              className="outline-none border-[1px] border-gray-700 p-2"
              value={UserData.github_uri || ""}
              type="text"
              name="github_uri"
              onChange={UpdateUserDetails}
              placeholder={
                UserData.github_uri
                  ? UserData["github_uri"]
                  : "Please Enter github_uri"
              }
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                set_data_null("github_uri");
              }}
            >
              Make Null
            </button>
          </div>
          <div className="grid gap-3 grid-cols-3 border-2 p-2">
            <p className="uppercase font-bold flex items-center">
              leetcode URI
            </p>
            <input
              className="outline-none border-[1px] border-gray-700 p-2"
              value={UserData.leetcode_uri || ""}
              type="text"
              name="leetcode_uri"
              onChange={UpdateUserDetails}
              placeholder={
                UserData.leetcode_uri
                  ? UserData["leetcode_uri"]
                  : "Please Enter leetcode_uri"
              }
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                set_data_null("leetcode_uri");
              }}
            >
              Make Null
            </button>
          </div>
          <div className="grid gap-3 grid-cols-3 border-2 p-2">
            <p className="uppercase font-bold flex items-center">
              codechef URI
            </p>
            <input
              className="outline-none border-[1px] border-gray-700 p-2"
              value={UserData.codechef_uri || ""}
              type="text"
              name="codechef_uri"
              onChange={UpdateUserDetails}
              placeholder={
                UserData.codechef_uri
                  ? UserData["codechef_uri"]
                  : "Please Enter codechef_uri"
              }
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                set_data_null("codechef_uri");
              }}
            >
              Make Null
            </button>
          </div>
          <div className="grid gap-3 grid-cols-3 border-2 p-2">
            <p className="uppercase font-bold flex items-center">
              Portfolio URI
            </p>
            <input
              className="outline-none border-[1px] border-gray-700 p-2"
              value={UserData.portfolio_uri || ""}
              type="text"
              name="portfolio_uri"
              onChange={UpdateUserDetails}
              placeholder={
                UserData.portfolio_uri
                  ? UserData["portfolio_uri"]
                  : "Please Enter portfolio_uri"
              }
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                set_data_null("portfolio_uri");
              }}
            >
              Make Null
            </button>
          </div>
          <div className="grid gap-3 grid-cols-3 border-2 p-2">
            <p className="uppercase font-bold flex items-center">description</p>
            <textarea
              className="outline-none border-[1px] border-gray-700 p-2"
              value={UserData.description || ""}
              type="text"
              name="description"
              onChange={UpdateUserDetails}
              placeholder={
                UserData.codechef_uri
                  ? UserData["description"]
                  : "Please Enter description"
              }
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                set_data_null("description");
              }}
            >
              Make Null
            </button>
          </div>
          <div className="flex justify-center py-2">
            <button
              type="submit"
              className="rounded-xl bg-gray-200 p-2 hover:text-white hover:bg-gray-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
      <div id="add_skills">
        <h1 className="text-center text-3xl font-extrabold py-7">
          Update Skills
        </h1>
        <div id="existing_skills">
          <Skills />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
