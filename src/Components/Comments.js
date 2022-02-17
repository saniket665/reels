import React, {useState, useEffect} from 'react';
import Posts from './Posts';
import {database} from "../firebase";
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';

function Comments({postData}) {
    const [comments, setComments] = useState(null);
    useEffect(async()=>{
        let arr = []
        for(let i = 0; i < postData.comments.length; i++) {
            let data = await database.comments.doc(postData.comments[i]).get();
            arr.push(data.data());
        }
        setComments(arr);
    }, [postData])
    return (
        <div>
            {comments === null ? <CircularProgress /> : 
            <div style={{paddingLeft: "1rem", paddingTop: "0.4rem"}}>
                {
                    comments.map((comment, index)=>(
                        <div style={{display: "flex"}}>  
                            <Avatar alt="Remy Sharp" src={comment.userProfile} />
                            <p style={{marginTop: "0.7rem"}}>&nbsp; <span style={{fontWeight: "bold"}}>{comment.uName}</span> &nbsp;&nbsp;{comment.text}</p>
                        </div>
                    ))
                }
            </div>
            }

        </div>
    )
}

export default Comments
