"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

const Profile = () => {
  const [IsLoading, setIsLoading] = useState(true);
  const [UserData, setUserData] = useState(null);
  const [Current_User, setCurrent_User] = useState(false);

  const router = useRouter();
  const pathname = useParams();
  async function get_user_profile() {
    const resp = await fetch(`/api/profile/${pathname.user_id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (resp.ok) {
      const data = await resp.json();
      setUserData(data);
      setCurrent_User(data.curr_user);
      setIsLoading(false);
    } else {
      router.replace("/");
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      get_user_profile();
    } else {
      router.replace("/");
    }
  }, []);

  return (
    <div className="w-full">
      <Navbar />
      <div className="flex justify-center pt-4">
        <div className=" w-[50%]">
          <h1 className="uppercase flex justify-center gap-5 text-3xl font-extrabold">
            PRofile{" "}
            {Current_User && (
              <Link href="/edit_profile">
                <FaEdit />
              </Link>
            )}
          </h1>
          <div className="">
            {IsLoading === false && (
              <div>
                <table className="styled-table">
                  <tbody>
                    <tr>
                      <td>ID</td>
                      <td>{UserData.id}</td>
                    </tr>
                    <tr>
                      <td>Name</td>
                      <td>{UserData.name}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>{UserData.email}</td>
                    </tr>
                    <tr>
                      <td>Phone</td>
                      <td>{UserData.phone}</td>
                    </tr>
                    <tr>
                      <td>Portfolio</td>
                      <td>
                        {UserData.portfolio_uri ? (
                          <Link
                            className="text-blue-400"
                            href={UserData.portfolio_uri}
                            target="_blank"
                          >
                            {UserData.portfolio_uri}
                          </Link>
                        ) : (
                          <p className="text-gray-500">----null------</p>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>LinkedIn</td>
                      <td>
                        {UserData.linkedin_uri ? (
                          <Link
                            className="text-blue-400"
                            href={UserData.linkedin_uri}
                            target="_blank"
                          >
                            {UserData.linkedin_uri}
                          </Link>
                        ) : (
                          <p className="text-gray-500">----null------</p>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>LeetCode</td>
                      <td>
                        {UserData.leetcode_uri ? (
                          <Link
                            className="text-blue-400"
                            href={UserData.leetcode_uri}
                            target="_blank"
                          >
                            {UserData.leetcode_uri}
                          </Link>
                        ) : (
                          <p className="text-gray-500">----null------</p>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Code Chef</td>
                      <td>
                        {UserData.codechef_uri ? (
                          <Link
                            className="text-blue-400"
                            href={UserData.codechef_uri}
                            target="_blank"
                          >
                            {UserData.codechef_uri}
                          </Link>
                        ) : (
                          <p className="text-gray-500">----null------</p>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Github</td>
                      <td>
                        {UserData.github_uri ? (
                          <Link
                            className="text-blue-400"
                            href={UserData.github_uri}
                            target="_blank"
                          >
                            {UserData.github_uri}
                          </Link>
                        ) : (
                          <p className="text-gray-500">----null------</p>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Description</td>
                      <td>
                        {UserData.description ? (
                          <p className="">{UserData.description}</p>
                        ) : (
                          <p className="text-gray-500">----null------</p>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div
                  id="skills"
                  className="pt-3 mt-3 border-[#ddd] border-[2px] p-3"
                >
                  <h1 className="text-3xl flex gap-3">Skills</h1>
                  <div className="flex flex-wrap mt-2">
                    {UserData.skills &&
                      UserData.skills.map((skill, index) => (
                        <p
                          key={index}
                          href={`/skills/${skill.skill}`}
                          className="px-3 py-2 bg-green-500 text-white rounded-full text-sm mr-2 mb-2 hover:bg-green-600 transition duration-300"
                        >
                          {skill.skill}
                        </p>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="text-blue-500 text-2xl text-right pt-10">
            {Current_User && (
              <Link href={`/change_password`}>
                <button>Change Password</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
