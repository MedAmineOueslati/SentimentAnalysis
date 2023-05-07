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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';


function PostsCy() {
  const [hasmore,sethasmore]=useState(true);
  const [next,setnext]=useState('http://127.0.0.1:8000/api/PostVerifie/');
  const [posts,setposts]=useState([])
  const [show,setshow]=useState(false);
  const [authors, setAuthors] = useState({});
  const [cytname, setcytname] = useState({});
  const [expname, setexpname] = useState({});
  const [nbcomments, setnbcomments] = useState({});
  const [bc, setbc] = useState({});
  const [bce, setbce] = useState({});
  const [bcc, setbcc] = useState({});
  const [comments,setcomments]=useState([])
  const [hasmorec,sethasmorec]=useState(true);
  const [nextc, setnextc] = useState('');
  const [ecomments,setecomments]=useState([])
  const [ehasmorec,setehasmorec]=useState(true);
  const [enextc, setenextc] = useState('');
  const [cdescription, setcdescription] = useState('');
  const [likedup,setlikedup]=useState(true);
  const [likeddown,setlikeddown]=useState(true);
  const [nblikes, setnblikes] = useState({});
  const [nbdeslikes, setnbdeslikes] = useState({});
  const [reaction, setreaction] = useState({});
  const [idl, setidl] = useState('');
  
  let {user} = useContext(AuthContext)

  useEffect(() => {
    async function getbce() {
      const newbce = {};
      for (const ecomment of ecomments) {
        newbce[ecomment.id] = false;
      }
      setbce(newbce);
    }
    getbce();
  }, [ecomments]);
  useEffect(() => {
    async function getbcc() {
      const newbcc = {};
      for (const comment of comments) {
        newbcc[comment.id] = false;
      }
      setbcc(newbcc);
    }
    getbcc();
  }, [ecomments]);

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
    async function NomDucyt(id1) {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/CommenterFullName/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id:id1 }),
        });
        const data = await response.json();
       
        return(data.nom)
        
      } catch (error) {
        console.log(error);
      }
      
    }
    useEffect(() => {
      async function getcytname() {
        const newcytname = {};
        for (const comment of comments) {
          const cytName = await NomDucyt(comment.id);
          newcytname[comment.id] = cytName;
        }
        setcytname(newcytname);
      }
      getcytname();
    }, [comments]);

    async function NomDuexp(id1) {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/ExpertFullName/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id:id1 }),
        });
        const data = await response.json();
       
        return(data.nom)
        
      } catch (error) {
        console.log(error);
      }
      
    }
    useEffect(() => {
      async function getexpname() {
        const newexpname = {};
        for (const comment of ecomments) {
          const expName = await NomDuexp(comment.id);
          newexpname[comment.id] = expName;
        }
        setexpname(newexpname);
      }
      getexpname();
    }, [ecomments]);
    

  
  
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
      .then(resp=>{if (resp.previous)
        {setcomments(prevcomments => [...prevcomments, ...resp.results])}
        else
        {setcomments(resp.results)}
       setnextc(resp.next)
      sethasmorec(!!resp.next)
    })
      
      
   }
   
   
    function getecomments()
    {
      fetch( enextc,{
         'method':'GET',
         headers:{'Content-Type': 'application/json'}
       })
       .then(resp=>resp.json())
       .then(resp=>{if (resp.previous)
        {setecomments(prevcomments => [...prevcomments, ...resp.results])}
        else
        {setecomments(resp.results)}
        setenextc(resp.next)
       setehasmorec(!!resp.next)
       console.log(resp)
     })
       
       
    }
     
    async function addcomment(idp)
    {   let data=new FormData()
        data.append("idUser",user.id)
        data.append("idPost",idp)
        data.append("description",cdescription)
        
  
        await axios.post(`http://127.0.0.1:8000/api/commentDetail/`,data,
        { headers:{ 'Content-Type': 'multpart/form-data'}}
        ).then(resp=>{console.log(resp) 
          const newcomment = resp.data;
         setcomments(comments => [newcomment, ...comments]);
          }).catch(err=>console.log(err))
          
         
     }
     async function addecomment(idp)
    {   let data=new FormData()
        data.append("idExpert",user.id)
        data.append("idPost",idp)
        data.append("description",cdescription)
        
  
        await axios.post(`http://127.0.0.1:8000/api/ExpertcommentDetail/`,data,
        { headers:{ 'Content-Type': 'multpart/form-data'}}
        ).then(resp=>{console.log(resp) 
          const newecomment = resp.data;
         setecomments(ecomments => [newecomment, ...ecomments]);
          }).catch(err=>console.log(err))
          
         
     }
     async function PutECommntSentiment(ecomment,sentiment){
      const updatedbce = { ...bce, [ecomment.id]: !bce[ecomment.id] };
  setbce(updatedbce);
      await axios.patch(`http://127.0.0.1:8000/api/ExpertcommentDetail/${ecomment.id}/`, { "sentiment": sentiment });
     }
     async function PutCommntSentiment(comment,sentiment){
      const updatedbcc = { ...bcc, [comment.id]: !bcc[comment.id] };
  setbcc(updatedbcc);
      await axios.patch(`http://127.0.0.1:8000/api/commentDetail/${comment.id}/`, { "sentiment": sentiment });
     }

     function DeleteCommnt(comment){
      const updatedbcc = { ...bcc, [comment.id]: !bcc[comment.id] };
  setbcc(updatedbcc);
      axios.delete(`http://127.0.0.1:8000/api/commentDetail/${comment.id}/`)
      .then(() => {
        const updatedComments = comments.filter(p => p.id !== comment.id);
       
        setcomments(updatedComments);
      }).catch(err => {
        console.error(err);
      });
     }

    async function Nblikes(id){
    try {
      const response = await fetch('http://127.0.0.1:8000/api/NomreDeLikeEtDislike/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idPost: id }),
      });
      const data = await response.json();
     
      return(data.NbL)
      
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    async function getnblikes() {
      const newnblikes = {};
      for (const post of posts) {
        const nbc = await Nblikes(post.id);
        newnblikes[post.id] = nbc;
      }
      setnblikes(newnblikes);
    }
    getnblikes();
  }, [posts]);
  async function Nbdeslikes(id){
    try {
      const response = await fetch('http://127.0.0.1:8000/api/NomreDeLikeEtDislike/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idPost: id }),
      });
      const data = await response.json();
     
      return(data.NbDL)
      
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    async function getnbdeslikes() {
      const newnbdeslikes = {};
      for (const post of posts) {
        const nbc = await Nbdeslikes(post.id);
        newnbdeslikes[post.id] = nbc;
      }
      setnbdeslikes(newnbdeslikes);
    }
    getnbdeslikes();
  }, [posts]);

  async function addelike(idp)
  {  const updatednblikes = { ...nblikes, [idp]: nblikes[idp] +1};
  setnblikes(updatednblikes);  
    let data=new FormData()
      data.append("idcit",user.id)
      data.append("idPost",idp)
      data.append( "isLike",true)

      await axios.post(`http://127.0.0.1:8000/api/reaction/`,data,
      { headers:{ 'Content-Type': 'multpart/form-data'}}
      ).then(resp=>{console.log(resp)
        }).catch(err=>console.log(err))
         
   }
   async function addedeslike(idp)
  {  const updatednbdeslikes = { ...nbdeslikes, [idp]: nbdeslikes[idp] +1};
  setnbdeslikes(updatednbdeslikes);  
    let data=new FormData()
      data.append("idcit",user.id)
      data.append("idPost",idp)
      data.append( "isLike",false)

      await axios.post(`http://127.0.0.1:8000/api/reaction/`,data,
      { headers:{ 'Content-Type': 'multpart/form-data'}}
      ).then(resp=>{console.log(resp)
        }).catch(err=>console.log(err))
         
   }
   async function idlike(idp){
    try {
      const response = await fetch('http://127.0.0.1:8000/api/isReacted/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "idPost":idp,"idcit":user.id }),
      });
      const data = await response.json();
      
      
      
    } catch (error) {
      console.log(error);
    }
  }
  async function Deletelike(idp){
    const response = await fetch('http://127.0.0.1:8000/api/isReacted/', {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ "idPost":idp,"idcit":user.id }),
});
const data = await response.json();
    axios.delete(`http://127.0.0.1:8000/api/reaction/${data.id}/`)
    .then(() => {
      const updatednblikes = { ...nblikes, [idp]: nblikes[idp] -1};
    setnblikes(updatednblikes); 
    }).catch(err => {
      console.error( idlike(idp));
    });
   }
   async function Deletedeslike(idp){
    const response = await fetch('http://127.0.0.1:8000/api/isReacted/', {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ "idPost":idp,"idcit":user.id }),
});
const data = await response.json();
    axios.delete(`http://127.0.0.1:8000/api/reaction/${data.id}/`)
    .then(() => {
      const updatednbdeslikes = { ...nbdeslikes, [idp]: nbdeslikes[idp] -1};
      setnbdeslikes(updatednbdeslikes); 
    }).catch(err => {
      console.error( idlike(idp));
    });
   }
   async function isReacted(id){
    try {
      const response = await fetch('http://127.0.0.1:8000/api/isReacted/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "idPost":id,
        "idcit":1 }),
      });
      const data = await response.json();
      console.log(data);
      return(data.reaction)
      
    } catch (error) {
      console.log(id);
    }
  }
  useEffect(() => {
    async function getreaction() {
      const newreaction = {};
      for (const post of posts) {
        const nbc = await isReacted(post.id);
        newreaction[post.id] = nbc;
      }
      setreaction(newreaction);
    }
    getreaction();
  }, [posts]);

  return (


   <div>
    
    {user && <Share posts={posts} updatepost={updatepost}/> }
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
    <div className="content3">
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
    <div className='trait'></div>
    <div className="info">
      <div className='reaction'>
        <div className='likes'>
        {reaction[post.id]!=1&&(<ThumbUpOffAltIcon onClick={()=>{
          if(reaction[post.id]==0)
              addelike(post.id)
          else
          { 
            Deletedeslike(post.id)
            addelike(post.id)
          }
    const updatedreaction = { ...reaction, [post.id]:1};
    setreaction(updatedreaction); }}/>)}
        {reaction[post.id]==1&&(<ThumbUpIcon onClick={()=>{Deletelike(post.id);const updatedreaction = { ...reaction, [post.id]:0};
    setreaction(updatedreaction);}}/>)}
        <span>{nblikes[post.id]}</span>
        </div>
        <div className='deslikes'>
        {reaction[post.id]!=-1&&(<ThumbDownOffAltIcon onClick={()=>{if(reaction[post.id]==0)
              addedeslike(post.id)
          else
          { 
            Deletelike(post.id)
            addedeslike(post.id)
          }
    const updatedreaction = { ...reaction, [post.id]:-1};
    setreaction(updatedreaction);}}/>)}
       { reaction[post.id]==-1&&(<ThumbDownIcon onClick={()=>{Deletedeslike(post.id);const updatedreaction = { ...reaction, [post.id]:0};
    setreaction(updatedreaction);}}/>)}
        <span>{nbdeslikes[post.id]}</span>
        </div>

      </div>
     
        <TextsmsOutlinedIcon  onClick={() => {
  const currentValue = bc[post.id];
  setnextc(`http://127.0.0.1:8000/api/comments/${post.id}/`)
  setenextc(`http://127.0.0.1:8000/api/expertComments/${post.id}/`)
  
  
  setecomments([])
  const newbc = {};
      for (const p of posts) {
        if(p.id!==post.id)
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
         
       </p>
     }>
    {ecomments.map(ecomment=>(
    <div className="commentscontent">
    <div className='entete'>
    <div className='user'><img src={require('./user1.png')} alt="" />
    <h4>{expname[ecomment.id]}</h4>
    <CheckCircleIcon htmlColor='#2196F3'/></div>
    
    
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
         
       </p>
     }>
    {comments.map(comment=>(
    <div className="commentscontent">
    <div className='entete'>
    <div className='user'><img src={require('./user1.png')} alt="" />

    <h4>{cytname[comment.id]}</h4></div>
    <div className="dropdown">
    {user && user.isExpert&&(<MoreVertIcon htmlColor='#424242' onClick={ ()=>{const updatedbcc = { ...bcc, [comment.id]: !bcc[comment.id] };
  setbcc(updatedbcc);}}/>)}
    {bcc[comment.id] && (
       
          <ul className="dropdown-menu">
            
            <li  onClick={()=> DeleteCommnt(comment)}>
            <ClearIcon htmlColor='red'/>
            <span>Supprimer</span> 
            </li>
          </ul>
        
        )}
        </div>
        
    </div>
    <p>{comment.description}</p>
    </div>))}
    </InfiniteScroll>
   
    {user && <div className="commentsform">
    <input type="text" placeholder='Add a new comment' value={cdescription} onChange={(e)=>setcdescription(e.target.value)} ></input>
    <input type="submit" value="Add " onClick={()=>{
      if (user.isExpert)
      {addecomment(post.id)}
      else
      {addcomment(post.id)}
      setcdescription("")
    }}></input>
    </div>}
    </div>)}
   
    
  </div>
</div>
))}
</InfiniteScroll>
   </div>
);
}

export default PostsCy;