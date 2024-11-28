import React from "react";

function Chatroom({ goToTutorPage }) {
    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h1>Video Call</h1>
            <p>You are now in a video call with your tutor.</p>
            <button
                onClick={goToTutorPage}
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#007BFF",
                    color: "#FFF",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                End Call and Go Back
            </button>
        </div>
    );
}

export default Chatroom;
