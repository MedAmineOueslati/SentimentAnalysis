import React, { useState } from 'react';
import './SearchExpert.css';
const SearchExpert = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleAddButtonClick = () => {
    setTitle('');
    setDescription('');
    setImage(null);
  };

  return (
    <div className="SearchExpert">
      
      <form>
        
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleTitleChange}
        /><br /> <br />
        
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={handleDescriptionChange}
        /><br /> <br />
        
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleImageChange}
        /><br /> <br />
        <button type="button" onClick={handleAddButtonClick}>
          Add a new article
        </button>
      </form>
    </div>
  );
};

export default SearchExpert;
