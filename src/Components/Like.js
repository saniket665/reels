import React, {useState, useEffect} from 'react';
import {database} from "../firebase";
import FavoriteIcon from '@mui/icons-material/Favorite';

function Like({userData, postData}) {
    const [like, setLike] = useState(null);
    useEffect(()=>{
        let check = postData.likes.includes(userData.userId) ? true : false;
        setLike(check);
    }, [postData])

    const handleLike = () => {
        if(like === true) {
            let narr = postData.likes.filter((el)=> el != userData.userId);
            database.posts.doc(postData.postId).update({
                likes: [...narr]
            })
        }
        else {
            let narr = [...postData.likes, userData.userId];
            database.posts.doc(postData.postId).update({
                likes: narr
            })
        }
    }
    return (
        <>
        {
            like !== null ? 
            <>
            {like === true ? <FavoriteIcon className="like icon-styling" onClick={handleLike}/> : <FavoriteIcon  className="unlike icon-styling" onClick={handleLike}/>}
            </> :
            <>
            </>
        }
        </>
    )
}

export default Like
