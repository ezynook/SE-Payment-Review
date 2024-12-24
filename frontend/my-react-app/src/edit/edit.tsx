import React, { useEffect, useState } from "react";
import "./edit.css";
import { useNavigate, useParams } from "react-router-dom";

interface Review {
  driverId: string;
  passengerId: string;
  reviewId: string;
  comment: string;
  rating: number;
}

const Edit: React.FC = () => {
  const navigate = useNavigate();
  const { reviewId } = useParams<{ reviewId: string }>(); // รับ reviewId จาก URL

  const [review, setReview] = useState<Review>({
    driverId: "",
    passengerId: "",
    reviewId: "",
    comment: "",
    rating: 0,
  });

  const [errors, setErrors] = useState({
    driverId: "",
    passengerId: "",
    comment: "",
    rating: "",
  });

  // ดึงข้อมูลรีวิวที่ต้องการแก้ไข
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8001/get/reviews/id?id=${localStorage.getItem("review_id")}`);
        if (!response.ok) {
          throw new Error("Failed to fetch review data.");
        }
        const {data:[result]} = await response.json();
        console.log(result);
        
        setReview({
          driverId: result.driver_id,
          passengerId: result.passenger_id,
          reviewId: result.review_id.toString(),
          comment: result.comment,
          rating: result.rating,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchReview();
  }, [reviewId]);

  const handleSave = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8001/edit/reviews", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          review_id: localStorage.getItem("review_id"),
          rating: review.rating,
          comment: review.comment,
          booking_id: localStorage.getItem("book_id"),
          passenger_id: review.passengerId,
          driver_id: review.driverId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save review.");
      }

      alert("Review updated successfully.");
      navigate("/review/history");
    } catch (error) {
      console.error(error);
      alert("Failed to update review.");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };
  const handleChange = (field: keyof Review, value: string | number) => {
    setReview((prev) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };
  const validateField = (field: keyof Review, value: string | number) => {
    let errorMessage = "";

    if (field === "driverId" || field === "passengerId") {
      if (!/^\d+$/.test(value as string)) {
        errorMessage = "Must be numeric only.";
      }
    }

    if (field === "rating") {
      if (value < 1 || value > 5) {
        errorMessage = "Rating must be between 1 and 5.";
      }
    }

    setErrors((prev) => ({ ...prev, [field]: errorMessage }));
  };


  return (
    <div className="edit-container">
      <div className="edit-card">
        <h2 className="edit-title">Edit Review</h2>
        <div className="edit-form">
          <div className="form-row">
            <label>Driver ID</label>
            <input
              type="text"
              value={review.driverId}
              onChange={(e) => handleChange("driverId", e.target.value)}
            />
            {errors.driverId && <div className="error-message">{errors.driverId}</div>}
          </div>
          <div className="form-row">
            <label>Passenger ID</label>
            <input
              type="text"
              value={review.passengerId}
              onChange={(e) => handleChange("passengerId", e.target.value)}
            />
            {errors.passengerId && <div className="error-message">{errors.passengerId}</div>}
          </div>
          <div className="form-row">
            <label>Review ID</label>
            <input type="text" value={review.reviewId} readOnly />
          </div>
          <div className="form-row">
            <label>Comment</label>
            <input
              type="text"
              value={review.comment}
              onChange={(e) => handleChange("comment", e.target.value)}
            />
            {errors.comment && <div className="error-message">{errors.comment}</div>}
          </div>
          <div className="form-row">
            <label>Features</label>
            <input
              type="text"
              placeholder="Comma-separated features"
              value={review.features}
              onChange={(e) => handleChange("features", e.target.value)}
            />
            {errors.features && <div className="error-message">{errors.features}</div>}
          </div>
          <div className="form-row">
            <label>Rating</label>
            <input
              type="number"
              min={1}
              max={5}
              value={review.rating}
              onChange={(e) => handleChange("rating", parseInt(e.target.value))}
            />
            {errors.rating && <div className="error-message">{errors.rating}</div>}
          </div>
        </div>
        <div className="edit-actions">
          <button className="back-btn" onClick={handleBack}>
            Go Back
          </button>
          <button className="save-btx" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
