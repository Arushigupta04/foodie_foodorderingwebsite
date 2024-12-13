import React, { useState, useEffect } from "react";
import "./UpdatePopup.css"; // Add your CSS styles for the popup

const UpdatePopup = ({ category, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    category_title: category.category_title,
    category_description: category.category_description,
    category_icon: category.category_icon,
  });

  const [errors, setErrors] = useState({
    category_title: "",
    category_description: "",
  });

  useEffect(() => {
    // Initialize form data when category prop changes
    setFormData({
      category_title: category.category_title,
      category_description: category.category_description,
      category_icon: category.category_icon,
    });
  }, [category]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate fields before submitting
  const validateForm = () => {
    let titleError = "";
    let descriptionError = "";

    // Validate category title (max 30 characters)
    if (formData.category_title.length > 30) {
      titleError = "Category name cannot exceed 30 characters.";
    }

    // Validate category description (max 80 characters)
    if (formData.category_description.length > 150) {
      descriptionError = "Category description cannot exceed 80 characters.";
    }

    setErrors({
      category_title: titleError,
      category_description: descriptionError,
    });

    // Return false if there are errors
    return !titleError && !descriptionError;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Prevent submission if validation fails
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/add-new/categories/${category._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) throw new Error("Failed to update category.");
      const updatedCategory = await response.json();
      onUpdate(updatedCategory); // Pass updated category to parent
      onClose(); // Close the popup after update
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h2>Update Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="category_title">Category Name</label>
            <input
              type="text"
              name="category_title"
              value={formData.category_title}
              onChange={handleChange}
              required
            />
            {errors.category_title && (
              <div className="error-message">{errors.category_title}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="category_description">Category Description</label>
            <textarea
              name="category_description"
              value={formData.category_description}
              onChange={handleChange}
              required
            />
            {errors.category_description && (
              <div className="error-message">{errors.category_description}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="category_icon">Category Image URL</label>
            <input
              type="text"
              name="category_icon"
              value={formData.category_icon}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="button update-button">
              Update
            </button>
            <button
              type="button"
              className="button cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePopup;
