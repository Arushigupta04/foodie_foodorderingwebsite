import React, { useState, useEffect } from "react";
import "./AllCategories.css";
import UpdatePopup from "./UpdatePopup";
import AdminPanel from "../Admin/AdminPanel";
const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/add-new/categories"
        );
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Delete a category by ID
  const deleteCategory = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/add-new/categories/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete category");
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== id)
      );
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Update category in the state
  const updateCategory = (updatedCategory) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category._id === updatedCategory._id ? updatedCategory : category
      )
    );
    setSelectedCategory(null); // Close the popup
  };

  // Handle Update button click
  const handleUpdateClick = (category) => {
    setSelectedCategory(category); // Set the category to be updated
  };

  if (isLoading) {
    return <div className="loadingI">Loading categories...</div>;
  }

  return (
    <div className="gradient-background">
      <div style={{ flex: "0 0 auto", backgroundColor: "#343a40" }}>
        <AdminPanel />
      </div>
      <div className="containerI">
        <h2 className="titleI">All Categories</h2>
        {categories.length === 0 ? (
          <p className="no-categoriesI">No categories available.</p>
        ) : (
          <div className="gridI">
            {categories.map((category) => (
              <div key={category._id} className="cardI">
                <img
                  src={category.category_icon}
                  alt={category.category_title}
                  className="card-imageI"
                />
                <div className="card-contentI">
                  <h3 className="card-titleI">{category.category_title}</h3>
                  <p className="card-descriptionI">
                    {category.category_description}
                  </p>
                  <div className="card-actionsI">
                    <button
                      onClick={() => handleUpdateClick(category)}
                      className="buttonI update-buttonI"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => deleteCategory(category._id)}
                      className="buttonI delete-buttonI"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Show UpdatePopup if a category is selected */}
        {selectedCategory && (
          <UpdatePopup
            category={selectedCategory}
            onClose={() => setSelectedCategory(null)}
            onUpdate={updateCategory}
          />
        )}
      </div>
    </div>
  );
};

export default AllCategories;
