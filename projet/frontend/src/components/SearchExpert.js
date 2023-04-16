import { useState,useRef,useEffect,useContext } from 'react';
import './SearchExpert.css';
import AuthContext from '../context/AuthContext'
import axios from 'axios'

const SearchExpert = () => {
  const [title, settitle] = useState('');
  const [description, setdescription] = useState('');
  const [image, setimage] = useState(null);
  let {user} = useContext(AuthContext)

  function addarticle()
  {   let data=new FormData()
      data.append("proprietaire",user.id)
      data.append("title",title)
      data.append("description",description)
      data.append("im",image)

      axios.post(`http://127.0.0.1:8000/api/articles/`,data,
      { headers:{ 'Content-Type': 'multpart/form-data'}}
      ).then(resp=>{console.log(resp) 
        }).catch(err=>console.log(err))
       
   }

  const handleTitleChange = (event) => {
    settitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setdescription(event.target.value);
  };

  const handleImageChange = (event) => {
    setimage(event.target.files[0]);
  };

  const handleAddButtonClick = () => {
    addarticle()
    settitle('');
    setdescription('');
    setimage(null);
  };

  return (
    <div className="SearchExpert">
      
      <form>
        
        <input
          type="text"
          id="title"
          name="title"
          onChange={handleTitleChange}
        /><br /> <br />
        
        <textarea
          id="description"
          name="description"
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
