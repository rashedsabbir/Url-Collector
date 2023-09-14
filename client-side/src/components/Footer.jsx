/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

const Footer = () => {
  const [counts, setCounts] = useState({ visits: 0, pageviews: 0 });

  useEffect(() => {
    // Check if it's a new visit (sessionStorage not set)
    const isNewVisit = sessionStorage.getItem("visit") === null;

    if (isNewVisit) {
      // It's a new visit, increment both visits and pageviews
      sessionStorage.setItem("visit", "x");
      const fetchData = async () => {
        try {
          const response = await fetch(
            "http://localhost:8000/count?type=visit-pageview",
            {
              method: "GET",
              credentials: "include",
            }
          );

          if (response.ok) {
            const data = await response.json();
            setCounts(data);
          } else {
            console.error("Error fetching counts:", response.status);
          }
        } catch (error) {
          console.error("Error fetching counts:", error);
        }
      };

      fetchData();
    } else {
      // It's a pageview, increment pageviews only
      const fetchData = async () => {
        try {
          const response = await fetch(
            "http://localhost:8000/count?type=pageview",
            {
              method: "GET",
              credentials: "include",
            }
          );

          if (response.ok) {
            const data = await response.json();
            setCounts(data);
          } else {
            console.error("Error fetching pageview count:", response.status);
          }
        } catch (error) {
          console.error("Error fetching pageview count:", error);
        }
      };

      fetchData();
    }
  }, []); // Empty dependency array to run only once during initial render

  return (
    <div>
      <footer className="bg-gradient-to-r from-gray-100 via-[#bce1ff] to-gray-100">
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              <h3 className="flex justify-center text-xl font-mono font-bold my-2 text-rose-400">
                Visitor Counts
              </h3>
              <div className="flex flex-row justify-center items-center gap-2 text-black">
                <div className="badge hover:bg-rose-500 bg-rose-500 p-5 rounded-lg text-white font-mono font-bold">
                  Visits
                  <div className="badge badge-warning ml-1">
                    {counts.visits}
                  </div>
                </div>
                <div className="badge hover:bg-warning bg-warning p-5 rounded-lg text-black font-mono font-bold">
                  Pageviews
                  <div className="badge bg-rose-500 border-none ml-1 text-white">
                    {counts.pageviews}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="flex justify-center items-center">
                <h3 className=" text-rose-400 font-bold font-mono text-xl ">
                  Developed By
                </h3>
              </div>
              <div className="flex flex-col gap-2 lg:w-96 md:w-96 sm:w-96 w-full">
                <div className="card border w-full hover:shadow-2xl relative flex flex-col mx-auto shadow-lg ">
                  <div className="buttons flex flex-col gap-1 absolute top-0 font-bold right-0 text-xs text-gray-500 space-x-0 my-3.5 mr-3">
                    <a
                      className="font-bold text-xs text-gray-500"
                      href="https://www.linkedin.com/in/mushfiqur--rahman/"
                    >
                      <div className="add border rounded-l-2xl rounded-r-sm border-gray-300 p-1 px-4 cursor-pointer hover:bg-gray-700 hover:text-white flex flex-row gap-1 items-center justify-center">
                        <Icon className="w-4 h-4" icon="skill-icons:linkedin" />
                        <span className="text-md">LinkedIn</span>
                      </div>
                    </a>
                    <a
                      className="font-bold text-xs text-gray-500"
                      href="https://github.com/Mushfiqur-Rahman-Robin"
                    >
                      <div className="add border rounded-l-2xl rounded-r-sm border-gray-300 p-1 px-4 cursor-pointer hover:bg-gray-700 hover:text-white flex flex-row gap-1 items-center justify-center">
                        <Icon
                          className="w-4 h-4"
                          icon="fa6-brands:square-github"
                        />
                        <span className="text-md">GitHub</span>
                      </div>
                    </a>
                  </div>
                  <div className="profile w-full flex m-3 ml-4 text-gray-500">
                    <img
                      className="w-28 h-28 p-1 bg-white rounded-full"
                      src="mushfiq.jpeg"
                      alt=""
                    />
                    <div className="title mt-11 ml-3 font-bold flex flex-col justify-end">
                      <div className="name break-words">
                        Md. Mushfiqur Rahman
                      </div>
                      <div className="add font-semibold text-sm italic dark">
                        Data Scientist
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card border w-full hover:shadow-2xl relative flex flex-col mx-auto shadow-lg ">
                  <div className="buttons flex flex-col gap-1 absolute top-0 right-0 font-bold text-xs text-gray-500 space-x-0 my-3.5 mr-3">
                    <a
                      className="font-bold text-xs text-gray-500"
                      href="https://www.linkedin.com/in/rashedsabbir"
                    >
                      <div className="add border rounded-l-2xl rounded-r-sm border-gray-300 p-1 px-4 cursor-pointer hover:bg-gray-700 hover:text-white flex flex-row gap-1 items-center justify-center">
                        <Icon className="w-4 h-4" icon="skill-icons:linkedin" />
                        <span className="text-md">LinkedIn</span>
                      </div>
                    </a>
                    <a
                      className="font-bold text-xs text-gray-500"
                      href="https://github.com/rashedsabbir"
                    >
                      <div className="add border rounded-l-2xl rounded-r-sm border-gray-300 p-1 px-4 cursor-pointer hover:bg-gray-700 hover:text-white flex flex-row gap-1 items-center justify-center">
                        <Icon
                          className="w-4 h-4"
                          icon="fa6-brands:square-github"
                        />
                        <span className="text-md">GitHub</span>
                      </div>
                    </a>
                  </div>
                  <div className="profile w-full flex m-3 ml-4 text-gray-500">
                    <img
                      className="w-28 h-28 p-1 bg-white rounded-full"
                      src="rashed.jpeg"
                      alt=""
                    />
                    <div className="title mt-11 ml-3 font-bold flex flex-col justify-end">
                      <div className="name break-words">
                        Rashedul Hassan Sabbir
                      </div>
                      <div className="add font-semibold text-sm italic dark">
                        Full-Stack Developer
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
