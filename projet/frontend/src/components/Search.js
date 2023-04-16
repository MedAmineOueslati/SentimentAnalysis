import './Search.css';
import { useState,useEffect } from 'react';
import axios from 'axios'
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Expertformulaire from './Expertformulaire';
import { useNavigate } from 'react-router-dom';







function Search() {
    const [qestion,setqestion]=useState("");
    const [articles,setarticles]=useState([]);
    const [title,settitle]=useState("");
    const [description,setdescription]=useState("");
    const [im,setim]=useState(null);
    const [b,setb]=useState(false);
    const navigate = useNavigate();
    

    function updatearticle(item)
  { let data={title,description}
   
    fetch( `http://127.0.0.1:8000/articles/${item.id}/`,{
        'method':'PUT',
        headers:{'Accept':'application/json','Content-Type': 'application/json'},
        body:JSON.stringify(data)})
      .then(resp=>{resp.json()
      })
      .catch(error=>console.log(error))
      getdata()

  }
  function updatearticle(item) { 
    
    const updatedB = !item.b; 
  
    const data = {
      title: item.title,
      description: item.description,
      b: updatedB
    };
     
    fetch(`http://127.0.0.1:8000/articles/${item.id}/`, {
      method: 'PUT',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data); 
      getdata(); 
    })
    .catch(error => console.log(error));
  }
  
  
  
  
  
  function deletearticle(item) {
    fetch(`http://127.0.0.1:8000/articles/${item.id}`, {
      method: 'DELETE'
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp)
      
      })
    })
    getdata()
  }
  function addarticle()
  {   let data=new FormData()
      data.append("title",title)
      data.append("description",description)
      data.append("im",im)

      axios.post(`http://127.0.0.1:8000/articles/`,data,
      { headers:{ 'Content-Type': 'multpart/form-data'}}
      ).then(resp=>{console.log(resp) 
        }).catch(err=>console.log(err))
        getdata()
   }

   function getdata()
   {
    fetch( 'http://127.0.0.1:8000/api/articles/',{
        'method':'GET',
        headers:{'Content-Type': 'application/json'}
      })
      .then(resp=>resp.json())
      .then(resp=>setarticles(resp["results"]))
      .catch(error=>console.log(error))
   }

    useEffect(()=>
    {
      getdata()
    },[])

    const handleAddClick = () => {
     
      
      navigate('/Expertform');
      

    }
    const handleUpdateClick = (item) => {
    
      navigate('/Expertform');
    }
    
  return (
    
    <div className="Search">
         <div className="cont">
         <input type="search" placeholder="Search..."
        onChange={(e)=>setqestion(e.target.value)}></input>
        <SearchIcon htmlColor='#40b2e5'/>
         </div>
        
         {articles.filter((item)=>{
        return qestion.toLocaleLowerCase()===''
        ?item
        :item.title.toLocaleLowerCase().includes(qestion)
       }
       ).map((item)=>(
        
        <div className="article" key={item.id}>
        <div className="arcontainer"><h3> {item.title}</h3>
      < EditIcon   onClick={()=>handleUpdateClick(item)}/></div>
        <img src={item.im}/>
        
        
        {item.b&&(
            <div className="des">
            {item.description}
          </div>
        )}
        
        <ArrowDropDownCircleIcon htmlColor='#BDBDBD' onClick={()=>
          { setb(!item.b)
            settitle(item.title)
            setdescription(item.description)
            updatearticle(item)}}
            
            />
          
        
      </div>
       ))
       

       }
        <Button
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      onClick={handleAddClick}
    >
      Add article
    </Button>
      
    </div>
    
  );
}

export default Search;
