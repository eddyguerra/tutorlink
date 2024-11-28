import React from "react";
import ReviewCard from "./ReviewCard";
import reviews from "./Reviews";

function TutorPage({ tutor, goToHome }) {
    // Filter reviews for the current tutor
    const tutorReviews = reviews.filter((review) => review.tutorId === tutor.id);

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <button onClick={goToHome} style={{ marginBottom: "10px" }}>
                Back to Home
            </button>
            <img
                src={tutor.avatar}
                alt={`${tutor.firstName} ${tutor.lastName}`}
                style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    display: "block",
                    margin: "0 auto",
                }}
            />
            <h2 style={{ textAlign: "center" }}>
                {tutor.firstName} {tutor.lastName}
            </h2>
            <p style={{ textAlign: "center", fontWeight: "bold" }}>🌍 Country: {tutor.country}</p>
            <p style={{ marginTop: "10px", fontSize: "16px", lineHeight: "1.5" }}>📝 {tutor.summary}</p>
            <h3>Reviews</h3>
            <div>
                {tutorReviews.length > 0 ? (
                    tutorReviews.map((review, index) => <ReviewCard key={index} review={review} />)
                ) : (
                    <p style={{ fontStyle: "italic" }}>No reviews yet. Be the first to leave one!</p>
                )}
            </div>
        </div>
    );
}

export default TutorPage;
