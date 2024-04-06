'use client'
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";

export default function Home() {

  const [Forums, setForums] = useState(null)

  async function get_forums(){
    const resp = await fetch('/api/comments',{
      method:'GET',
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`
      }
    })
    if(resp.ok){
      const data = await resp.json()
      setForums(data.items)
    }
  }

  async function makereaction(reaction, id){
    // /comment_reaction?vote_state=UP&comment_id=9449ded3-3f2c-4c1d-8fc8-6ee9ecebf88c 
    const resp = await fetch(`/api/comment_reaction?vote_state=${reaction}&comment_id=${id}`,{
      method:'PATCH',
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('token')}`
      }
    })
    if (resp.ok){
      console.log("liked")
    }
  }

  useEffect(()=>{
    get_forums()
  },[])

  return (
    <div>
      <Navbar />
      <div>
        <h1>Forums</h1>
          {
            Forums && Forums.map((forum, index)=>(
              <div className="border-[1px] border-gray-500 my-2 w-[50%] rounded p-2" key={index}>
                <div className="flex gap-3 items-center">
                  <p className="underline text-sm text-gray-500"><Link href={`/profile/${forum.user_id}`}>{forum.user_name}</Link></p>
                  <p className="border-rose-500 text-sm border-[1px] w-fit rounded-full px-1">{forum.type}</p>
                </div>
                <p>{forum.comment}</p>
                <p className="text-xl flex gap-3">
                  <button className="flex gap-2 items-center" onClick={()=>makereaction("UP",forum.id)}>{forum.likes}<AiOutlineLike /></button>
                  <button className="flex gap-2 items-center" onClick={()=>makereaction("DOWN",forum.id)}>{forum.dislikes}<AiOutlineDislike /></button>
                  <button className="flex gap-2 items-center">{forum.sub_comments}<FaComment /></button>
                </p>
              </div>
            ))
          }
      </div>
    </div>
  );
}
