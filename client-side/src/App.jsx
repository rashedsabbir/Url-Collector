/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      // Clear previously extracted links
      setFoundLinks([]);
      setNumLinksFound(0);

      // Check if the inputUrl is empty
      if (!inputUrl) {
        toast.error("Please enter a url first!", {
          position: "top-right",
        });
        setLoading(false);
        return;
      }

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

  const handleCopyClick = (link) => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast.success("Link copied to clipboard!", { position: "top-right" });
      })
      .catch((error) => {
        console.error("Error copying link to clipboard:", error);
        toast.error("Failed to copy link to clipboard", {
          position: "top-right",
        });
      });
  };

  const handleDownloadTxt = () => {
    const linkText = foundLinks.join("\n");
    const blob = new Blob([linkText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "extracted_links.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
          <div className="">
            <div className="flex flex-row gap-6 justify-center p-4">
              <p className="flex items-center text-rose-400 justify-center">
                Total Links Found: {numLinksFound}
              </p>
              <button
                className="btn btn-info border-none btn-outline"
                onClick={handleDownloadTxt}
              >
                Download all
              </button>
            </div>
            <ul className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-2">
              {foundLinks.map((link, index) => (
                <li key={index}>
                  <div className="">
                    <div className="card w-96 bg-rose-500 text-primary-content shadow-xl">
                      <div className="card-body">
                        <h2 className="card-title">Link {index + 1}</h2>
                        <p className="truncate">{link}</p>
                        <div className="card-actions justify-end">
                          <button
                            className="btn btn-outline"
                            onClick={() => handleCopyClick(link)}
                          >
                            Copy
                          </button>
                          <a
                            className="text-warning"
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <button className="btn btn-outline btn-warning">
                              Visit
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {error && <p>Error: {error}</p>}
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
