import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style1.css';

const AddCategoryForm = ({ onAddCategory }) => {
  const [categoryTitle, setCategoryTitle] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categoryIcon, setCategoryIcon] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input fields
    if (!categoryTitle || !categoryDescription || !categoryIcon) {
      toast.error('Please fill in all fields');
      return;
    }

    // Validation for alphabetic start
    if (!/^[a-zA-Z]{5}/.test(categoryTitle)) {
      toast.error('Category title must start with at least 5 alphabetic characters');
      return;
    }

    // Character count validation
    if (categoryTitle.length > 20) {
      toast.error('Category title must not exceed 20 characters');
      return;
    }

    if (categoryDescription.length > 100) {
      toast.error('Category description must not exceed 100 characters');
      return;
    }

    // Alphabet-only validation for description
    if (!/^[a-zA-Z ]*$/.test(categoryDescription)) {
      toast.error('Category description must contain only alphabets ');
      return;
    }

    // URL validation for icon
    if (!isValidUrl(categoryIcon)) {
      toast.error('Please provide a valid URL for the category icon');
      return;
    }

    // Submit the category
    onAddCategory({
      category_title: categoryTitle,
      category_description: categoryDescription,
      category_icon: categoryIcon
    });

    toast.success('Category added successfully');

    // Reset form fields
    setCategoryTitle('');
    setCategoryDescription('');
    setCategoryIcon('');
  };

  return (
    <>
      <div className='woww'>
        <form onSubmit={handleSubmit} className="form-container add-category">
          <div className="form-group">
            <label>Category Title:</label>
            <input
              type="text"
              value={categoryTitle}
              onChange={(e) => setCategoryTitle(e.target.value)}
              className="form-input"
              placeholder="Enter category title "
            />
          </div>
          <div className="form-group">
            <label>Category Description:</label>
            <input
              type="text"
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
              className="form-input"
              placeholder="Enter category description "
            />
          </div>
          <div className="form-group">
            <label>Category Icon URL:</label>
            <input
              type="text"
              value={categoryIcon}
              onChange={(e) => setCategoryIcon(e.target.value)}
              className="form-input"
              placeholder="Enter valid icon URL"
            />
          </div>
          <button type="submit" className="btn-submit">Add Category</button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default AddCategoryForm;