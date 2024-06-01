'use client'
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";

export default function Home() {
  const [Forums, setForums] = useState(null);

  async function getForums() {
    const resp = await fetch("/api/comments", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (resp.ok) {
      const data = await resp.json();
      setForums(data.items);
    }
  }

  async function makeReaction(reaction, id) {
    const resp = await fetch(
      `/api/comment_reaction?vote_state=${reaction}&comment_id=${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (resp.ok) {
      console.log("liked");
    }
  }

  useEffect(() => {
    getForums();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4">Forums</h1>
        {Forums &&
          Forums.map((forum, index) => (
            <div
              className="bg-white shadow-md rounded-lg p-4 mb-4"
              key={index}
            >
              <div className="flex items-center mb-2">
                <p className="text-sm text-gray-500">
                  <Link href={`/profile/${forum.user_id}`}>
                    {forum.user_name}
                  </Link>
                </p>
                <p className="ml-2 text-xs border border-rose-500 text-rose-500 rounded-full px-2 py-1">
                  {forum.type}
                </p>
              </div>
              <p className="text-gray-800">{forum.comment}</p>
              <div className="flex mt-2">
                <button
                  className="flex items-center mr-4 text-gray-500"
                  onClick={() => makeReaction("UP", forum.id)}
                >
                  <AiOutlineLike className="mr-1" />
                  {forum.likes}
                </button>
                <button
                  className="flex items-center mr-4 text-gray-500"
                  onClick={() => makeReaction("DOWN", forum.id)}
                >
                  <AiOutlineDislike className="mr-1" />
                  {forum.dislikes}
                </button>
                <button className="flex items-center text-gray-500">
                  <FaComment className="mr-1" />
                  {forum.sub_comments}
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
