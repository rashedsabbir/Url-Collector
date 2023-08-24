/* eslint-disable react/no-unknown-property */
import "./App.css";

function App() {
  return (
    <>
      <div class="min-h-screen flex flex-col justify-center">
        <div class="relative w-full sm:max-w-2xl px-2 sm:mx-auto">
          <div class="overflow-hidden z-0 rounded-full relative p-3">
            <form role="form" class="relative flex z-50 rounded-full">
              <input
                type="text"
                placeholder="enter your link here"
                class="rounded-full bg-white text-black rounded-r-lg flex-1 px-4 py-4 focus:outline-none"
              ></input>
              <button class="bg-indigo-500 text-white rounded-full rounded-l-lg font-semibold px-4 py-4 hover:bg-indigo-400 focus:bg-indigo-600 focus:outline-none">
                Search
              </button>
            </form>
            <div class="glow glow-1 z-10 bg-pink-400 absolute"></div>
            <div class="glow glow-2 z-20 bg-purple-400 absolute"></div>
            <div class="glow glow-3 z-30 bg-yellow-400 absolute"></div>
            <div class="glow glow-4 z-40 bg-blue-400 absolute"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
