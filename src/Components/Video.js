import React from 'react'
import "./Video.css";
import ReactDOM from "react-dom";

function Video(props) {
    const handleMute = (e) => {
        e.target.muted = !e.target.muted;
    }

    const handleNext = (e) => {
        let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling;
        if(next) {
            next.scrollIntoView();
            e.target.muted = true;
        }

    }
    return (
            <video src={props.src} onEnded={handleNext} className='video-styling' muted="muted" onClick={handleMute}>
            </video>
    )
}

export default Video
