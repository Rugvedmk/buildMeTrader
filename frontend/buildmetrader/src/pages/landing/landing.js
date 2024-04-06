import { useNavigate } from "react-router-dom";
import stock from "./images/stock_chart.jpeg";
import News from "./landingnews";
import { useEffect, useState } from "react";
import axios from "axios";

function Landing() {
  const navigate = useNavigate();
  const [login, setLogin] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/home");
    }
  }, []);

  return (
    <div>
      <div
        className="flex flex-col h-screen text-white  items-center"
        style={{ backgroundImage: `url(${stock})` }}
      >
        <div className="text-5xl pb-10 mb-10 mt-3 font-bold">
          CONSISTANT WINS ARE BETTER THAN BIG WINS!
        </div>
        <br />
        {login ? <Login navigate={navigate} setLogin={setLogin} /> : <Signup />}
      </div>
      <News />
    </div>
  );
}

function Login({ navigate, setLogin }) {
  const [loginfo, setloginfo] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setloginfo((previousdata) => ({ ...previousdata, [name]: value }));
  };

  const handleClick = async () => {
    // console.log(loginfo);
    let result = await axios.post("http://localhost:5000/login", loginfo);
    result = result.data._id;
    // console.log(result);

    if (result) {
      localStorage.setItem("user", JSON.stringify({ id: result }));
      navigate("/home");
    } else {
      alert("Please Enter Correcct User Name and password");
    }
  };

  return (
    <div className="border border-white opacity-70 rounded-lg p-4 mt-10">
      <div>Enter Email</div>
      <input
        type="email"
        name="email"
        onChange={handleInput}
        className="bg-transparent border border-white rounded-lg "
      />
      <div>Password</div>
      <input
        type="password"
        name="password"
        onChange={handleInput}
        className="bg-transparent border border-white rounded-lg"
      />
      <br />
      <div className="flex justify-between mt-2">
        <button onClick={handleClick}>Login</button>
        <button onClick={() => setLogin((l) => !l)}>Sign Up</button>
      </div>
    </div>
  );
}

function Signup() {
  const [signUpInfo, setsignUpInfo] = useState({
    email: "",
    name: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleInput = (e) => {
    const { name, value } = e.target;
    setsignUpInfo((previousdata) => ({ ...previousdata, [name]: value }));
    // console.log(signUpInfo);
  };

  const handleClick = async (signUpInfo) => {
    const result = await axios.post(
      "http://localhost:5000/register",
      signUpInfo
    );
    console.log(result.data);
    localStorage.setItem("user", JSON.stringify(result.data));
    navigate("/home");
  };

  return (
    <div className="border border-white opacity-70 rounded-lg p-4 mt-10">
      <div>Name</div>
      <input
        type="text"
        name="name"
        onChange={handleInput}
        className="bg-transparent border border-white rounded-lg"
      />
      <div>Enter Email</div>
      <input
        type="email"
        name="email"
        onChange={handleInput}
        className="bg-transparent border border-white rounded-lg "
      />
      <div>Password</div>
      <input
        type="password"
        name="password"
        onChange={handleInput}
        className="bg-transparent border border-white rounded-lg"
      />
      <br />
      <div className="flex justify-between mt-2">
        <button onClick={() => handleClick(signUpInfo)}>Sign Up</button>
      </div>
    </div>
  );
}

export default Landing;
