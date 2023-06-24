import React from 'react';
import "./contact.css";
import {Button} from "@material-ui/core";


const contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:ritwiza2002@gmail.com">
        <Button>Contact:ritwiza2002@gmail.com</Button>
        </a>
    </div>
  );
};

export default contact;