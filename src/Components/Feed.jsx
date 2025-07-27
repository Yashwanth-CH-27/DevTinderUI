import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import FeedCard from "./FeedCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const getFeedData = async () => {
    try {
      const res = await axios.get(BASE_URL + "feed", {withCredentials: true});
      dispatch(addFeed(res?.data));
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getFeedData();
  }, []);
  if(!feed) return;
  if(feed.length <= 0) return <h1 className="flex justify-center my-10 font-bold">No users found!</h1>
  return (
    feed && (
      <div>
        <FeedCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
