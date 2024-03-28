"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Skills = () => {
  const router = useRouter();
  const [IsLoading, setIsLoading] = useState(true);
  const [Skills, setSkills] = useState([]);
  const [UnAddedSkills, setUnAddedSkills] = useState([]);
  const [SkillName, setSkillName] = useState("");

  async function get_user_skills() {
    const resp = await fetch("/api/get_user_skills", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (resp.ok) {
      const data = await resp.json();
      setSkills(data);
      setIsLoading(false);
    }
  }

  const [Page_no, setPage_no] = useState(1);

  async function get_user_unadded_skills() {
    // if (SkillName.length < 3){
    //     return;
    // }
    const params = new URLSearchParams();
    params.append("page_no", Page_no);
    if (SkillName !== null && SkillName !== undefined && SkillName !== "") {
      params.append("skill", SkillName);
    }
    const resp = await fetch(`/api/get_unadded_skills?${params.toString()}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (resp.ok) {
      const data = await resp.json();
      setUnAddedSkills(data);
    } else {
      alert("Some error");
    }
  }

  function AddToSkills(skill) {
    setSkills((prevSkills) => [...prevSkills, skill]);
    setUnAddedSkills((prevUnAddedSkills) =>
      prevUnAddedSkills.filter((s) => s.id !== skill.id),
    );
  }

  function RemoveFromSkills(skill) {
    setSkills((prevSkills) => prevSkills.filter((s) => s.id !== skill.id));
    setUnAddedSkills((prevUnAddedSkills) => [...prevUnAddedSkills, skill]);
  }

  async function updateSkills() {
    const resp = await fetch("/api/update_skill", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Skills),
    });
    if (resp.ok) {
      toast.success("Updated Successfully", {
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
      toast.error("Updated Failed", {
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
    }
  }

  // This useeffect is used for the start time event occur to get the user skills
  useEffect(() => {
    if (localStorage.getItem("token")) {
      get_user_skills();
    } else {
      router.replace("/");
    }
  }, []);

  // This useeffect is for when you change page for the next skill bar
  useEffect(() => {
    if (localStorage.getItem("token")) {
      get_user_unadded_skills();
    } else {
      router.replace("/");
    }
  }, [Page_no, SkillName]);

  return (
    <div>
      <ToastContainer
        position="top-right"
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
      {IsLoading ? (
        <div>Loading</div>
      ) : (
        <div className="flex justify-center">
          <div>
            {Skills.length > 0 ? (
              <div className="grid gap-4 grid-cols-6">
                {Skills.map((skill, index) => (
                  <button
                    className="bg-green-500 hover:bg-red-500 rounded h-10 p-1"
                    onClick={() => RemoveFromSkills(skill)}
                    key={index}
                  >
                    {skill.skill}
                  </button>
                ))}
              </div>
            ) : (
              <div>
                <p>Nothing to show</p>
              </div>
            )}
            <br />
            <div className="flex justify-center pt-10">
              <button
                onClick={() => updateSkills()}
                className="rounded-xl bg-gray-200 p-2 hover:text-white hover:bg-gray-600"
              >
                UPDATE SKILLS
              </button>
            </div>
            <div className="flex justify-center pt-10 gap-3">
              <div>
                <input
                  autoFocus
                  className="outline-none border-[1px] border-gray-600 p-2"
                  name="skill"
                  onChange={(e) => setSkillName(e.target.value)}
                  placeholder="Search Skill"
                />
                <p className="text-red-600 text-xs">
                  *length should be atleast 3
                </p>
              </div>
              {/* <button className='border-[1px] border-gray-600 bg-gray-400 hover:bg-gray-600 p-2 rounded-3xl' onClick={()=>get_user_unadded_skills()}>Search</button> */}
            </div>
            <div className="flex gap-10 justify-center py-10 items-center">
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
            <div className="">
              {UnAddedSkills.length > 0 ? (
                <div className="relative flex overflow-hidden flex-wrap ">
                  {UnAddedSkills.map((skill, index) => (
                    <button
                      className="bg-red-500 flex hover:bg-green-500 rounded p-1 w-fit py-1 px-2 gap-3 m-1 "
                      onClick={() => AddToSkills(skill)}
                      key={index}
                    >
                      {skill.skill}
                    </button>
                  ))}
                </div>
              ) : (
                <div>
                  <p>Every skill was added</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Skills;

// export default Skills
