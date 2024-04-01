import { useContext, useState } from "react";
import { PostContextHome } from "../home";

function WatchList() {
  const { watchlist } = useContext(PostContextHome);

  return (
    <>
      <div className="text-2xl m-7 font-bold">WatchList</div>
      <div>
        <ul>
          {watchlist.map((watch) => (
            // <li>
            //   <a href={watch.link}>{watch.name}</a>
            // </li>
            <Stock watch={watch} />
          ))}
        </ul>
      </div>
    </>
  );
}

function Stock({ watch }) {
  const [update, setUpdate] = useState(false);
  const { watchlist, setmywatch } = useContext(PostContextHome);

  function deleteStock(e) {
    console.log("hi", e.target.value);
    const newWatch = watchlist.filter((stock) => {
      // console.log(stock.name !== e.target.value);
      return stock.name !== e.target.value;
    });
    // console.log(newWatch);
    setmywatch(newWatch);
  }

  return (
    <div className="flex mx-5 my-3 px-5 font-medium rounded-md hover:shadow-xl">
      {update ? (
        <Update watch={watch} setUpdate={setUpdate} />
      ) : (
        <div className="grow flex justify-between">
          <a href={watch.link} className="">
            {watch.name}
          </a>
          <button
            onClick={deleteStock}
            value={watch.name}
            className="m-4 hover:text-lg"
          >
            X
          </button>
        </div>
      )}
      <button className="mx-5 hover:text-lg" onClick={() => setUpdate(!update)}>
        {update ? "Cancel" : "Update"}
      </button>
    </div>
  );
}

function Update({ watch, setUpdate }) {
  const { watchlist, setmywatch } = useContext(PostContextHome);
  const [obj, setObj] = useState({ name: watch.name, link: watch.link });

  function handleUpdate(e) {
    console.log(obj);

    const newlist = watchlist.map((watch) => {
      console.log(watch.name, " === ", obj.name);

      return watch.name === obj.name ? { ...watch, ["link"]: obj.link } : watch;
    });
    console.log(newlist);
    setmywatch(newlist);
    setUpdate((v) => !v);
  }

  function handleChange(e) {
    // const { name, link } = e.target;
    // console.log(e.target.value, e.target.name);
    setObj((prevObj) => ({ ...prevObj, ["link"]: e.target.value }));
    // console.log(obj);
  }

  return (
    <div className="grow flex justify-start my-5">
      <p className="mx-5">{watch.name}</p>
      <input
        type="text"
        name={watch.name}
        value={obj.link}
        onChange={handleChange}
        className="mx-5 grow font-normal"
      />
      <button onClick={handleUpdate} className="mx-5 hover:text-lg">
        done
      </button>
    </div>
  );
}

export default WatchList;
