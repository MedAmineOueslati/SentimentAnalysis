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


function PostsCy() {
  const [hasmore,sethasmore]=useState(true);
  const [next,setnext]=useState('http://127.0.0.1:8000/api/PostVerifie/');
  const [posts,setposts]=useState([])
  const [show,setshow]=useState(false);
  const [authors, setAuthors] = useState({});
  const [nbcomments, setnbcomments] = useState({});
  const [bc, setbc] = useState({});
  const [comments,setcomments]=useState([])
  const [hasmorec,sethasmorec]=useState(true);
  const [nextc, setnextc] = useState('');
  const [ecomments,setecomments]=useState([])
  const [ehasmorec,setehasmorec]=useState(true);
  const [enextc, setenextc] = useState('');
  let {user} = useContext(AuthContext)

  useEffect(() => {
    async function getbc() {
      const newbc = {};
      for (const post of posts) {
        newbc[post.id] = post.bc;
      }
      setbc(newbc);
    }
    getbc();
  }, [posts]);
  
  async function NbCommentaire(id){
    try {
      const response = await fetch('http://127.0.0.1:8000/api/NombreDeCommentaire/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idPost: id }),
      });
      const data = await response.json();
     
      return(data.nb)
      
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    async function getnbcomments() {
      const newnbcomments = {};
      for (const post of posts) {
        const nbc = await NbCommentaire(post.id);
        newnbcomments[post.id] = nbc;
      }
      setnbcomments(newnbcomments);
    }
    getnbcomments();
  }, [posts]);
  

  
    async function NomDuPro(id) {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/UserFullNameVer/", {
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
     .then(resp=>{setposts(prevposts => [...prevposts, ...resp.results])
      setnext(resp.next)
     sethasmore(!!resp.next)
   })
     .catch(error=>console.log("ddd"))
     
  }

  useEffect(()=>
   {
    getdata()
   },[])
   function getcomments()
   {
     fetch( nextc,{
        'method':'GET',
        headers:{'Content-Type': 'application/json'}
      })
      .then(resp=>resp.json())
      .then(resp=>{setcomments(prevcomments => [...prevcomments, ...resp.results])
       setnextc(resp.next)
      sethasmorec(!!resp.next)
    })
      .catch(error=>console.log("ddd"))
      
   }
 
   useEffect(()=>
    {
      getcomments()
    },[])
    function getecomments()
    {
      fetch( enextc,{
         'method':'GET',
         headers:{'Content-Type': 'application/json'}
       })
       .then(resp=>resp.json())
       .then(resp=>{setecomments(prevcomments => [...prevcomments, ...resp.results])
        setenextc(resp.next)
       setehasmorec(!!resp.next)
     })
       .catch(error=>console.log("ddd"))
       
    }
  
    useEffect(()=>
     {
       getecomments()
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
      
     
        <TextsmsOutlinedIcon  onClick={() => {
  const currentValue = bc[post.id];
  setnextc(`http://127.0.0.1:8000/api/comments/${post.id}/`)
  setenextc(`http://127.0.0.1:8000/api/expertComments/${post.id}/`)
  setcomments([]);
  setecomments([])
  const newbc = {};
      for (const p of posts) {
        if(p.id!=post.id)
        newbc[p.id] =false;
        else
        newbc[p.id] =!currentValue;
      }
      setbc(newbc);
    
}}/>

        <h4>{nbcomments[post.id]} comments</h4>
     
    </div>
    {bc[post.id]&&(
     
    
    <div className="comments">
    <div className="commentstrait"></div>
    <InfiniteScroll
     dataLength={ecomments.length} 
     next={getecomments()}
     hasMore={ehasmorec}
     loader={<h4>Loading...</h4>}
     endMessage={
       <p style={{ textAlign: 'center' }}>
         <h4>termineé...</h4>
       </p>
     }>
    {ecomments.map(ecomment=>(
    <div className="commentscontent">
    <div className='entete'>
    <div className='user'><img src={require('./user1.png')} alt="" />
    
/*kkkkkkkkkkkkkkk*/
    <h4>Dali Mathlouthi</h4></div>
    <MoreVertIcon htmlColor='#424242'/>
    </div>
    <p>{ecomment.description}</p>
    </div>))}
    </InfiniteScroll>
    <InfiniteScroll
     dataLength={comments.length} 
     next={getcomments()}
     hasMore={hasmorec}
     loader={<h4>Loading...</h4>}
     endMessage={
       <p style={{ textAlign: 'center' }}>
         <h4>termineé...</h4>
       </p>
     }>
    {comments.map(comment=>(
    <div className="commentscontent">
    <div className='entete'>
    <div className='user'><img src={require('./user1.png')} alt="" />

    <h4>Dali Mathlouthi</h4></div>
    <MoreVertIcon htmlColor='#424242'/>
    </div>
    <p>{comment.description}</p>
    </div>))}
    </InfiniteScroll>
   
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

export default PostsCy;