import { useContext, useEffect, useState } from "react";
import { PostContextHome } from "../home";
import axios from "axios";

function WatchList() {
  const { watchlist } = useContext(PostContextHome);

  return (
    <>
      <div className="text-2xl m-7 font-bold">WatchList</div>
      <div>
        <ul>
          {watchlist ? (
            watchlist.map((watch) => (
              // <li>
              //   <a href={watch.link}>{watch.name}</a>
              // </li>
              <Stock watch={watch} />
            ))
          ) : (
            <div className="font-medium">YOUR WATCHLIST IS EMPTY!</div>
          )}
        </ul>
      </div>
    </>
  );
}

function Stock({ watch }) {
  const [update, setUpdate] = useState(false);
  const { watchlist, setmywatch } = useContext(PostContextHome);

  const deleteStock = async (e) => {
    // console.log("hi", e.target.value);

    let result = await axios
      .delete(`http://localhost:5000/watchlist/deleteStock/${watch._id}`)
      .then((response) => {
        const newWatch = watchlist.filter((stock) => {
          // console.log(stock.name !== e.target.value);
          return stock.name !== e.target.value;
        });
        console.log(response);
        setmywatch(newWatch);
      });
    // console.log(result);
  };

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
        {update ? <></> : "Update"}
      </button>
    </div>
  );
}

function Update({ watch, setUpdate }) {
  const { watchlist, setmywatch } = useContext(PostContextHome);
  const [obj, setObj] = useState({
    name: watch.name,
    link: watch.link,
    id: watch._id,
  });

  const handleUpdate = async (e) => {
    console.log(obj);

    const result = await axios
      .put(`http://localhost:5000/watchlist/updateStock/${watch._id}`, obj)
      .then((response) => {
        const newlist = watchlist.map((watch) => {
          console.log(watch._id === obj.id, watch, obj);

          return watch._id === obj.id
            ? { ...watch, name: obj.name, link: obj.link }
            : watch;
        });
        console.log("loging", newlist);
        setmywatch(newlist);
        setUpdate((v) => !v);
      });
    console.log(result);
  };

  function handleChange(e) {
    // const { name, link } = e.target;
    // console.log(e.target.value, e.target.name);
    setObj((prevObj) => ({ ...prevObj, [e.target.name]: e.target.value }));
    // console.log(obj);
  }

  return (
    <div className="grow flex flex-col justify-start my-5">
      <input
        type="text"
        name="name"
        value={obj.name}
        onChange={handleChange}
        className="mx-5 grow font-normal"
      />
      <input
        type="text"
        name="link"
        value={obj.link}
        onChange={handleChange}
        className="mx-5 grow font-normal"
      />
      <div>
        <button onClick={handleUpdate} className="mx-5 hover:text-lg">
          done
        </button>
        <button
          className="mx-5 hover:text-lg"
          onClick={() => setUpdate((update) => !update)}
        >
          cancel
        </button>
      </div>
    </div>
  );
}

export default WatchList;
