import axios from "axios"
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux"
import { removeFeed } from "../utils/feedSlice";

const FeedCard = ({user}) => {
    const {_id, firstName, lastName, photoURL, about, age, gender} = user;
    const dispatch = useDispatch();
    const handleFeed = async(status, userId) => {
      try{
        await axios.post(BASE_URL + "request/send/" +status+ "/" + userId, {}, {withCredentials:true});
        dispatch(removeFeed(userId))
      }
      catch(err){
        console.log(err)
      }
    }
  return (
    <div className="flex justify-center my-20">
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img
            src= {photoURL}
            alt="Profile Photo"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " "+ lastName}</h2>
          {about && <p>About: {about}</p>}
          {gender && <p>Gender: {gender}</p>}
          {age && <p>Age: {age}</p>}
          <div className="flex justify-between">
          <div className="card-actions justify-end">
            <button className="btn btn-secondary" onClick={() => handleFeed("intrested", _id)}>intrested</button>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={() => handleFeed("ignored", _id)}>ignore</button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
