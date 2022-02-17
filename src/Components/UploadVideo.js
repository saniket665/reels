import React, {useState} from 'react';
import Button from '@mui/material/Button';
import {database, storage} from "../firebase";
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import MovieIcon from '@mui/icons-material/Movie';
import {v4 as uuidv4} from "uuid";


function UploadVideo(props) {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const handleChange = (file) => {
        if(file === null) {
            setError("Please upload a file");
            setTimeout(()=>{
                setError("");
            }, 2000)
            return;
        }
        if(file.size / (1024 * 1024) > 100 ) {
            setError("File is too big. Please upload file less than of size 100mb.");
            setTimeout(()=>{
                setError("");
            }, 2000)
            return;
        }
        setLoading(true);
        let uid = uuidv4();
        const uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file);
        uploadTask.on("state_changed", fn1, fn2, fn3);
        function fn1(snapshot) {
            let progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
            console.log(`Upload Task is ${progress} done.`);
        }

        function fn2(err) {
            setError(err);
            setTimeout(()=>{
                setError("");
            }, 2000)
            setLoading(false);
        }

        function fn3() {
            uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
                console.log(url);
                let obj = {
                    likes: [],
                    comments: [],
                    pId: uid,
                    pURL: url,
                    uName: props.user.fullname,
                    uProfile: props.user.profileURL,
                    userId: props.user.userId,
                    createdAt: database.getTimeStamp()
                }
                database.posts.add(obj).then(async(ref)=>{
                    let res = await database.users.doc(props.user.userId).update({
                        postIds: props.user.postIds != null ? [...props.user.postIds, ref.id] : [ref.id]
                    })
                }).then(()=>{
                    setLoading(false);
                }) 
            }).catch((err) => {
                setError(err);
                setTimeout(()=>{
                    setError("");
                }, 2000)
                setLoading(false);
            })
        }
    }
    
    return (
        <div style={{marginTop: "6%", marginBottom: "1%"}}>
            { error !== "" ? <Alert severity="error">{error}</Alert> : 
            <>
            <input type="file" accept='video/*' id="input-video" style={{display: "none"}} onChange={(e)=>handleChange(e.target.files[0])}/>
            <label htmlFor="input-video">
            <Button variant="outlined" color="secondary" component="span" disabled={loading}><MovieIcon color="secondary"/> &nbsp; Upload Video</Button>
            {loading &&  <LinearProgress color="secondary" style={{marginTop: "0.1rem"}} />}
            </label>
            </>
            }
        </div>
    )
}

export default UploadVideo
