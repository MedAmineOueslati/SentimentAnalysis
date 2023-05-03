import './Search.css';
import { useState,useEffect,useContext } from 'react';
import AuthContext from '../context/AuthContext'
import axios from 'axios'
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Expertformulaire from './Expertformulaire';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Expertform from './Expertformulaire';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';




function Search() {
    const [qestion,setqestion]=useState("");
    const [articles,setarticles]=useState([]);
    const [title,settitle]=useState("");
    const [description,setdescription]=useState("");
    const [im,setim]=useState(null);
    const [b,setb]=useState(false);
    const [nb,setnb]=useState(0);
    const [nbmax,setnbmax]=useState(0);
    
    
    const navigate = useNavigate();
    let {user} = useContext(AuthContext)
    

   
  function updatearticle(item) { 
    
    const updatedB = !item.b; 
  
    const data = {
      proprietaire:item.proprietaire,
      
      description: item.description,
      b: updatedB
    };
     
    fetch(`http://127.0.0.1:8000/api/articles/${item.id}/`, {
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
  
  
  
  
  
  
  

   function getdata()
   {
    fetch( `http://127.0.0.1:8000/api/articles/?offset=${nb}`,{
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
    },[nb])
    function getnbmax()
   {
    fetch( `http://127.0.0.1:8000/api/articles/`,{
        'method':'GET',
        headers:{'Content-Type': 'application/json'}
      })
      .then(resp=>resp.json())
      .then(resp=>setnbmax(resp["count"]))
      .catch(error=>console.log(error))
   }

    useEffect(()=>
    {
      getnbmax()
    },[])

    const handleAddClick = () => {
     
      
      navigate('/Expertform');
      

    }
    const handleUpdateClick = (item) => {
    
      navigate('/Expertform');
    }
    
 /*<div className="cont">
         <input type="search" placeholder="Search..."
        onChange={(e)=>setqestion(e.target.value)}></input>
        <SearchIcon htmlColor='#40b2e5'/>
         </div>*/


  return (
    
    <div className="Search">
        
        <div className='container2'>
         {articles.filter((item)=>{
        return qestion.toLocaleLowerCase()===''
        ?item
        :item.title.toLocaleLowerCase().includes(qestion)
       }
       ).map((item)=>(
        <div className='box'>   
    <Card sx={{ maxWidth: 350 }} key={item.id}>
      
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={item.im}
      />
      <div className='content'>
        <h3>{item.title} </h3>
        {!item.b&&(<Typography variant="body2" color="text.secondary">
        {(() => {
      const lines = item.description.split(" ");
      const firstLine = lines.slice(0,12).join(" ");
      return firstLine+'...';
    })()}
        </Typography>)}
        {item.b&&(<Typography variant="body2" color="text.secondary">
        {item.description}
        </Typography>)}
      </div>
      <CardActions>
        <Button htmlcolor='red' size="small" onClick={()=>
          { setb(!item.b)
            settitle(item.title)
            setdescription(item.description)
            updatearticle(item)}}
            >Learn More</Button>
        {user.isExpert &&(<Link to={`/Expertform?data0=${encodeURIComponent(item.proprietaire)}&data1=${encodeURIComponent(item.title)}&data2=${encodeURIComponent(item.description)}&data3=${encodeURIComponent(item.im)}
        &data4=${encodeURIComponent(item.id)}`}><EditIcon htmlColor='grey'/></Link>)}
      </CardActions>
    </Card>
    </div>
  
       ))
       }
       </div>
       
    <div className='scroll'>
   < ArrowBackIosNewIcon htmlColor='grey'onClick={()=>{
    if(nb>=6)
        setnb(nb-6);

      }}/>
   < ArrowForwardIosIcon htmlColor='grey'onClick={()=>{
    if(nb<nbmax-6)
        setnb(nb+6);

      }}/>
    </div>
      
    </div>
    
  );
}

export default Search;
/*<Button
variant="contained"
color="primary"
startIcon={<AddIcon />}
onClick={handleAddClick}
>
Add article
</Button>*/