import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {database} from "../firebase";
function AddComments({userData, postData}) {
    const [text, setText] = useState("");
    const handlePost = () => {
        let obj = {
            text: text,
            userProfile: userData.profileURL,
            uName: userData.fullname
        }
        database.comments.add(obj).then((doc)=>{
            database.posts.doc(postData.postId).update({
                comments: [...postData.comments, doc.id]
            })    
        })
        setText("");
    }

    return (
        <div style={{width: "100%"}}>
            <TextField id="outlined-basic" label="Comment" variant="outlined" sx={{width: "70%"}} size="small" value = {text} onChange={(e)=>setText(e.target.value)}/>
            <Button variant="contained" onClick={handlePost} style={{marginLeft: "0.4rem", marginTop: "1px"}}>Post</Button>
        </div>
    )
}

export default AddComments
