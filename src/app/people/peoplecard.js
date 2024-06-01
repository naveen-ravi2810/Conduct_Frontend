import Link from "next/link";
import React from "react";

const Peoplecard = ({ details }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-10">
      {details.map((people, index) => (
        <Link href={`/profile/${people.id}`} key={index}>
          <div className="flex flex-col items-center justify-center border border-gray-200 rounded-lg p-4 transition duration-300 transform hover:scale-105">
            <div className="w-24 h-24 mb-4 overflow-hidden rounded-full">
              <img
                className="object-cover w-full h-full"
                src="https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg"
                alt={people.name}
              />
            </div>
            <div className="text-center">
              <p className="font-semibold text-lg">{people.name}</p>
              <p className="text-sm text-gray-500">{people.year}</p>
              <div className="flex flex-wrap justify-center mt-2">
                {people.skills.slice(0, 5).map((skill, index) => (
                  <span
                    key={index}
                    className="text-xs bg-green-400 text-white px-2 py-1 rounded-full mr-2 mb-2"
                  >
                    {skill.skill}
                  </span>
                ))}
                {people.skills.length > 5 && (
                  <span className="text-xs bg-gray-400 text-white px-2 py-1 rounded-full mr-2 mb-2">
                    +{people.skills.length - 5} more
                  </span>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Peoplecard;
