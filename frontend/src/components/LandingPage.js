import React from 'react';
import "../../static/css/index.css";
import SpotifindLogo from "../../static/Spotifind.svg";

export default function LandingPage() {
    return(
        <div>
            <div className="half">
                Image goes here
            </div>
            <div className="login half">
                <img src={SpotifindLogo} className="landing-page-logo"/>
                <div>Login here</div>
            </div>
        </div>
    );
}