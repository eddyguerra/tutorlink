import React from "react";

function ReviewCard({ review }) {
    return (
        <div
            style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "10px",
                maxWidth: "400px",
            }}
        >
            <h4 style={{ marginBottom: "8px" }}>{review.userName}</h4>
            <p style={{ margin: 0, fontStyle: "italic" }}>"{review.review}"</p>
        </div>
    );
}

export default ReviewCard;
