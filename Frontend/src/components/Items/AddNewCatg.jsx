import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style1.css';

const AddCategoryForm = ({ onAddCategory }) => {
  const [categoryTitle, setCategoryTitle] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categoryIcon, setCategoryIcon] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryTitle || !categoryDescription || !categoryIcon) {
      toast.error('Please fill in all fields');
      return;
    }
    onAddCategory({
      category_title: categoryTitle,
      category_description: categoryDescription,
      category_icon: categoryIcon
    });
    toast.success('Category added successfully');
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
          />
        </div>
        <div className="form-group">
          <label>Category Description:</label>
          <input
            type="text"
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Category Icon URL:</label>
          <input
            type="text"
            value={categoryIcon}
            onChange={(e) => setCategoryIcon(e.target.value)}
            className="form-input"
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