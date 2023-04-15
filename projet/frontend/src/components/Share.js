import { useState,useRef,useEffect } from 'react';
import './Share.css';
import  img from'./user.png';
import ImageIcon from '@mui/icons-material/Image';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ClearIcon from '@mui/icons-material/Clear';
import Picker from 'emoji-picker-react';
import axios from 'axios'



function Share(props) {
    const [image,setimage]=useState(null);
    const [im,setim]=useState('');
    const [vd,setvd]=useState('');
   
    const [video,setvideo]=useState(null);
    const [inputstr,setinputstr]=useState('');
    const [show,setshow]=useState(false);
    const imageref=useRef();
    const videoref=useRef();
    const changeimage=(e)=>{
        if(e.target.files)
        {
            let im1=e.target.files[0];
            setim(im1);
            setimage({image:URL.createObjectURL(im1)})
           
        }
    }
    const changevideo=(e)=>{
        if(e.target.files)
        {
            let vd1=e.target.files[0];
            setvd(vd1)
            setvideo({video:URL.createObjectURL(vd1)})
           
        }
    }
    const addemoji=(e)=>{
        setinputstr(prevInput =>prevInput+e.emoji)
        setshow(false)
    }

    function addpost() {
      let data = new FormData();
      data.append("description", inputstr);
      data.append("im", im);
      data.append("vd", vd);
      axios
        .post(`http://127.0.0.1:8000/posts/`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(resp => {
          console.log(resp);
          setinputstr('');
          getdata();
    
          const newPost = resp.data;
          props.updatepost(posts => [newPost, ...posts]);
        })
        .catch(err => console.log(err));
    }
    
    
    
    
    
    

    function getdata()
  {
   fetch( 'http://127.0.0.1:8000/posts/',{
       'method':'GET',
       headers:{'Content-Type': 'application/json'}
     })
     .then(resp=>resp.json())
     .then(resp=>props.updatepost(resp))
     .catch(error=>console.log(error))
  }

   useEffect(()=>
   {
     getdata()
   },[])
    
  return (
    <div className="Share">
       <div className="container">
       <div className="top">
       <img src={img} alt=''/>
       <input value={inputstr} type="text" placeholder="what's in your mind ?" onChange={(e)=>setinputstr(e.target.value)}></input>
       
       </div>
       <hr className="ligne"/>
       {image &&(
            <div className="postimage">
                <ClearIcon htmlColor='red' onClick={()=>setimage(null)}/>
                 <img src={image.image} alt=''/>
            </div>
       )}
       {video&&(
            <div className="postvideo">
                <ClearIcon htmlColor='red' onClick={()=>setvideo(null)}/>
                <video src={video.video}></video>
            </div>
       )}
       <div className="bottom">
       <div className="option">
       <div className="op">
       <ImageIcon htmlColor='tomato' className="icon" onClick={()=>imageref.current.click()}/>
          <span style={{color:"tomato"}}>Photo</span>
       </div>
       <div className="op" >
       <VideoCameraBackIcon htmlColor='blue' className="icon" onClick={()=>videoref.current.click()}/>
          <span style={{color:"blue"}}>video</span>
       </div>
       <div className="op">
       <EmojiEmotionsIcon htmlColor='goldenrod' className="icon"onClick={()=>setshow(val=>!val)}/>
          <span style={{color:"goldenrod"}} >emoji</span>
       </div>
      
       </div>
       <div className="btn">
      
      <input type="submit" value="share" onClick={addpost}></input>
      <div style={{display:"none"}}>
      <input type="file" ref={imageref} onChange={changeimage}/>
    </div>
    <div style={{display:"none"}}>
      <input type="file" ref={videoref} onChange={changevideo}/>
    </div>
   
       
           
          
       </div>
       </div>
      
        
        <div className="picker" >
            {show &&(<Picker onEmojiClick={addemoji}/>)}
        </div>
      
      
       </div>
    </div>
  );
}

export default Share;
