import React, { useState, useEffect } from "react";
import axios from "axios";

import NavBar from "../components/NavBar";
import TimerList from "../components/TimerList";
import TimerNew from "../components/TimerNew";

function Timer() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.post("/api/whoami");
        setUser(response.data);
      } catch (err) {
        console.error(err.response);
      }
      setIsLoading(false);
    };
    getUser();
  }, [setUser, setIsLoading]);

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <NavBar />

      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 mb-3 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              Timer
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="text-2xl text-gray-900 text-center font-medium uppercase text-yellow-400 mb-3">
                Tasks List
              </h2>
              <TimerList reload={reload} />
            </div>
            {user.rights === "admin" ? (
              <div className="mb-6">
                <h2 className="text-2xl text-gray-900 text-center font-medium uppercase text-yellow-400 mb-3">
                  Add a new task
                </h2>
                <TimerNew setReload={setReload} />
              </div>
            ) : (
              <></>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default Timer;
