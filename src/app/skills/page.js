"use client";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AllSkills = () => {
  const [Skills, setSkills] = useState({});
  const [SkillName, setSkillName] = useState("");

  const [Page_no, setPage_no] = useState(1);

  const router = useRouter();

  function get_skills_and_the_count_by_name() {
    if (SkillName.length > 3 || SkillName.length == 0) {
      get_skills_and_the_count();

      setPage_no(1);
    }
  }

  async function get_skills_and_the_count() {
    const params = new URLSearchParams();
    params.append("page_no", Page_no);
    if (SkillName !== null && SkillName !== undefined && SkillName !== "") {
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
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      get_skills_and_the_count();
    } else {
      router.replace("/");
    }
  }, [Page_no]);

  return (
    <div>
      <Navbar />
      <div className="flex justify-center pt-10 gap-3">
        <div>
          <input
            autoFocus
            className="outline-none border-[1px] border-gray-600 p-2"
            name="skill"
            onChange={(e) => setSkillName(e.target.value)}
            placeholder="Search Skill"
          />
          <p className="text-red-600 text-xs">*length should be atleast 3</p>
        </div>
        <button
          className="border-[1px] border-gray-600 bg-gray-400 hover:bg-gray-600 p-2 rounded-3xl"
          onClick={() => get_skills_and_the_count_by_name()}
        >
          Search
        </button>
      </div>
      <div className="flex gap-10 justify-center pt-10 items-center">
        <button
          disabled={Page_no == 1}
          className="border-[1px] border-gray-600 bg-gray-400 hover:bg-gray-600 p-2 rounded-3xl"
          onClick={() => setPage_no(Page_no - 1)}
        >
          Previous
        </button>
        <p>{Page_no}</p>
        <button
          className="border-[1px] border-gray-600 bg-gray-400 hover:bg-gray-600 p-2 rounded-3xl"
          onClick={() => setPage_no(Page_no + 1)}
        >
          Next
        </button>
      </div>
      <div className="pt-20 relative flex overflow-hidden flex-wrap">
        {Skills.length > 0 &&
          Skills.map((skill, index) => (
            <div
              className="flex bg-yellow-500 w-fit py-1 px-2 rounded-3xl gap-3 m-1"
              key={index}
            >
              <p>{skill.skill}</p>
              <p className="bg-white px-1 rounded-full">{skill.count}</p>
            </div>
          ))}
        {Skills.length == 0 && <div>Nothing to Show</div>}
      </div>
    </div>
  );
};

export default AllSkills;
