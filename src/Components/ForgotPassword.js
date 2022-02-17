import React, {useContext, useState} from 'react';
import TextField from '@mui/material/TextField';
import insta from "../Assets/Instagram.JPG";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import "./forgotPassword.css";
import {AuthContext} from "../Context/AuthContext";
import Alert from '@mui/material/Alert';
import {useHistory} from "react-router-dom";


function ForgotPassword() {
    const [email, setEmail] = useState(""); 
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const {PasswordReset} = useContext(AuthContext);
    const history = useHistory();
    const handleClick = async() => {
        try { 
            setLoading(true);
            setError("");
            await PasswordReset(email).then(()=>{
                console.log("Mail Send");
            });
            setLoading(false);
            history.push("/login");
        }
        catch(err) {
            setError(err);
            setTimeout(()=>{
                setError("");
            }, 2000)
            setLoading(false);
        }
    }
    return (
        <div className="wrapper">
            <div className="forgotpasscard">
            <Card variant='outlined'>
                <div className="insta-logo">
                    <img src={insta} alt="" />
                </div>
                {error != "" && <Alert severity="error">{error}</Alert>}
                <CardContent>
                <Typography variant="subtitle1">Please enter your email to request a password reset</Typography>
                <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} size="small" margin='dense' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </CardContent>
                <CardActions>
                    <Button color="primary" variant="contained" fullWidth={true} size="medium" onClick={handleClick}>
                        Reset Password
                    </Button>
                </CardActions>
            </Card>
            </div>
        </div>
    )
}

export default ForgotPassword;
