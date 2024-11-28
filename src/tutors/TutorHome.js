import React, { useState } from "react";
import students from "../students/Students";

function TutorHome({ goToHome, goToChatroom, tutorId }) {
    const tutorStudents = students.filter((student) => student.tutorId === tutorId);
    const [freeSlots, setFreeSlots] = useState([]); // Stores the entered free time slots
    const [day, setDay] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const handleAddFreeSlot = () => {
        if (day && startTime && endTime) {
            setFreeSlots([...freeSlots, { day, startTime, endTime }]);
            setDay("");
            setStartTime("");
            setEndTime("");
        } else {
            alert("Please fill out all fields.");
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Welcome, Tutor {tutorId}!</h1> {/* Personalized welcome header */}
            <h2>Your Students</h2>
            <ul style={{ listStyleType: "none", padding: 0 }}>
                {tutorStudents.map((student) => (
                    <li
                        key={student.id}
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            padding: "10px",
                            marginBottom: "10px",
                            textAlign: "left",
                            maxWidth: "400px",
                            margin: "auto",
                        }}
                    >
                        <strong>
                            {student.firstName} {student.lastName}
                        </strong>
                        <ul style={{ paddingLeft: "20px" }}>
                            {student.lessons.map((lesson, index) => (
                                <li key={index}>
                                    {lesson.day} at {lesson.time}
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => goToChatroom(student.id)} // Pass student.id to the goToChatroom function
                            style={{
                                marginTop: "10px",
                                padding: "10px 20px",
                                backgroundColor: "#28a745",
                                color: "#FFF",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Video Chat
                        </button>
                    </li>
                ))}
            </ul>

            {/* Add free time slot area */}
            <h2>Set Your Free Time</h2>
            <div style={{ margin: "20px auto", maxWidth: "400px", textAlign: "left" }}>
                <label>
                    Day:
                    <input
                        type="text"
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                        placeholder="e.g., Monday"
                        style={{
                            display: "block",
                            margin: "10px 0",
                            padding: "8px",
                            width: "100%",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                        }}
                    />
                </label>
                <label>
                    Start Time:
                    <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        style={{
                            display: "block",
                            margin: "10px 0",
                            padding: "8px",
                            width: "100%",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                        }}
                    />
                </label>
                <label>
                    End Time:
                    <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        style={{
                            display: "block",
                            margin: "10px 0",
                            padding: "8px",
                            width: "100%",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                        }}
                    />
                </label>
                <button
                    onClick={handleAddFreeSlot}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#28a745",
                        color: "#FFF",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginTop: "10px",
                    }}
                >
                    Add Free Slot
                </button>
            </div>

            {/* Display free time slots */}
            <h2>Your Free Schedule</h2>
            <ul style={{ listStyleType: "none", padding: 0 }}>
                {freeSlots.length > 0 ? (
                    freeSlots.map((slot, index) => (
                        <li
                            key={index}
                            style={{
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                padding: "10px",
                                marginBottom: "10px",
                                textAlign: "center",
                                maxWidth: "400px",
                                margin: "auto",
                            }}
                        >
                            {slot.day}: {slot.startTime} - {slot.endTime}
                        </li>
                    ))
                ) : (
                    <p style={{ fontStyle: "italic" }}>No free time added yet.</p>
                )}
            </ul>

            <button
                onClick={goToHome}
                style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    backgroundColor: "#007BFF",
                    color: "#FFF",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Go to Home Page
            </button>
        </div>
    );
}

export default TutorHome;
