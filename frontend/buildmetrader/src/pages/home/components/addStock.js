import { useContext, useState } from "react";
import { PostContextHome } from "../home";
import axios from "axios";

function AddStock() {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const { addNewWatch, userID } = useContext(PostContextHome);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userID);

    if (!name || !link) {
      alert("fill all the details");
      return;
    }

    const newStock = {
      name,
      link,
      userID,
    };

    addNewWatch(newStock);

    let result = await axios.post(
      "http://localhost:5000/watchlist/addstock",
      newStock
    );
    console.log(result);
  };
  return (
    <div>
      <form className="flex flex-col my-5 mx-3 px-2 font-medium shadow-lg">
        <label>Name</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          className="border-2 font-normal"
        />

        <label>Link</label>
        <input
          type="text"
          onChange={(e) => setLink(e.target.value)}
          className="border-2 font-normal"
        />
        <div className="flex justify-end mx-10 my-5">
          <button onClick={handleSubmit} className="mx-5 hover:text-lg">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddStock;
