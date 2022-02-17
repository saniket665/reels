import React, {useState, useEffect, useContext} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import insta from "../Assets/Instagram.JPG"
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {Link, useHistory} from "react-router-dom";
import { makeStyles } from '@mui/styles';
import "./Signup.css"
import Alert from '@mui/material/Alert';
import {AuthContext} from "../Context/AuthContext.js";
import {storage, database} from "../firebase";


function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] =  useState("");
    const {signup} = useContext(AuthContext);
    const history = useHistory();
    const useStyles = makeStyles({
        text1: {
            color: "grey",
            textAlign: "center"
        }, 
        card2: {
            height: "8vh",
            marginTop: "3%"
        }
    });
    const classes = useStyles();
    const handleClick = async() => {
        if(file === null) {
            setError("Please upload your profile image.")
            setTimeout(()=>{
                setError("");
            }, 2000)
            return;
        }
        try {
            setError("");
            setLoading(true);
            let userObj = await signup(email, password);
            let uid = userObj.user.uid;
            let uploadTask = storage.ref(`users/${uid}/ProfileImage`).put(file);
            uploadTask.on("state_changed", fn1, fn2, fn3);
            function fn1(snapshot) {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress} is done.`); 
            }

            function fn2(err) {
                setError(err);
                setTimeout(()=>{
                    setTimeout("");
                }, 2000)
                return;
            }

            function fn3() {
                uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
                    database.users.doc(uid).set({
                        email: email,
                        userId: uid,
                        fullname: name,
                        profileURL: url,
                        createdAt: database.getTimeStamp() 
                    })
                })
                setLoading(false);
                history.push("/");
            }

        }
        catch(err) {
            setError(err);
            setTimeout(()=>{
                setError("");
            }, 2000)
        }
    }
    return (
        <div className="signupwrapper">
            <div className='signupcard'>
                <Card variant="outlined">
                <div className="insta-logo">
                    <img src={insta} />
                </div>
                <CardContent>
                <Typography variant="subtitle1" component="div" className={classes.text1}>
                    Signup to see photos and videos from your friends
                </Typography>
                {error !== "" && <Alert severity="error">{error}</Alert>}
                <TextField id="outlined-basic" label="Outlined" variant="outlined" margin="dense" value={email} onChange={(e)=>setEmail(e.target.value)} fullWidth={true} label="Email" size="small" />
                <TextField id="outlined-basic" label="Outlined" variant="outlined" margin="dense" value={password} onChange={(e)=>setPassword(e.target.value)} fullWidth={true} label="Password" size="small" />
                <TextField id="outlined-basic" label="Outlined" variant="outlined" margin="dense" fullWidth={true} value={name} onChange={(e)=>setName(e.target.value)} label="Full Name" size="small" />
                <Button color="secondary" fullWidth={true} variant="outlined" margin="dense" startIcon={<CloudUploadIcon />} component = "label" onchange={(e)=>setFile(e.target.files[0])}>
                            Upload Profile Image
                            <input type="file" accept="image/*" hidden onChange={(e)=>setFile(e.target.files[0])}/>
                        </Button>
                </CardContent>
            <CardActions>
                <Button size="medium" color="primary" fullWidth={true} variant="contained" onClick={handleClick} disabled={loading}>
                Sign Up
                </Button>
            </CardActions>
            <CardContent>
                <Typography variant="subtitle1" component="div" className={classes.text1}>
                    By signing up, you agree to our Terms, Conditions and Cookies Policy.
                </Typography>
            </CardContent>
            </Card>
            <Card variant="outlined" className={classes.card2}>
                <CardContent>
                    <Typography variant="subtitle1" className={classes.text1}>
                        Having an accout ? <Link to="Login" style={{textDecoration:"none"}}>Login</Link>
                    </Typography>
                </CardContent>
            </Card>
            </div>
        </div>
    )
}

export default Signup
