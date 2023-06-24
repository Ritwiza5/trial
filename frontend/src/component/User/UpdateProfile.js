import React,{Fragment,useState,useEffect} from 'react';
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import profile from "../../images/profile.png";
import {useDispatch,useSelector} from "react-redux";
import {useAlert} from "react-alert";
import{clearErrors,updateProfile,loadUser} from "../../actions/userAction";
import {UPDATE_PROFILE_RESET} from "../../constants/userConstant.js";
import MetaData from "../layout/MetaData";

const UpdateProfile = ({history}) => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const {user}=useSelector((state)=>state.user);
    const{error,isUpdated,loading}=useSelector((state)=>state.profile);
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[avatar,setAvatar]=useState(profile);
    const[avatarPreview,setAvatarPreview]=useState(profile);


    const updateProfileSubmit=(e)=>{
        e.preventDefault();

        const myForm=new FormData(); //forming data

        myForm.set("name",name);
        myForm.set("email",email);
        myForm.set("avatar",avatar);
        dispatch(updateProfile(myForm));
    };

    const updateProfileDataChange=(e)=>{
        if(e.target.name==="avatar"){
            const reader=new FileReader(); //to read file

            reader.onload=()=>{
               if (reader.readyState===2){//3 states hoti hai initial processing and final 2 for final
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
               }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    useEffect(()=>{
        if(user){
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }  
    if(isUpdated){
        alert.success("Profile Updated Successfully");
        dispatch(loadUser()); //to load the fresh data
        history.push("/account");
        dispatch({
            type:UPDATE_PROFILE_RESET,
        });
    }},[dispatch,alert,history,isUpdated,user,error]
    )
  return (
    <Fragment>
        {loading?(<Loader/>) :
        <Fragment>
        <MetaData title="Update Profile" />
    <div className="updateProfileContainer">
        <div className="updateProfileBox">
            <h2>Update Profile</h2>
        <form 
                className="updateProfileForm"
                encType="multipart/form-data" //mandatory to add coz we not only use string but also upload images
                onSubmit={updateProfileSubmit}
                >
                 <div className="updateProfileName">
                   <FaceIcon /> 
                   <input
                   type="text"
                   placeholder="Name"
                   required
                   name="name"
                   value={name}
                   onChange={(e)=>setName(e.target.value)}
                    />
                    </div>
                    <div className="updateProfileEmail">
                    <MailOutlineIcon/>
                    <input type="email"
                    placeholder="Email"
                    required 
                    name="email"
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)} />
                    </div> 
                        <div id="updateProfileImage">
                            <img src={avatarPreview} alt="Avatar Preview" />
                          <input type="file"
                          name="avatar"
                          accept="image/*"
                          onChange={updateProfileDataChange}
                          />
                           </div>  
                           <input type="submit" value="Update" className="updateProfileBtn" /> 
                </form>
        </div>
        </div>
        </Fragment>
        }
    </Fragment>
  )
}

export default UpdateProfile;