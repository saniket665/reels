import React, {useState, useContext} from 'react';
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
import "./Login.css"
import Alert from '@mui/material/Alert';
import bg from "../Assets/insta.png";
import { CarouselProvider, Slider, Slide, Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import img1 from "../Assets/img1.jpg";
import img2 from "../Assets/img2.jpg";
import img3 from "../Assets/img3.jpg";
import img4 from "../Assets/img4.jpg";
import img5 from "../Assets/img5.jpg";
import {AuthContext} from "../Context/AuthContext.js"



function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const {login} = useContext(AuthContext);
    const history = useHistory();
    const useStyles = makeStyles({
        text1: {
            color: "grey",
            textAlign: "center"
        }, 
        card2: {
            height: "8vh",
            marginTop: "3%"
        },
        text2: {
            textAlign: "center"
        }
    });
    const classes = useStyles();
    const handleLogin = async() => {
        try {
            setLoading(true);
            setError("");
            let res = await login(email, password);
            setLoading(false);
            history.push("/");
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
        <div className="Loginwrapper">
            <div className="img-card" style={{background: "url(" + bg + ")"}}>
                <div className="card">
                <CarouselProvider
                    visibleSlides={1}
                    naturalSlideWidth={248}
                    naturalSlideHeight={440}
                    totalSlides={5}
                    hasMasterSpinner
                    isPlaying={true}
                    infinite={true}
                    dragEnabled={false}
                    touchEnabled={false}
                >
                    <Slider>
                    <Slide index={0}><Image src={img1} /></Slide>
                    <Slide index={1}><Image src={img2}/></Slide>
                    <Slide index={2}><Image src={img3}/></Slide>
                    <Slide index={3}><Image src={img4}/></Slide>
                    <Slide index={4}><Image src={img5}/></Slide>
                    </Slider>
                </CarouselProvider>

                </div>
            </div>
            <div className='Logincard'>
                <Card variant="outlined">
                <div className="insta-logo">
                    <img src={insta} />
                </div>
                <CardContent>
                {error != "" && <Alert severity="error">{error}</Alert>}
                <TextField id="outlined-basic" label="Outlined" variant="outlined" margin="dense" fullWidth={true} label="Email" size="small" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <TextField id="outlined-basic" label="Outlined" variant="outlined" margin="dense" fullWidth={true} label="Password" size="small" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <Typography variant="subtitle1" color= "primary" className={classes.text2}> <Link to = "forgotpassword">Forgot Password ?</Link></Typography>
                </CardContent>
            <CardActions>
                <Button size="medium" color="primary" fullWidth={true} variant="contained" onClick={handleLogin}>
                Login
                </Button>
            </CardActions>
            </Card>
            <Card variant="outlined" className={classes.card2}>
                <CardContent>
                    <Typography variant="subtitle1" className={classes.text1}>
                        Don't have an account ? <Link to="Signup" style={{textDecoration:"none"}}>Signup</Link>
                    </Typography>
                </CardContent>
            </Card>
            </div>
        </div>
    )
}

export default Login
