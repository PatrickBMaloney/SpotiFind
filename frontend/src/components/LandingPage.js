import React from 'react';
import "../../static/css/index.css";
import SpotifindLogo from "../../static/SpotifindLogo.svg";
import Landing from "../../static/landing.jpg";

export default function LandingPage() {
    return(
        <div>
            <div className="half">
                <img src={Landing} alt="" className="landing-page-image"/>
            </div>
            <div className="login half center-text">
                <img src={SpotifindLogo} className="landing-page-logo"/>
                <div className="center-text slogan">A playlist says a thousand words.</div>
                <div className="center-text primary-button login-button"> Login with Spotify </div>
            </div>
        </div>
    );
}