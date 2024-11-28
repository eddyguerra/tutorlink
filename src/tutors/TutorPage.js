import React, { useState } from "react";
import ReviewCard from "./ReviewCard";
import reviews from "./Reviews";

function TutorPage({ tutor, goToHome, goToChatroom }) {
    const [tutorReviews, setTutorReviews] = useState(reviews.filter((review) => review.tutorId === tutor.id));
    const [newReview, setNewReview] = useState({ userName: "", review: "" });

    const [selectedDate, setSelectedDate] = useState(""); // For booking date
    const [selectedTime, setSelectedTime] = useState(""); // For booking time
    const [lessonsPerWeek, setLessonsPerWeek] = useState(1); // Default weekly lessons
    const [isBooked, setIsBooked] = useState(false); // Booking confirmation
    const [showPopup, setShowPopup] = useState(false); // Payment confirmation popup

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

        setTutorReviews([...tutorReviews, updatedReview]);
        setNewReview({ userName: "", review: "" });
    };

    const handleBooking = () => {
        if (!selectedDate || !selectedTime) {
            alert("Please select both a date and time.");
            return;
        }
        setIsBooked(true);
    };

    const handlePayment = () => {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000); // Hide the popup after 3 seconds
    };

    const totalWeeklyCost = tutor.price * lessonsPerWeek;
    const totalMonthlyCost = totalWeeklyCost * 4; // Approximate weeks per month
    const totalYearlyCost = totalWeeklyCost * 52;

    return (
        <div style={{padding: "20px", maxWidth: "600px", margin: "auto"}}>
            <button onClick={goToHome} style={{marginBottom: "10px"}}>
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
            <h2 style={{textAlign: "center"}}>
                {tutor.firstName} {tutor.lastName}
            </h2>
            <p style={{textAlign: "center", fontWeight: "bold"}}>🌍 Country: {tutor.country}</p>
            <p style={{textAlign: "center", fontWeight: "bold"}}>⭐ Rating: {tutor.rating}</p>
            <p style={{marginTop: "10px", fontSize: "16px", lineHeight: "1.5"}}>📝 {tutor.summary}</p>

            <h3>Book a Lesson</h3>
            <div style={{marginTop: "20px"}}>
                <label>
                    Select Date:
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        style={{
                            display: "block",
                            padding: "8px",
                            marginTop: "10px",
                            marginBottom: "10px",
                            width: "100%",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                        }}
                    />
                </label>
                <label>
                    Select Time:
                    <input
                        type="time"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        style={{
                            display: "block",
                            padding: "8px",
                            marginTop: "10px",
                            marginBottom: "10px",
                            width: "100%",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                        }}
                    />
                </label>
                <label>
                    Lessons Per Week:
                    <input
                        type="number"
                        min="0"
                        max="5"
                        value={lessonsPerWeek}
                        onChange={(e) => setLessonsPerWeek(Number(e.target.value))}
                        style={{
                            display: "block",
                            padding: "8px",
                            marginTop: "10px",
                            marginBottom: "10px",
                            width: "100%",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                        }}
                    />
                </label>
                <button
                    onClick={handleBooking}
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
                    Book Trial
                </button>
            </div>

            {isBooked && (
                <div style={{marginTop: "20px"}}>
                    <h4>Booking Confirmed!</h4>
                    <p>
                        You have a lesson scheduled on <strong>{selectedDate}</strong> at{" "}
                        <strong>{selectedTime}</strong>.
                    </p>
                    <p>Total Weekly Cost: ${totalWeeklyCost}</p>
                    <p>Total Monthly Cost: ${totalMonthlyCost}</p>
                    <p>Total Yearly Cost: ${totalYearlyCost}</p>
                    <button
                        onClick={handlePayment}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#007BFF",
                            color: "#FFF",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginTop: "10px",
                        }}
                    >
                        Pay Now
                    </button>
                </div>
            )}

            <button
                onClick={goToChatroom}
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#6c757d",
                    color: "#FFF",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginTop: "20px",
                }}
            >
                Join Video Call
            </button>

            <h3>Reviews</h3>
            <div>
                {tutorReviews.length > 0 ? (
                    tutorReviews.map((review, index) => <ReviewCard key={index} review={review}/>)
                ) : (
                    <p style={{fontStyle: "italic"}}>No reviews yet. Be the first to leave one!</p>
                )}
            </div>

            <h3>Add a Review</h3>
            <div style={{marginTop: "20px"}}>
                <input
                    type="text"
                    placeholder="Your Name"
                    value={newReview.userName}
                    onChange={(e) => setNewReview({...newReview, userName: e.target.value})}
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
                    onChange={(e) => setNewReview({...newReview, review: e.target.value})}
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
