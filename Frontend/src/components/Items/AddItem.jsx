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
  const [titleError, setTitleError] = useState(""); // Error state for title
  const [imageError, setImageError] = useState("");

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

  const isValidUrl = (url) => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-zA-Z0-9$_.+!*(),;?&=-]|%[0-9a-fA-F]{2})+@)?' + // user
      '((\[[0-9a-fA-F:.]+\])|' + // IPv6
      '(([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}))' + // domain
      '(:[0-9]{2,5})?)' + // port
      '(\\/([a-zA-Z0-9$_.+!*(),;?&=-]|%[0-9a-fA-F]{2})*)*$', // path
      'i'
    );

    return urlPattern.test(url);
  };

  // Check if the first 4 characters of title are alphabets
  const validateTitle = (value) => {
    // Title should be less than or equal to 20 characters
    if (value.length > 20) {
      setTitleError("Title must be 20 characters or less.");
      return false;
    }

    // Check if first 4 characters are alphabets
    const firstFourChars = value.substring(0, 4);
    const regex = /^[A-Za-z]{4}/;
    if (!regex.test(firstFourChars)) {
      setTitleError("First 4 characters must be alphabets.");
      return false;
    }

    setTitleError(""); // Clear error if title is valid
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !price || !offer || !image || !selectedCategory) {
     toast.error("All fields must be filled.");
      return;
    }
    if (error || imageError || titleError) {
      toast.error("Please fix the errors before submitting.");
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

  const handleImageChange = (e) => {
    const value = e.target.value;
    if (isValidUrl(value)) {
      setImage(value);
      setImageError("");
    } else {
      setImageError("Please provide a valid image URL.");
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
            onChange={(e) => {
              setTitle(e.target.value);
              validateTitle(e.target.value); // Validate the title on change
            }}
            maxLength={20}
            required
            className="form-inputAI"
          />
          {titleError && <p className="error-messageAI">{titleError}</p>}
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
            onChange={handleImageChange}
            required
            className="form-inputAI"
          />
          {imageError && <p className="error-messageAI">{imageError}</p>}
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
