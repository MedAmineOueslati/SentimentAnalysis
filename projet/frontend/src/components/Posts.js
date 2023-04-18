import './Posts.css';
import Share from './Share.js';
import { useState,useEffect,useContext} from 'react';
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ClearIcon from '@mui/icons-material/Clear';
import InfiniteScroll from "react-infinite-scroll-component"
import axios from 'axios'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import AuthContext from '../context/AuthContext'


function Posts() {
  const [posts,setposts]=useState([])
  const [hasmore,sethasmore]=useState(true);
  const [next,setnext]=useState('http://127.0.0.1:8000/api/posts/');
  const [show,setshow]=useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [name,setname]=useState("dali");
  const [authors, setAuthors] = useState({});
  let {user} = useContext(AuthContext)
  
  async function NbCommentaire(){
    let data = await fetch('http://127.0.0.1:8000/api/NombreDeCommentaire/',{
      method :'GET',
       headers:{'Content-Type': 'application/json'
      },
      body:JSON.stringify({"idPost": "1"})

    })
    console.log(data["nb"]);
  }
  

  
    async function NomDuPro(id) {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/UserFullName/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        });
        const data = await response.json();
       
        return(data.nom)
        
      } catch (error) {
        console.log(error);
      }
      
    }
    /*kkkkkkkkkkkkkkkkkkkkkk*/
    useEffect(() => {
      async function getAuthors() {
        const newAuthors = {};
        for (const post of posts) {
          const authorName = await NomDuPro(post.id);
          newAuthors[post.id] = authorName;
        }
        setAuthors(newAuthors);
      }
      getAuthors();
    }, [posts]);

  function deletepost(post) {
    axios.delete(`http://127.0.0.1:8000/api/posts/${post.id}/`)
    .then(() => {
      const updatedPosts = posts.filter(p => p.id !== post.id);
     
      setposts(updatedPosts);
    }).catch(err => {
      console.error(err);
    });
  }
  
  function updatepost(newstate)
  {
    setposts(newstate)
  }
  
  
  function getdata()
  {
   fetch( next,{
       'method':'GET',
       headers:{'Content-Type': 'application/json'}
     })
     .then(resp=>resp.json())
     .then(resp=>{setposts(prevPosts => [...prevPosts, ...resp.results])
     setnext(resp.next)
     sethasmore(!!resp.next)
   console.log(next);})
     .catch(error=>console.log("ddd"))
     
  }

  useEffect(()=>
   {
    getdata()
   },[])

  return (


   <div>
     <Share posts={posts} updatepost={updatepost}/>
     <InfiniteScroll
  dataLength={posts.length} 
  next={getdata}
  hasMore={hasmore}
  loader={<h4>Loading...</h4>}
  endMessage={
    <p style={{ textAlign: 'center' }}>
      <b>Yay! You have seen it all</b>
    </p>
  }>
 

{posts.map(post=>(
  <div className="post">
  <div className="container">
    <div className="user">
      
        <div className="user1">
        <img src={require('./user1.png')} alt="" />
        <h3 className="name" >{authors[post.id]}</h3> 
          </div>          
        
        
        <div className="dropdown">
        <MoreVertIcon htmlColor='#424242' onClick={()=> setIsOpen(!isOpen)} />

          
        {isOpen && (
          <ul className="dropdown-menu">
            <li >
            <AddCircleOutlineIcon  htmlColor='#9CCC65'/>
             <span>Positive</span>
            </li>
            <li >
            <SentimentNeutralIcon   htmlColor='#FFD54F'/>
             <span>Neutre</span>
            </li>
            <li >
            <RemoveCircleOutlineIcon  htmlColor='#1E88E5'/>
              <span>Negative</span>
            </li>
            <li   onClick={()=> deletepost(post)}>
            <ClearIcon htmlColor='red'/>
            <span>Supprimer</span> 
            </li>
          </ul>
        )}
      </div>
        

    </div>
    <div className="content">
      <p>{post.description}</p>
      {
        post.im&&(
          <img src={post.im} alt="" />
        )
      }
      {
        post.vd&&(
          <video src={post.vd} alt="" />
        )
      }
      
    </div>
    <div className="info">
      
     
        <TextsmsOutlinedIcon  onClick={()=>setshow(!show)}/>

        <h4>1 Comments</h4>
     
    </div>
    {show&&(<div className="comments">
    <div className="commentstrait"></div>
    <div className="commentscontent">
    <div className='entete'>
    <div className='user'><img src={require('./user1.png')} alt="" />
    <h4>Dali Mathlouthi</h4></div>
    <MoreVertIcon htmlColor='#424242'/>
    </div>
    <p>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
    </div>
    <div className="commentsform">
    <input type="text" placeholder='Add a new comment' ></input>
    <input type="submit" value="Add " ></input>
    </div>
    </div>)}
    
  </div>
</div>
))}
</InfiniteScroll>
   </div>
);
}

export default Posts;