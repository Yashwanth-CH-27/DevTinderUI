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
      if(feed) return
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
  return (
    feed && (
      <div>
        <FeedCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
