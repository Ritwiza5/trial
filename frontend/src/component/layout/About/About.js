import React from 'react';
import "./About.css";
import {Button,Typography,Avatar} from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import image from "../../../images/profile.jpg";

const About = () => {
    const visitInstagram=()=>{
window.location="https://instagram.com/ritwiza_tomar?igshid=MzNlNGNkZWQ4Mg=="
    };
  return (
    <div className="aboutSection">
        <div></div>
        <div className="aboutSectionGradient"></div>
        <div className="aboutSectionContainer">
            <Typography component="h1">About Us</Typography>
            <div>
                <div>
                    <Avatar 
                    style={{width:"10vmax", height:"10vmax", margin:"2vmax 0"}}
                    src=
                  {image}
                    alt="Founder"
                    />
                    <Typography> Ritwiza Tomar</Typography>
                    
                    <Button onClick={visitInstagram} color="secondary">Instagram Account</Button>
                <span>
                    A project made for learning.
                </span>
                </div>
                <div className="aboutSectionContainer2">
                    <Typography component="h2">Our Brands</Typography>
                    <a href="https://twitter.com/Ritwiza_Tomar?t=5UsoXqzosh7_5XtxvHfreA&s=09" target="blank"> 
                        <TwitterIcon className="Twitter" />
                        </a> 
                    <a href="https://instagram.com/ritwiza_tomar?igshid=MzNlNGNkZWQ4Mg==" target="blank"> 
                        <InstagramIcon className="Instagram" />
                        </a> 
                </div>
            </div>
        </div>
    </div>
  );
};

export default About;