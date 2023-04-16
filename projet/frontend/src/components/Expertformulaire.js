import React from 'react';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { useState ,useEffect,useContext} from 'react';
import AuthContext from '../context/AuthContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Expertformulaire(props) {
  
  const [title,settitle]=useState("");
    const [description,setdescription]=useState("");
    const [im,setim]=useState(null);
    const navigate = useNavigate();
    let {user} = useContext(AuthContext)

  function addarticle()
  {   let data=new FormData()
      data.append("proprietaire",user.id)
      data.append("title",title)
      data.append("description",description)
      data.append("im",im)

      axios.post(`http://127.0.0.1:8000/api/articles/`,data,
      { headers:{ 'Content-Type': 'multpart/form-data'}}
      ).then(resp=>{console.log(resp) 
        }).catch(err=>console.log(err))
       
        navigate('/App1') 
   }
   

  return (
    <div>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e)=>settitle(e.target.value)}
       
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e)=>setdescription(e.target.value)}
       
      />
      <Input
        type="file"
        accept="image/*"
        fullWidth
        margin="normal"
        onChange={(e)=>setim(e.target.files[0])}
        
      />
      <Button type="submit" variant="contained" color="primary" onClick={addarticle}>
        Submit
      </Button>
    </div>
  );
};

export default Expertformulaire;
