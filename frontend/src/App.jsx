import React, { useEffect, useState } from "react";
import axios from "axios";
import NotesList from "./NotesList";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  const [notes, setNotes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) return;

    const res = await axios.get("http://localhost:8080/notes", {
      headers: { "Authorization": token },
    })
    console.log(res);
    setNotes(res.data);
    console.log(res);
    console.log("response", res.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchNotes();
    }
  }, []);

  console.log(notes);

  // This function handles what happens after login success:
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    fetchNotes(); // fetch notes immediately after login
  };

  return (
    <div>
      <h1>Notes App</h1>

      {isLoggedIn ? (
        <>
          <h2>Your Notes</h2>
          <NotesList notes={notes} />
          <button
            onClick={() => {
              localStorage.removeItem("token");
              setIsLoggedIn(false);
              setShowLogin(true);
              setNotes([]); // clear notes on logout
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          {showLogin ? (
            <>
              <Login onLoginSuccess={handleLoginSuccess} />
              <p>
                Don't have an account?{" "}
                <button onClick={() => setShowLogin(false)}>
                  Register here
                </button>
              </p>
            </>
          ) : (
            <>
              <Register onRegisterSuccess={() => setShowLogin(true)} />
              <p>
                Already have an account?{" "}
                <button onClick={() => setShowLogin(true)}>Login here</button>
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
