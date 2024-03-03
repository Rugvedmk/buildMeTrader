import { useState } from "react";
import profileimg from "./images/defaultprofileimg.jpg";

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

function Home() {
  const [mywatch, setmywatch] = useState(watchlist);
  const [Add, setAdd] = useState(false);

  function addNewWatch(stock) {
    setmywatch((mywatch) => [...mywatch, stock]);

    setAdd(false);
  }

  return (
    <div className="grid grid-cols-12 divide-x-2">
      <Profile />
      <div className="col-span-9 flex flex-col">
        <WatchList watchlist={mywatch} />
        {Add && <AddStock addNewWatch={addNewWatch} />}
        <button onClick={() => setAdd(!Add)}>{Add ? "CLOSE" : "ADD"}</button>
      </div>
    </div>
  );
}

function AddStock({ addNewWatch }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !link) {
      alert("fill all the details");
      return;
    }

    const newStock = {
      name,
      link,
    };

    addNewWatch(newStock);
  }
  return (
    <form>
      <label>Name</label>
      <input type="text" onChange={(e) => setName(e.target.value)} />

      <label>Link</label>
      <input type="text" onChange={(e) => setLink(e.target.value)} />

      <button onClick={handleSubmit}>Add</button>
    </form>
  );
}

function Profile() {
  return (
    <div className="col-span-3 flex flex-col p-4">
      <div className="grid grid-rows-auto justify-items-center mb-4">
        <img src={profileimg} alt="image not found" />
        <div className="justify-center">Name</div>
      </div>
      <div>Email:asdnkj@sd.com</div>
      <div>Phone no.:1234567890</div>
    </div>
  );
}

function WatchList({ watchlist }) {
  const mywatch = watchlist;

  return (
    <>
      <div>WatchList</div>
      <div>
        <ul>
          {mywatch.map((watch) => (
            <li>
              <a href={watch.link}>{watch.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Home;
