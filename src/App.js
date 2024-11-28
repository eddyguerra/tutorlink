import React, { useState } from "react";
import AuthForm from "./AuthForm";
import Home from "./Home";
import TutorPage from "./tutors/TutorPage"; // Import TutorPage
import Chatroom from "./Chatroom"; // Import Chatroom
import tutors from "./tutors/Tutors"; // Import tutors data
import students from "./students/Students"; // Import students data
import TutorLogin from "./tutors/TutorLogin"; // Import TutorLogin
import TutorHome from "./tutors/TutorHome"; // Import TutorHome
import TutorChatRoom from "./tutors/TutorChatRoom";

function App() {
    const [user, setUser] = useState(null); // Tracks the logged-in user
    const [currentTutor, setCurrentTutor] = useState(null); // Tracks the selected tutor
    const [currentStudent, setCurrentStudent] = useState(null); // Tracks the selected student for video chat
    const [view, setView] = useState("home"); // Tracks the current view: "home", "tutorPage", "chatroom", "tutorLogin", or "tutorHome"

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

    // Navigate to the tutor chatroom page
    const goToTutorChatRoom = (studentId) => {
        setCurrentStudent(studentId);
        setView("tutorChatRoom");
    };

    // Navigate to the tutor login page
    const goToTutorLogin = () => {
        setView("tutorLogin");
    };

    // Navigate to the tutor home page
    const goToTutorHome = (tutorId) => {
        const tutor = tutors.find((t) => t.id === tutorId); // Find the tutor by ID
        if (tutor) {
            setCurrentTutor(tutor);
            setView("tutorHome");
        } else {
            alert("Invalid Tutor ID.");
        }
    };

    // Navigate back to the home page
    const goToHome = () => {
        setView("home");
    };

    // Navigate back to the tutor page from the chatroom
    const backToTutorPage = () => {
        setView("tutorPage");
    };

    // Navigate back to the tutor home page from the tutor chatroom
    const backToTutorHome = () => {
        setView("tutorHome");
    };

    return (
        <div>
            {user ? (
                view === "home" ? (
                    // Render the Home component if the current view is "home"
                    <Home
                        user={user}
                        tutors={tutors}
                        goToTutorPage={goToTutorPage}
                        goToTutorLogin={goToTutorLogin} // Pass navigation to tutor login
                    />
                ) : view === "tutorPage" ? (
                    // Render the TutorPage if the current view is "tutorPage"
                    <TutorPage tutor={currentTutor} goToHome={goToHome} goToChatroom={goToChatroom} />
                ) : view === "chatroom" ? (
                    // Render the Chatroom if the current view is "chatroom"
                    <Chatroom goToTutorPage={backToTutorPage} />
                ) : view === "tutorLogin" ? (
                    // Render the TutorLogin if the current view is "tutorLogin"
                    <TutorLogin goToTutorHome={goToTutorHome} />
                ) : view === "tutorChatRoom" ? (
                    // Render the TutorChatRoom if the current view is "tutorChatRoom"
                    <TutorChatRoom
                        studentId={currentStudent}
                        goToTutorHome={backToTutorHome}
                    />
                ) : (
                    // Render the TutorHome if the current view is "tutorHome"
                    <TutorHome
                        tutorId={currentTutor?.id}
                        students={students}
                        goToHome={goToHome}
                        goToChatroom={goToTutorChatRoom} // Pass navigation to tutor chatroom
                    />
                )
            ) : (
                // Render the AuthForm if the user is not logged in
                <AuthForm onAuth={handleAuth} />
            )}
        </div>
    );
}

export default App;
