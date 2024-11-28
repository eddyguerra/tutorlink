import React from "react";

function TutorPage({ tutor }) {
    if (!tutor) {
        return <p>No tutor selected.</p>;
    }

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", border: "1px solid #ccc", borderRadius: "8px" }}>
            <img
                src={tutor.avatar}
                alt={`${tutor.firstName} ${tutor.lastName}`}
                style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    display: "block",
                    margin: "0 auto 20px",
                }}
            />
            <h2 style={{ textAlign: "center" }}>
                {tutor.firstName} {tutor.lastName}
            </h2>
            <p style={{ textAlign: "center", fontWeight: "bold" }}>🌍 Country: {tutor.country}</p>
            <p style={{ marginTop: "10px", fontSize: "16px", lineHeight: "1.5" }}>📝 {tutor.summary}</p>
            <h3 style={{ marginTop: "20px" }}>Reviews</h3>
            <p style={{ fontStyle: "italic" }}>No reviews yet. Be the first to leave one!</p>
        </div>
    );
}

export default TutorPage;
