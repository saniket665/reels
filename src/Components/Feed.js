import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../Context/AuthContext.js";
import Button from '@mui/material/Button';
import {useHistory} from "react-router-dom";
import UploadVideo from "./UploadVideo";
import {database} from "../firebase";
import Posts from './Posts.js';
import Navbar from "./Navbar"

function Feed() {
    const {user, logout} = useContext(AuthContext);
    const [userData, setUserData] = useState("");
    useEffect(()=>{
        const unsub = database.users.doc(user.uid).onSnapshot((snapshot)=>{
            setUserData(snapshot.data());
        })
        return () => {
            unsub();
        }
    }, [user])
    return (
        <>
        <Navbar userData = {userData} />
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
            <div style={{width: "50%"}}>
            {/* <h3>Welcome to my feed.</h3>
            <Button variant="outlined" onClick={logout}>Logout</Button> */}
            </div>
            <UploadVideo user = {userData}/>
            <Posts userData = {userData}/>
        </div>
        </>
    )
}

export default Feed
