import React, {useEffect, useState} from 'react';
import {database} from "../firebase";
import CircularProgress from '@mui/material/CircularProgress';
import Video from './Video';
import "./Posts.css"
import Avatar from '@mui/material/Avatar';
import Like from './Like';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import AddComments from './AddComments';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Like2 from './Like2';
import Comments from './Comments';
function Posts({userData}) {
    const [posts, setPosts] = useState(null);
    const [open, setOpen] = React.useState(null);

    const handleClickOpen = (id) => {
      setOpen(id);
    };
  
    const handleClose = () => {
      setOpen(null);
    };
    useEffect(()=>{
        let parr = []
        const unsub = database.posts.orderBy('createdAt','desc').onSnapshot((querySnapshot)=>{
            parr=[]
            querySnapshot.forEach((doc)=>{
                let data = {...doc.data(),postId:doc.id}
                parr.push(data)
            })
            setPosts(parr);
        })
        return unsub
    },[])

    const callback = (entries) => {
        entries.forEach((entry)=>{
            let ele = entry.target.childNodes[0];
            ele.play().then(()=>{
                if(!ele.paused && !entry.isIntersecting) {
                    ele.pause();
                }
            })
        })
    }
    let observer = new IntersectionObserver(callback, {threshold: 0.6})
    useEffect(()=>{
        let elements = document.querySelectorAll(".videos");
        elements.forEach((element)=>{
            observer.observe(element);
        })
    }, [posts])

    return (
        <div>
            {
                posts==null || userData==null ? <CircularProgress /> :
                <div className="video-container">
                    {
                        posts.map((post,index)=>(
                            <React.Fragment key={index}>
                                <div className="videos">
                                    <Video src={post.pURL}/>
                                    <div className="fa" style={{display: "flex", alignItems: "center", width: "100%"}}>
                                        <Avatar alt={userData.fullname} src={userData.profileURL} />
                                        <h3>{userData.fullname}</h3>
                                    </div>
                                    <Like userData={userData} postData={post}/>
                                    <ChatBubbleIcon className="chat-styling" onClick={()=>handleClickOpen(post.pId)}/>
                                    <Dialog
                                        open={open === post.pId}
                                        onClose={handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                        fullWidth={true}
                                        maxWidth="md"
                                    >
                                        <div className="modal-container">
                                            <div className="video-modal">
                                                <video autoPlay={true} controls muted = "muted">
                                                    <source src={post.pURL}/>
                                                </video>
                                            </div>
                                            <div className="comment-modal">
                                            <Card className="card1" variant="outlined">
                                                <Comments postData={post}/>
                                            </Card>
                                            <Card className="card2" variant="outlined">
                                            <Typography style={{padding: "0.6rem"}}>{post.likes.length === 0 ? "" : `Liked by ${post.likes.length} user`}</Typography>
                                            <div style={{display: "flex"}}>
                                            <Like2 userData={userData} postData={post} style={{display: "flex", justifyContent: "center", alignItems: "center"}} /> 
                                            <AddComments userData = {userData} postData = {post} style={{display: "flex", justifyContent: "center", alignItems: "center"}} />
                                            </div>
                                            </Card>
                                            </div>
                                        </div>
                                    </Dialog>
                                </div>
                            </React.Fragment>

                        ))
            }
            </div>
}
        </div>
    )
}

export default Posts
