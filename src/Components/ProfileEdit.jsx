import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import FeedCard from "./FeedCard";

const ProfileEdit = ({user}) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoURL, setPhotoURL] = useState(user.photoURL || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about);
  const [errMessage, setErrorMessage] = useState("");
  const [toastMessage,setToastMessage] = useState(false);
  const dispatch = useDispatch();
  const hadleSave = async () => {
    setErrorMessage("");
    try{
        const res = await axios.patch(
        BASE_URL + "profile/edit",
        { firstName, lastName, photoURL, age, gender, about },
        { withCredentials: true }
        );
        dispatch(addUser(res.data))
        setToastMessage(true)
        setTimeout(()=>{
          setToastMessage(false)
        },3000)
    }catch(err){
        setErrorMessage(err?.response?.data)
        console.log(err)
    }
  };
  return (
    <div className="flex justify-center my-20 gap-30">
      <div className="card card-dash bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title">Edit your profile</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">FirstName</legend>
            <input
              value={firstName}
              type="text"
              className="input"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Last Name</legend>
            <input
              value={lastName}
              type="text"
              className="input"
              onChange={(e) => setLastName(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Photo URL</legend>
            <input
              value={photoURL}
              type="text"
              className="input"
              onChange={(e) => setPhotoURL(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Age</legend>
            <input
              value={age}
              type="text"
              className="input"
              onChange={(e) => setAge(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Gender</legend>
            <input
              value={gender}
              type="text"
              className="input"
              onChange={(e) => setGender(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">About</legend>
            <input
              value={about}
              type="text"
              className="input"
              onChange={(e) => setAbout(e.target.value)}
            />
          </fieldset>
          <div className="card-actions justify-center py-5">
            <p className="text-red-700">{errMessage}</p>
            <button className="btn btn-primary" onClick={hadleSave}>Save Profile</button>
          </div>
        </div>
      </div>
      <div>
        <p className="font-extrabold">This is how your profile looks like in others feed</p>
        <FeedCard user= {{firstName,lastName,age,photoURL,gender,about}}/>
      </div>
      {toastMessage && <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Edits saved successfully!!!</span>
        </div>
      </div>}
    </div>
  );
};

export default ProfileEdit;
