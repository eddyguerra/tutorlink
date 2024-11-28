import React, { useState } from "react";
import AuthForm from "./AuthForm";
import Home from "./Home";
import TutorPage from "./tutors/TutorPage"; // Import TutorPage
import tutors from "./tutors/Tutors"; // Import tutors data

function App() {
    const [user, setUser] = useState(null); // Tracks the logged-in user
    const [currentTutor, setCurrentTutor] = useState(null); // Tracks the selected tutor
    const [view, setView] = useState("home"); // Tracks the current view: "home" or "tutorPage"

    // Handles authentication and sets the logged-in user
    const handleAuth = (userData) => {
        setUser(userData);
    };

    // Navigate to the tutor detail page
    const goToTutorPage = (tutor) => {
        setCurrentTutor(tutor);
        setView("tutorPage");
    };

    // Navigate back to the home page
    const goToHome = () => {
        setView("home");
    };

    return (
        <div>
            {user ? (
                view === "home" ? (
                    // Render the Home component if the current view is "home"
                    <Home user={user} tutors={tutors} goToTutorPage={goToTutorPage} />
                ) : (
                    // Render the TutorPage if the current view is "tutorPage"
                    <TutorPage tutor={currentTutor} goToHome={goToHome} />
                )
            ) : (
                // Render the AuthForm if the user is not logged in
                <AuthForm onAuth={handleAuth} />
            )}
        </div>
    );
}

export default App;
