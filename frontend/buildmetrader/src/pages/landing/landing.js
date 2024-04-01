import { useNavigate } from "react-router-dom";
import stock from "./images/stock_chart.jpeg";
import News from "./landingnews";

function Landing() {
  const navigate = useNavigate();

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
        <div className="border border-white opacity-70 rounded-lg p-4 mt-10">
          <div>Enter Email</div>
          <input
            type="email"
            name="email"
            className="bg-transparent border border-white rounded-lg "
          />
          <div>Password</div>
          <input
            type="password"
            name="password"
            className="bg-transparent border border-white rounded-lg"
          />
          <br />
          <div className="flex justify-between mt-2">
            <button onClick={() => navigate("/home")}>Login</button>
            <button>Sign Up</button>
          </div>
        </div>
      </div>
      <News />
    </div>
  );
}

export default Landing;
