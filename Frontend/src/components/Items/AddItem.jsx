import React, { useState } from "react";
import { toast } from "react-toastify";
import "./AddItem.css";
import AdminPanel from "../Admin/AdminPanel";

const AddItemForm = ({ categories, onAddItem }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("veg");
  const [price, setPrice] = useState("");
  const [offer, setOffer] = useState("");
  const [image, setImage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState("");
  const [priceError, setPriceError] = useState("");
const [offerError, setOfferError] = useState("");

const handlePriceChange = (e) => {
    const value = e.target.value;
    if (value === "" || (/^[0-9]*$/.test(value) && value >= 1 && value <= 1000)) {
      setPrice(value);
    } else {
      setPriceError("Price must be a numeric value between 1 and 1000.");
    }
  };
  
  // Triggered when the user moves out of the field (onBlur)
  const handlePriceBlur = () => {
    if (price && /^[0-9]*$/.test(price) && price >= 1 && price <= 1000) {
      setPriceError(""); // Clear error when valid value is detected
    }
  };
  
  const handleOfferChange = (e) => {
    const value = e.target.value;
    if (value === "" || (/^\d+$/.test(value) && value >= 0 && value <= 100)) {
      setOffer(value);
    } else {
      setOfferError("Offer must be a numeric value between 0 and 100.");
    }
  };
  
  // Triggered when the user moves out of the field (onBlur)
  const handleOfferBlur = () => {
    if (offer && /^\d+$/.test(offer) && offer >= 0 && offer <= 100) {
      setOfferError(""); // Clear error when valid value is detected
    }
  };
  
  


  const handleSubmit = (e) => {
    e.preventDefault();
    if (error) {
      alert("Please fix the errors before submitting.");
      return;
    }

    const newItem = {
      item_title: title,
      item_type: type,
      item_price: price,
      item_offer: offer,
      item_src: image,
    };

    if (selectedCategory) {
      onAddItem(selectedCategory, newItem);
      toast.success("Item added successfully! 🎉", {
        position: "top-right",
      });

      // Clear form fields
      setTitle("");
      setType("veg");
      setPrice("");
      setOffer("");
      setImage("");
      setSelectedCategory("");
    } else {
      toast.error("Please select a category.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className="nestt">
      <div
        style={{ flex: "0 0 auto", backgroundColor: "#343a40" }}
      >
        <AdminPanel />
      </div>
      
      <form onSubmit={handleSubmit} className="form-containerAI add-itemAI">
        <div className="form-groupAI">
          <label htmlFor="title" className="form-labelAI">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-inputAI"
          />
        </div>
        <div className="form-groupAI">
          <label htmlFor="type" className="form-labelAI">
            Type:
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="form-selectAI"
          >
            <option value="veg">Veg</option>
            <option value="nonveg">Non-Veg</option>
          </select>
        </div>
        <div className="form-groupAI">
  <label htmlFor="price" className="form-labelAI">
    Price:
  </label>
  <input
    type="text"
    id="price"
    value={price}
    onChange={handlePriceChange}
    onBlur={handlePriceBlur}
    required
    className="form-inputAI"
  />
  {priceError && <p className="error-messageAI">{priceError}</p>}
</div>

<div className="form-groupAI">
  <label htmlFor="offer" className="form-labelAI">
    Offer:
  </label>
  <input
    type="text"
    id="offer"
    value={offer}
    onChange={handleOfferChange}
    onBlur={handleOfferBlur}
    className="form-inputAI"
  />
  {offerError && <p className="error-messageAI">{offerError}</p>}
</div>

        <div className="form-groupAI">
          <label htmlFor="image" className="form-labelAI">
            Image:
          </label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            className="form-inputAI"
          />
        </div>
        <div className="form-groupAI">
          <label htmlFor="category" className="form-labelAI">
            Select Category:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
            className="form-selectAI"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.category_title}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn-submitAI">
          Add Item
        </button>
      </form>
    </div>
    
  );
};

export default AddItemForm;
