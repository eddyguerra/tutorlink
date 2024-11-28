import React, { useState } from "react";
import ReviewCard from "./ReviewCard";
import reviews from "./Reviews";

function TutorPage({ tutor, goToHome }) {
    const [tutorReviews, setTutorReviews] = useState(reviews.filter((review) => review.tutorId === tutor.id));
    const [newReview, setNewReview] = useState({ userName: "", review: "" });

    const handleReviewSubmit = () => {
        if (!newReview.userName || !newReview.review) {
            alert("Please fill out both fields before submitting.");
            return;
        }

        const updatedReview = {
            tutorId: tutor.id,
            userName: newReview.userName,
            review: newReview.review,
        };

        // Update reviews locally
        setTutorReviews([...tutorReviews, updatedReview]);

        // Clear the form
        setNewReview({ userName: "", review: "" });
    };

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

            <h3>Add a Review</h3>
            <div style={{ marginTop: "20px" }}>
                <input
                    type="text"
                    placeholder="Your Name"
                    value={newReview.userName}
                    onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
                    style={{
                        padding: "8px",
                        marginBottom: "10px",
                        width: "100%",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                    }}
                />
                <textarea
                    placeholder="Your Review"
                    value={newReview.review}
                    onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
                    style={{
                        padding: "8px",
                        marginBottom: "10px",
                        width: "100%",
                        height: "80px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                    }}
                />
                <button
                    onClick={handleReviewSubmit}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#007BFF",
                        color: "#FFF",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Submit Review
                </button>
            </div>
        </div>
    );
}

export default TutorPage;
