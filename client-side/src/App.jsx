/* eslint-disable no-unused-vars */
import React, { useState } from "react";
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

      if (response.status === 200) {
        const data = response.data;

        if (data.links && data.links.length > 0) {
          setFoundLinks(data.links);
          setNumLinksFound(data.links.length);
        } else {
          setError("No links found.");
        }
      } else {
        setError("Error fetching data.");
      }
    } catch (error) {
      setError("Error fetching data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center">
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
    </>
  );
}

export default App;
