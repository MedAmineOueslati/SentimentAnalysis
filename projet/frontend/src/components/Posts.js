import './Posts.css';
import Share from './Share.js';
import { useState,useEffect } from 'react';
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ClearIcon from '@mui/icons-material/Clear';
import InfiniteScroll from "react-infinite-scroll-component"
import axios from 'axios'


function Posts() {
  const [posts,setposts]=useState([])
  const [v,setv]=useState("");
  const [hasmore,sethasmore]=useState(true);
  const [next,setnext]=useState('http://127.0.0.1:8000/api/posts/');

  

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
        <h3 className="name">{post.username}</h3> 
          </div>          
        
        <ClearIcon htmlColor='red' onClick={()=> deletepost(post)}/>
      
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
      
     
        <TextsmsOutlinedIcon />
        <h4>12 Comments</h4>
     
    </div>
    
  </div>
</div>
))}
</InfiniteScroll>
   </div>
);
}

export default Posts;