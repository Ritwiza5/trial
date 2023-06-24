import React from 'react';
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import instagram from"../../../images/instagram.png";
import twitter from "../../../images/twitter.png";
import "./Footer.css"

const Footer = () => {
  return (
     <footer id="footer">
<div className="leftFooter">
    <h4>DOWNLOAD OUR APP</h4>
    <p>Download App for Android and IOS mobile phone</p>
    <img src={playStore} alt="playstore" />
    <img src={appStore} alt="appstore" />
</div>

<div className="midFooter">
    <h1>HOME EASE</h1>
    <p>Everything at your doorsteps.😊</p>
    <p>Copyrights 2023 &copy; Ritwiza Tomar</p>
</div>

<div className="rightFooter">
    <h4>Follow  Us</h4>
    <a href="http://instagram.com/ritwiza_tomar?igshid=ZDdkNTZiNTM="><img src={instagram} alt="instagram" /></a>
    <a href="https://twitter.com/Ritwiza_Tomar?s=09"><img src={twitter} alt="twitter" /></a>
</div>
</footer>
  );
};

export default Footer