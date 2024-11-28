import React, { useState } from "react";
import AuthForm from "./AuthForm";
import Home from "./Home";
import TutorPage from "./tutors/TutorPage"; // Import TutorPage
import Chatroom from "./Chatroom"; // Import Chatroom
import tutors from "./tutors/Tutors"; // Import tutors data

function App() {
    const [user, setUser] = useState(null); // Tracks the logged-in user
    const [currentTutor, setCurrentTutor] = useState(null); // Tracks the selected tutor
    const [view, setView] = useState("home"); // Tracks the current view: "home", "tutorPage", or "chatroom"

    // Handles authentication and sets the logged-in user
    const handleAuth = (userData) => {
        setUser(userData);
    };

    // Navigate to the tutor detail page
    const goToTutorPage = (tutor) => {
        setCurrentTutor(tutor);
        setView("tutorPage");
    };

    // Navigate to the chatroom page
    const goToChatroom = () => {
        setView("chatroom");
    };

    // Navigate back to the home page
    const goToHome = () => {
        setView("home");
    };

    // Navigate back to the tutor page from the chatroom
    const backToTutorPage = () => {
        setView("tutorPage");
    };

    return (
        <div>
            {user ? (
                view === "home" ? (
                    // Render the Home component if the current view is "home"
                    <Home user={user} tutors={tutors} goToTutorPage={goToTutorPage} />
                ) : view === "tutorPage" ? (
                    // Render the TutorPage if the current view is "tutorPage"
                    <TutorPage tutor={currentTutor} goToHome={goToHome} goToChatroom={goToChatroom} />
                ) : (
                    // Render the Chatroom if the current view is "chatroom"
                    <Chatroom goToTutorPage={backToTutorPage} />
                )
            ) : (
                // Render the AuthForm if the user is not logged in
                <AuthForm onAuth={handleAuth} />
            )}
        </div>
    );
}

export default App;
