"use client";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AllSkills = () => {
  const [Skills, setSkills] = useState({});
  const [SkillName, setSkillName] = useState("");
  const [Page_no, setPage_no] = useState(1);
  const [StartIndex, setStartIndex] = useState(0);
  const [Limit, setLimit] = useState(0);
  const router = useRouter();
  const isLastPage = Page_no >= Skills.pages;
  let typingTimer;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      get_skills_and_the_count();
    } else {
      router.replace("/");
    }
  }, [Page_no]);

  useEffect(() => {
    clearTimeout(typingTimer);
    if (SkillName.length >= 3 || SkillName.length === 0) {
      typingTimer = setTimeout(get_skills_and_the_count, 1000);
      setPage_no(1);
    }
  }, [SkillName]);

  async function get_skills_and_the_count() {
    const params = new URLSearchParams();
    params.append("page", Page_no);
    if (SkillName) {
      params.append("skill", SkillName);
    }
    const resp = await fetch(`/api/get_skills?${params.toString()}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (resp.ok) {
      const data = await resp.json();
      setSkills(data);
      setStartIndex((Page_no - 1) * data.size + 1);
      setLimit(Page_no * data.size < data.total ? Page_no * data.size : data.total);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex justify-center pt-10 gap-3">
        <div className="w-1/3">
          <input
            autoFocus
            className="w-full outline-none border border-gray-400 rounded-lg p-2"
            name="skill"
            onChange={(e) => {
              clearTimeout(typingTimer);
              setSkillName(e.target.value);
            }}
            placeholder="Search Skill"
          />
          <p className="text-red-600 text-xs">*Length should be at least 3</p>
        </div>
      </div>
      <div className="flex gap-10 justify-center pt-10 items-center">
        <button
          disabled={Page_no === 1}
          className={`border border-gray-600 p-2 rounded-lg ${
            Page_no === 1 ? "bg-gray-200" : "bg-gray-400 hover:bg-gray-600 text-white"
          }`}
          onClick={() => setPage_no(Page_no - 1)}
        >
          Previous
        </button>
        <p className="text-xl">{Page_no}</p>
        <button
          disabled={isLastPage}
          className={`border border-gray-600 ${
            isLastPage ? "bg-gray-200 cursor-not-allowed" : "bg-gray-400 hover:bg-gray-600 text-white"
          } p-2 rounded-lg`}
          onClick={() => setPage_no(Page_no + 1)}
        >
          Next
        </button>
      </div>
      <div className="pt-10 text-center">
        <p className="text-gray-600">
          Showing {StartIndex}-{Limit} of {Skills.total} skills
        </p>
      </div>
      <div className="pt-20 flex flex-wrap justify-center">
        {Skills["items"] &&
          Skills["items"].map((skill, index) => (
            <div
              className="flex bg-yellow-500 py-1 px-3 rounded-full gap-3 m-2 shadow-lg"
              key={index}
            >
              <p className="text-white font-semibold">{skill.skill}</p>
              <p className="bg-white text-yellow-500 px-2 rounded-full">{skill.count}</p>
            </div>
          ))}
        {Skills["items"]?.length === 0 && (
          <div className="text-gray-600 text-xl">Nothing to Show</div>
        )}
      </div>
    </div>
  );
};

export default AllSkills;
