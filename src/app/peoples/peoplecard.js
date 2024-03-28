import Link from "next/link";
import React from "react";

const Peoplecard = ({ details }) => {
  return (
    <div className="grid grid-cols-3 py-10">
      {details.map((people, index) => (
        <Link href={`/profile/${people.id}`} key={index} className="flex">
          <div>
            <img
              width={100}
              src="https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg"
            />
          </div>
          <div>
            <p>{people.name}</p>
            <p>{people.year}</p>
            <div className="flex">
              {people["skills"].slice(0, 5).map((skill, index) => (
                <p
                  key={index}
                  style={{ whiteSpace: "nowrap" }}
                  className="text-sm bg-green-400 rounded-2xl w-fit p-1"
                >
                  {skill.skill}
                </p>
              ))}
              {people["skills"].length > 5 && (
                <p className="text-sm  rounded-2xl w-full p-2">...</p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Peoplecard;
