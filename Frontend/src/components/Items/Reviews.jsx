import React, { useState, useEffect } from "react";
import "./Reviews.css";
import AdminPanel from "../Admin/AdminPanel";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("https://foodie-foodorderingwebsite.onrender.com/api/review");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError("Failed to fetch reviews. Please check the API endpoint.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="gradient-background" style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div style={{ flex: "0 0 auto", backgroundColor: "#343a40" }}>
        <AdminPanel />
      </div>

      {/* Main Content */}
      <div style={{ flex: "1", padding: "30px 100px", overflowY: "auto" }}>
        <h1 className="titleR">Reviews</h1>
        {loading ? (
          <p className="loadingR">Loading reviews...</p>
        ) : error ? (
          <p className="errorR">{error}</p>
        ) : reviews.length > 0 ? (
          <div className="gridR">
            {reviews.map((review, index) => (
              <div className="cardR" key={index}>
                <div className="iconWrapperR">“</div>
                <div className="ratingR">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`starR ${i < review.rating ? "filledR" : ""}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="textR">{review.reviewText}</p>
                <p className="authorR">{review.email}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="errorR">No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
