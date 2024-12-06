// import React, { useState, useEffect } from "react";
// import "./Reviews.css";

// const Reviews = () => {
//   const [reviews, setReviews] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/review");
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setReviews(data);
//       } catch (err) {
//         setError("Failed to fetch reviews. Please check the API endpoint.");
//         console.error(err);
//       }
//     };

//     fetchReviews();
//   }, []);

//   return (
//     <div className="containerR">
//       <h1 className="titleR">Reviews</h1>
//       {error && <p className="errorR">{error}</p>}
//       <div className="gridR">
//         {reviews.length > 0 ? (
//           reviews.map((review, index) => (
//             <div className="cardR" key={index}>
//               <div className="iconWrapperR">“</div>
//               <div className="ratingR">
//                 {[...Array(5)].map((_, i) => (
//                   <span
//                     key={i}
//                     className={`starR ${i < review.rating ? "filledR" : ""}`}
//                   >
//                     ★
//                   </span>
//                 ))}
//               </div>
//               <p className="textR">{review.reviewText}</p>
//               <p className="authorR">{review.email}</p>
//             </div>
//           ))
//         ) : (
//           <p className="errorR">No reviews available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Reviews;
import React, { useState, useEffect } from "react";
import "./Reviews.css";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/review");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError("Failed to fetch reviews. Please check the API endpoint.");
        console.error(err);
      }
    };

    fetchReviews();
  }, []);

  return (
  <div className="gradient-background">
    <div className="containerR">
      <h1 className="titleR">Reviews</h1>
      {error && <p className="errorR">{error}</p>}
      <div className="gridR">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
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
          ))
        ) : (
          <p className="errorR">No reviews available.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default Reviews;