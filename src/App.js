import React, { useState } from "react";
import AuthForm from "./AuthForm";
import Home from "./Home";
import tutors from "./tutors/Tutors";
import tutorCard from "./tutors/TutorCard";


function App() {
    const [user, setUser] = useState(null);

    const handleAuth = (userData) => {
        setUser(userData);
    };

    return (
        <div>
            {user ? (
                <Home user={user} />
            ) : (
                <AuthForm onAuth={handleAuth} />
            )}
        </div>
    );
}

export default App;