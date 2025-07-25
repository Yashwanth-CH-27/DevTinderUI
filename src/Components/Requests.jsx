import axios from "axios";
import {useDispatch, useSelector} from "react-redux"
import { BASE_URL } from "../utils/constants";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
    const dispatch = useDispatch();
    const reqData = useSelector(store => store.requests);
    const reviewReq = async (status,id) => {
      try{
        await axios.post(BASE_URL + "request/review/" + status + "/" + id, {}, {withCredentials:true});
        dispatch(removeRequest(id))
      }
      catch(err){
        console.log(err)
      }
    }
    const getReq = async() => {
      try{
        const res = await axios.get(BASE_URL + "user/request/received", {withCredentials:true});
        console.log(res?.data)
        dispatch(addRequest(res?.data))
      }
      catch(err){
        console.log(err)
      }
    }
    useEffect( () => {
      getReq()
    }, [] )
     if(!reqData) return

    if(reqData.length === 0) return <h1 className="font-bold text-xl text-center m-10">No Requests!</h1>
  return (
        <div className="text-center m-2">
        <h1 className="font-bold text-2xl">Your Connections</h1>
    {reqData.map((req, index) => {
        const {_id, firstName, lastName, age, gender, photoURL, about} = req.fromUserId
        return(
            <div key={index} className="flex justify-between items-center bg-gray-600 w-5/12 mx-auto mt-10 mb-10 rounded-2xl">
                <div className="p-3">
                    <img className="w-20 h-20 rounded-full" src={photoURL}/>
                </div>
                <div className="text-left p-4">
                    <h1 className="font-bold text-lg">{firstName + " "+ lastName}</h1>
                    {age && gender && <p>Age: {age}, Gender: {gender}</p>}
                    <p>{about}</p>
                </div>
                <div className="flex gap-2 mx-2">
                    <button className="btn btn-primary" onClick={() => reviewReq("accepted",req._id)}>Accept</button>
                    <button className="btn btn-secondary" onClick={() => reviewReq("rejected",req._id)}>Reject</button>
                </div>
            </div>
        )
    })}
    </div>
    
  )
}

export default Requests