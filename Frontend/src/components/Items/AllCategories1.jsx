import React, { useEffect, useState } from "react";
import "./AllCategories1.css"; // Import CSS
import EditPopup from "./EditPopup"; // Ensure EditPopup exists and is correctly imported
import AdminPanel from "../Admin/AdminPanel";

function AllCategories1() {
  const [items, setItems] = useState([]); // State for all items
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [deletingItemId, setDeletingItemId] = useState(null); // Tracks the item being deleted
  const [editingItem, setEditingItem] = useState(null); // Tracks the item being edited

  // Fetch items from the backend API
  const fetchItems = async () => {
    try {
      const response = await fetch("https://foodie-foodorderingwebsite.onrender.com/api/add-new/items");
      if (!response.ok) throw new Error("Failed to fetch data.");
      const data = await response.json();
      setItems(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Handle deleting an item
  const deleteItem = async (id) => {
    setDeletingItemId(id); // Show "Deleting item..." message
    setTimeout(async () => {
      try {
        const response = await fetch(
          `https://foodie-foodorderingwebsite.onrender.com/api/add-new/items/${id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) throw new Error("Failed to delete item.");
        setItems(items.filter((item) => item._id !== id)); // Remove the deleted item
      } catch (err) {
        console.error(err.message); // Log any error during deletion
      } finally {
        setDeletingItemId(null); // Clear the deletion message
      }
    }, 2000); // Display the message for 2 seconds
  };

  // Fetch items when the component loads
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="gradient-background">
      <div style={{ flex: "0 0 auto", backgroundColor: "#343a40" }}>
        <AdminPanel />
      </div>
      <div className="container1">
        <h1 className="heading1">Explore Delicious Food Items</h1>

        {loading && <p className="loading1">Loading items...</p>}
        {error && <p className="error1">{error}</p>}

        {/* Render the grid of items */}
        <div className="flex-container1">
          {items.map((item) => (
            <div key={item._id} className="card1">
              <div className="image-wrapper1">
                <img
                  src={item.item_src}
                  alt={item.item_title}
                  className="image1"
                />
              </div>
              <div className="details1">
                <h2 className="item-title1">{item.item_title}</h2>
                <p className="item-detail1">
                  <strong>Type:</strong> {item.item_type}
                </p>
                <p className="item-detail1">
                  <strong>Price:</strong> ₹{item.item_price}
                </p>
                <p className="item-detail1">
                  <strong>Offer:</strong> {item.item_offer}
                </p>

                {/* Show delete message for the item being deleted */}
                {deletingItemId === item._id && (
                  <div className="delete-message">Deleting item...</div>
                )}

                <div className="buttons1">
                  <button
                    className="delete-button1"
                    onClick={() => deleteItem(item._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="edit-button1"
                    onClick={() => setEditingItem(item)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Render the EditPopup if editing */}
        {editingItem && (
          <EditPopup
            item={editingItem}
            onCancel={() => setEditingItem(null)}
            onSave={(updatedItem) => {
              // Ensure proper syntax with block curly braces
              setItems(
                items.map((item) =>
                  item._id === updatedItem._id ? updatedItem : item
                )
              );
              setEditingItem(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default AllCategories1;
