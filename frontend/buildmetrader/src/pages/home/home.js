import { createContext, useEffect, useState } from "react";
import profileimg from "./images/defaultprofileimg.jpg";
import AddStock from "./components/addStock";
import Profile from "./components/Profile";
import WatchList from "./components/watchlist";
import axios from "axios";
import News from "./components/news";

const watchlist = [
  {
    name: "Bitcoin",
    link: "https://www.tradingview.com/chart/BH1RoLpC/?symbol=BITSTAMP%3ABTCUSD",
  },
  {
    name: "Etherium",
    link: "https://www.tradingview.com/chart/BH1RoLpC/?symbol=BITSTAMP%3ABTCUSD",
  },
  {
    name: "Nifty50",
    link: "https://www.tradingview.com/chart/BH1RoLpC/?symbol=BITSTAMP%3ABTCUSD",
  },
  {
    name: "Bank Nifty",
    link: "https://www.tradingview.com/chart/BH1RoLpC/?symbol=BITSTAMP%3ABTCUSD",
  },
];

const PostContextHome = createContext();

function Home() {
  const [mywatch, setmywatch] = useState([]);
  const [Add, setAdd] = useState(false);
  const userID = JSON.parse(localStorage.getItem("user")).id;

  useEffect(() => {
    const fetchwatchList = async () => {
      const newList = await axios.get(
        `http://localhost:5000/watchlist/${userID}`
      );
      setmywatch(newList.data);
      console.log(newList.data);
    };

    fetchwatchList();
  }, []);

  function addNewWatch(stock) {
    setmywatch((mywatch) => [...mywatch, stock]);

    setAdd(false);
  }

  return (
    <PostContextHome.Provider
      value={{
        profileimg,
        watchlist: mywatch,
        addNewWatch,
        setmywatch,
        userID,
      }}
    >
      <div className="grid grid-cols-12 divide-x-2">
        <div className="col-span-3 flex flex-col">
          <WatchList />
          {Add && <AddStock addNewWatch={addNewWatch} />}
          <div className="flex justify-end mx-10 my-5">
            <button
              className="mx-5 px-5 py-2 font-medium rounded-full hover:text-lg hover:shadow-lg"
              onClick={() => setAdd(!Add)}
            >
              {Add ? "CLOSE" : "ADD"}
            </button>
          </div>
        </div>
        {/* <Profile profileimg={profileimg} /> */}
        <News />
      </div>
    </PostContextHome.Provider>
  );
}

export default Home;
export { PostContextHome };
