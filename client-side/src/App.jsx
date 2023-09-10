/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [foundLinks, setFoundLinks] = useState([]);
  const [numLinksFound, setNumLinksFound] = useState(0);
  const [inputUrl, setInputUrl] = useState("");
  const [error, setError] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `http://localhost:8000/crawl/?base_url=${encodeURIComponent(inputUrl)}`,
        null,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response from server:", response);

      if (response.status === 200) {
        // Fetch the links from the server
        const linksResponse = await axios.get(
          `http://localhost:8000/get-links`
        );
        const linksData = linksResponse.data;

        if (linksData.links && linksData.links.length > 0) {
          setFoundLinks(linksData.links);
          setNumLinksFound(linksData.links.length);
        } else {
          setError("No links found.");
        }
      } else {
        setError("Error fetching data.");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data: " + error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center">
        <div className="flex justify-center items-center py-8">
          <h3 className="text-rose-400 font-mono font-bold text-3xl">
            Url Collector
          </h3>
        </div>
        <div className="relative w-full sm:max-w-2xl px-2 sm:mx-auto">
          <div className="overflow-hidden z-0 rounded-full relative p-3">
            <form
              role="form"
              className="relative flex z-50 rounded-full"
              onSubmit={handleSearch}
            >
              <input
                type="text"
                placeholder="enter your link here"
                className="rounded-full bg-white text-black rounded-r-lg flex-1 px-4 py-4 focus:outline-none"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
              />
              <button
                type="submit"
                className="bg-indigo-500 text-white rounded-full rounded-l-lg font-semibold px-4 py-4 hover:bg-indigo-400 focus:bg-indigo-600 focus:outline-none"
              >
                Search
              </button>
            </form>
            <div className="glow glow-1 z-10 bg-pink-400 absolute"></div>
            <div className="glow glow-2 z-20 bg-purple-400 absolute"></div>
            <div className="glow glow-3 z-30 bg-yellow-400 absolute"></div>
            <div className="glow glow-4 z-40 bg-blue-400 absolute"></div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center py-8 text-blue-500">
        {loading && <p>Loading...</p>}
        {foundLinks.length > 0 ? (
          <div>
            <h2>Found Links:</h2>
            <ul>
              {foundLinks.map((link, index) => (
                <li key={index}>{link}</li>
              ))}
            </ul>
            <p>Total Links Found: {numLinksFound}</p>
          </div>
        ) : null}
        {error && <p>Error: {error}</p>}
      </div>
    </>
  );
}

export default App;
