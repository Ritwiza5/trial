import React,{useEffect,Fragment} from 'react';
import Typewriter from "typewriter-effect";
import "./Home.css";
import WebFont from "webfontloader";
import Product from "./Product.js"
import Metadata from "../layout/MetaData";
import {getProduct} from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import {useSelector,useDispatch} from "react-redux"; //to trigger the action func
import {useAlert} from "react-alert";
import  Homee from  "../video/video1.mp4";


//useSelector used to render fetched data on screen
const Home = () => {
   
    React.useEffect(()=>{

        WebFont.load({
          google:{
            families:["Satisfy","Acme"]
          }
        })
      },[]);
      const alert=useAlert();
      const dispatch=useDispatch();
      const {loading,error,products}=useSelector(state=>state.products);
      useEffect(() => {
        if(error){
          return alert.error(error);
        }
        dispatch(getProduct());
      }, [dispatch,error,alert]);
      

      return ( 
     <Fragment>{loading?(<Loader/>):( <div>
       
      <Metadata title="HOMEEASE"/>
     
<div className="container">
<video autoPlay loop muted>
                <source src={Homee} type="video/mp4"/>
            </video>  
 {/* <div className="picture"><img src={home} alt="home" /></div>  */}
   <div className="banner">
   <p>Welcome To HomeEase</p>
  <h1>
  <Typewriter 
  options={{strings:["Find the latest products","Quality At Its Best"],
  autoStart:true,
  loop:true,
}}
/>
</h1>
  
     <a href="#container"><button className="mainButton">Scroll 🖱️</button></a>
  </div>
</div>
<div className="cards">
<h2 className="homeHeading">Featured Products</h2>
  <div className="container2" id="container">
     {/* <Product product={product} />
      <Product product={product} />
      <Product product={product} />
      <Product product={product} />
      <Product product={product} />
      <Product product={product} />
      <Product product={product} />
      <Product product={product} /> */}

      {products && products.map(product=>(<Product product={product}/>))}
  </div>
  </div>
  </div>)}</Fragment>
      
     
  );
};

export default Home;