import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddCategoryForm from './AddNewCatg';
import AddItemForm from './AddItem';
import './style1.css';
import { useUser } from '../userContext';

const serverURL = "http://localhost:5000";

const MyComponent = () => {
  const { user } = useUser();
  const [categories, setCategories] = useState([]);

  const isAdmin = user && user.role === 'Admin';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${serverURL}/api/add-new/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = async (newCategory) => {
    try {
      const response = await axios.post(`${serverURL}/api/add-new/categories`, newCategory);
      setCategories([...categories, response.data]);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleAddItem = async (categoryId, newItem) => {
    try {
      const newItemData = {
        ...newItem,
        category_id: categoryId 
      };

      const newItemResponse = await axios.post(`${serverURL}/api/add-new/items`, newItemData);
      console.log('Added item:', newItemResponse.data);
  
      if (!newItemResponse.data || !newItemResponse.data._id) {
        console.error('Error: Invalid response format for adding item.');
        return;
      }
  
      const response = await axios.put(`${serverURL}/api/add-new/categories/${categoryId}/addItem`, { itemId: newItemResponse.data._id });
      console.log('Added item to category:', response.data);
  
      const updatedCategory = response.data;
      const updatedCategories = categories.map(category => {
        if (category._id === updatedCategory._id) {
          return updatedCategory;
        }
        return category;
      });
      setCategories(updatedCategories);
    } catch (error) {
      console.error('Error adding item to category:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className='beauti'>
    <div className="container">
      {isAdmin ? (
        <>
          <div className="add-category">
            <h2 className='mt-5 mb-5' style={{textAlign:"center"}}>Add New Category</h2>
            <AddCategoryForm onAddCategory={handleAddCategory} />
          </div>
          <div className="add-item">
            <h2 className='mt-5 mb-5' style={{textAlign:"center"}}>Add New Item to Category</h2>
            <AddItemForm categories={categories} onAddItem={handleAddItem} />
          </div>
        </>
      ) : (
        <div className="access-forbidden mt-3" style={{textAlign:"center"}}>
          <h3>Access Forbidden</h3>
          <p>Accessible only by Admins.</p>
        </div>
      )}
      
    </div>
    </div>
  );
};

export default MyComponent;
