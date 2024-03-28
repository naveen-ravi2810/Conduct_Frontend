"use client";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import Peoplecard from "./peoplecard";

const Peoples = () => {
  const [FilterDetails, setFilterDetails] = useState({});
  const [UsersData, setUsersData] = useState();
  const [IsLoading, setIsLoading] = useState(true);

  function updateFilerOptions(event) {
    setFilterDetails({
      ...FilterDetails,
      [event.target.name]: event.target.value,
    });
  }

  const example_data = [
    {
      skill: "Python",
      year: 2025,
    },
    {
      skill: "FastAPI",
      year: 2024,
    },
    {
      skill: "MySQL",
      year: 2025,
    },
    {
      skill: "Machine Learning",
      year: 2025,
    },
    {
      skill: "C++",
      year: 2027,
    },
    {
      skill: "JavaScript",
      year: 2026,
    },
    {
      skill: "React",
      year: 2024,
    },
    {
      skill: "PostgreSQL",
      year: 2023,
    },
    {
      skill: "Docker",
      year: 2025,
    },
    {
      skill: "Deep Learning",
      year: 2027,
    },
    {
      skill: "TypeScript",
      year: 2012,
    },
    {
      skill: "Vue.js",
      year: 2014,
    },
    {
      skill: "MongoDB",
      year: 2009,
    },
    {
      skill: "TensorFlow",
      year: 2015,
    },
    {
      skill: "Kubernetes",
      year: 2014,
    },
  ];

  async function handle_filter(event) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (
      FilterDetails.skill !== null &&
      FilterDetails.skill !== undefined &&
      FilterDetails.skill !== ""
    ) {
      params.append("skill", FilterDetails.skill);
    }
    if (
      FilterDetails.year !== null &&
      FilterDetails.year !== undefined &&
      FilterDetails.year !== ""
    ) {
      params.append("year", FilterDetails.year);
    }
    if (
      FilterDetails.name !== null &&
      FilterDetails.name !== undefined &&
      FilterDetails.name !== ""
    ) {
      params.append("name", FilterDetails.name);
    }
    const url = `/api/get_user_by_filter?${params.toString()}`;
    const resp = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (resp.ok) {
      const data = await resp.json();
      setUsersData(data);
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Navbar />
      <div>
        <div className="pt-6">
          <form onSubmit={handle_filter} className="flex justify-center gap-5">
            <input
              className="p-2 outline-none border-[1px] border-[#ddd]"
              placeholder="Search by Name"
              type="text"
              name="name"
              onChange={updateFilerOptions}
              value={FilterDetails.name || ""}
            />
            <input
              className="p-2 outline-none border-[1px] border-[#ddd]"
              placeholder="Search by Skills"
              type="text"
              name="skill"
              onChange={updateFilerOptions}
              value={FilterDetails.skill || ""}
            />
            <select
              className="p-2 outline-none border-[1px] border-[#ddd]"
              name="year"
              onChange={updateFilerOptions}
              value={FilterDetails.year || ""}
            >
              <option value="">Select Year</option>
              {Array.from({ length: 20 }, (_, index) => index + 2012).map(
                (number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ),
              )}
            </select>
            <button className="p-2 border-[#ddd] rounded-2xl border-[1px]">
              Filter
            </button>
          </form>
        </div>
        <div>
          <p className="text-center py-10 font-bold text-3xl">
            Search Users by their skills and their year
          </p>
          <div
            className="flex gap-2 w-full overflow-x-scroll"
            style={{ overflowX: "scroll" }}
          >
            {example_data.map((skill, index) => (
              <button
                onClick={(e) => {
                  setFilterDetails(skill);
                }}
                className="flex gap-3 border-[1px] p-2 rounded-3xl w-full"
                key={index}
              >
                <p className="flex gap-1" style={{ whiteSpace: "nowrap" }}>
                  {skill.skill}
                  <span></span>
                  {skill.year}
                </p>
              </button>
            ))}
          </div>
          {IsLoading === false ? (
            <Peoplecard details={UsersData} />
          ) : (
            <div className="px-10">
              <div className="flex justify-center pt-20 text-3xl">
                Search for the Peoples
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Peoples;
