import React from "react";

function TutorCard({ tutor }) {
    return (
        <div
            style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "20px",
                maxWidth: "300px",
            }}
        >
            <img
                src={tutor.avatar}
                alt={`${tutor.firstName} ${tutor.lastName}`}
                style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    display: "block",
                    margin: "0 auto 10px",
                }}
            />
            <h3 style={{ textAlign: "center" }}>
                {tutor.firstName} {tutor.lastName}
            </h3>
            <p>🌍 Country: {tutor.country}</p>
            <p>🗣 Language: {tutor.language}</p>
            <p>💵 Price: ${tutor.price}/hour</p>
            <p>📝 Summary: {tutor.summary}</p>
            <p>⭐ Rating: {tutor.rating} / 5</p>
        </div>
    );
}

export default TutorCard;
