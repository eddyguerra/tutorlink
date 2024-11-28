import React from "react";
import tutors from "./tutors/Tutors";
import TutorCard from "./tutors/TutorCard";

function Home({ user }) {
    return (
        <div>
            <h1>Welcome, {user.fullName || "User"}!</h1>
            <p>You are logged in with email: {user.email}</p>
            <h2>Available Tutors</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {tutors.map((tutor, index) => (
                    <TutorCard key={index} tutor={tutor} />
                ))}
            </div>
        </div>
    );
}

export default Home;
