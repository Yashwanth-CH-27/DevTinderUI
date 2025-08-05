import { useState } from "react";
import Header from "./Header";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [ emailId, setEmailId ] = useState(""); //yaswanth@gmail.com
  const [ password, setPassword ] = useState(""); //Yaswanth@123
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true)
  const [errMessage, setErrMeesage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user)

  const handleLogIn = async () => {
    try {
      if(user) return navigate("/")
      const res = await axios.post( BASE_URL + "login", {
        emailId,
        password,
      }, {withCredentials: true});
      dispatch(addUser(res.data))
      return navigate("/")
    } catch (err) {
      setErrMeesage(err?.response?.data)
      console.log(err);
    }
  };
  const handleSignUp = async() => {
    try{
    const res  = await axios.post(BASE_URL + "signUp", {firstName, lastName, emailId, password}, {withCredentials:true});
    dispatch(addUser(res?.data))
    return navigate("/profile")
    }
    catch(err){
      setErrMeesage(err?.response?.data)
    }
  }
  return (
    <div className="flex justify-center my-20">
      <div className="card card-dash bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title">{isLogin ? "Login" : "Sign Up"}</h2>
          {!isLogin &&<fieldset className="fieldset">
            <legend className="fieldset-legend">First Name</legend>
            <input
              value={firstName}
              type="text"
              className="input"
              placeholder="Enter your first name"
              onChange = {(e) => setFirstName(e.target.value)}
            />
          </fieldset>}
          {!isLogin && <fieldset className="fieldset">
            <legend className="fieldset-legend">Last Name</legend>
            <input
              value={lastName}
              type="text"
              className="input"
              placeholder="Enter your last name"
              onChange = {(e) => setLastName(e.target.value)}
            />
          </fieldset>}
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
          <div className="card-actions py-5 mx-auto">
            <p className="text-red-700">{errMessage}</p>
            <button className="btn btn-primary" onClick={isLogin? handleLogIn : handleSignUp}>{isLogin ? "Log In": "Sign Up"}</button>
          </div>
          <div>
            <p className="cursor-pointer text-center" onClick={() => setIsLogin((value) => !value) }>{isLogin ? "New User? Sign Up" : "Existing User? Login"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
