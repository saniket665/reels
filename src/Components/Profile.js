import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import { database } from '../firebase';
import Navbar from './Navbar';
import CircularProgress from '@mui/material/CircularProgress';
import "./Profile.css";
import AddComments from './AddComments';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Like2 from './Like2';
import Comments from './Comments';
import Avatar from '@mui/material/Avatar';
import Like from './Like';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Dialog from '@mui/material/Dialog';


function Profile() {
    const {id} = useParams();
    const [userData, setUserData] = useState(null);
    const [postData, setPostData] = useState(null);
    const [open, setOpen] = React.useState(null);

    const handleClickOpen = (id) => {
      setOpen(id);
    };
  
    const handleClose = () => {
      setOpen(null);
    };

    useEffect(()=>{
        database.users.doc(id).onSnapshot((snap)=>{
            setUserData(snap.data());
        })
    }, [id])

    useEffect(async()=>{
        if(userData != null) {
        let arr = [];
        for(let i = 0; i < userData?.postIds?.length; i++) {
            let data = await database.posts.doc(userData.postIds[i]).get();
            arr.push(data.data());
        }
        setPostData(arr);
    }
    }, [userData])
    return (
        <div>
            {
            userData === null || postData === null ? <CircularProgress /> :
            <>
            <Navbar userData = {userData} /> 
            <div className="spacer"></div>
            <div className="container">
                <div className="upperpart">
                    <div className="profile-img">
                        <img src={userData.profileURL} />
                    </div>
                    <div className="info">
                        <Typography variant="h5">
                            Email: {userData.email}
                        </Typography>
                        <Typography variant="h5">
                            Posts: {userData.postIds.length}
                        </Typography>
                    </div>
                </div>
                <hr style={{marginTop: "2rem", marginBottom: "2rem"}} />
                <div className="profile-videos">
                    {
                        postData.map((post,index)=>(
                            <React.Fragment key={index}>
                                {console.log(post)}
                                <div className="videos">
                                    <video muted="muted" onClick={()=>handleClickOpen(post.pId)}>
                                        <source src={post.pURL} />
                                    </video>
                                    <Dialog
                                        open={open === post.pId}
                                        onClose={handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                        fullWidth={true}
                                        maxWidth="md"
                                        sx={{marginTop: "2rem"}}
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
                                            <Typography style={{padding: "0.4rem"}}>{post.likes.length === 0 ? "" : `Liked by ${post.likes.length} user`}</Typography>
                                            <div style={{display: "flex"}}>
                                            <Like2 userData={userData} postData={post} style={{display: "flex", justifyContent: "center", alignItems: "center", width: "10%"}} /> 
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
            </div>
            </>
            }

        </div>
    )
}

export default Profile
