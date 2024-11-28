import React, { useState } from "react";

function TutorLogin({ goToTutorHome }) {
    const [tutorId, setTutorId] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if (!tutorId || !password) {
            alert("Please enter both Tutor ID and Password.");
            return;
        }
        goToTutorHome(Number(tutorId)); // Pass tutorId to App.js
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>Tutor Login</h2>
            <input
                type="text"
                placeholder="Enter Tutor ID"
                value={tutorId}
                onChange={(e) => setTutorId(e.target.value)}
                style={{ display: "block", margin: "10px auto", padding: "10px", width: "200px" }}
            />
            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ display: "block", margin: "10px auto", padding: "10px", width: "200px" }}
            />
            <button
                onClick={handleLogin}
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#007BFF",
                    color: "#FFF",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Log In
            </button>
        </div>
    );
}

export default TutorLogin;
