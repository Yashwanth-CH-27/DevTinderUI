import { useState } from "react";
import Header from "./Header";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [ emailId, setEmailId ] = useState("yaswanth@gmail.com");
  const [ password, setPassword ] = useState("Yaswanth@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogIn = async () => {
    try {
      const res = await axios.post( BASE_URL + "login", {
        emailId,
        password,
      }, {withCredentials: true});
      dispatch(addUser(res.data))
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center my-20">
      <div className="card card-dash bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email ID</legend>
            <input
              value={emailId}
              type="email"
              className="input"
              placeholder="sample@something.com"
              onChange = {(e) => setEmailId(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              value={password}
              type="password"
              className="input"
              placeholder="Enter your password"
              onChange = {(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <div className="card-actions justify-center py-5">
            <button className="btn btn-primary" onClick={handleLogIn}>Log in</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
