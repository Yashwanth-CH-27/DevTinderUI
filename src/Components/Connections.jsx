import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/connectionsSlice";
import { useEffect } from "react";


const Connections = () => {
    const dispatch = useDispatch();
    const connectionsData = useSelector(store => store.connections);
    const getCntData = async () => {
        try{
            const res  = await axios.get(BASE_URL + "user/connections", {withCredentials:true});
            dispatch(addConnections(res?.data?.data))
            console.log(res?.data?.data)
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect( () => {
        getCntData()
    }, [] )
    if(!connectionsData) return

    if(connectionsData.length === 0) return <h1 className="font-bold text-xl text-center m-10">No Connections!</h1>
  return (
    <div className="text-center m-2">
        <h1 className="font-bold text-2xl">Your Connections</h1>
    {connectionsData.map((cnt, index) => {
        const {firstName, lastName, age, gender, photoURL, about} = cnt
        return(
            <div key={index} className="flex bg-gray-600 w-1/2 mx-auto mt-10 mb-10 rounded-2xl">
                <div className="p-3">
                    <img className="w-20 h-20 rounded-full" src={photoURL}/>
                </div>
                <div className="text-left p-4">
                    <h1 className="font-bold text-lg">{firstName + " "+ lastName}</h1>
                    {age && gender && <p>Age: {age}, Gender: {gender}</p>}
                    <p>{about}</p>
                </div>
            </div>
        )
    })}
    </div>
  )
}

export default Connections