import React from "react";
import Navbar from "@/components/Navbar"; // Assuming you have a Navbar component

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to SkillConnect
          </h1>
          <p className="text-lg text-gray-600">
            Connecting Students Through Skills
          </p>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            How It Works
          </h2>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                Create Your Profile
              </h3>
              <p className="text-gray-600">
                Sign up and create a profile highlighting your skills, interests, and goals.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                Search and Connect
              </h3>
              <p className="text-gray-600">
                Use our advanced search functionality to find students by name, skill, year of graduation, and more.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                View Profiles
              </h3>
              <p className="text-gray-600">
                Check out detailed profiles including portfolios, LinkedIn, GitHub, LeetCode, and other links to get a comprehensive understanding of potential connections.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                Get in Touch
              </h3>
              <p className="text-gray-600">
                Reach out directly through email to start collaborating and building your network.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Why Use SkillConnect?
          </h2>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600">
                <strong>Skill-Based Networking:</strong> Find people with the exact skills you need for your projects or study groups.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600">
                <strong>Enhanced Profiles:</strong> See beyond just names with links to portfolios, LinkedIn, GitHub, and more, ensuring you connect with the right individuals.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600">
                <strong>Teammate Search:</strong> Perfect for students looking for teammates for projects, hackathons, or any collaborative work.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Start Connecting Today!
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Join SkillConnect and expand your network within your institution. Find teammates, make new friends, and enhance your academic and project experiences.
          </p>
          <a href="/signup" className="inline-block px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600">
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
