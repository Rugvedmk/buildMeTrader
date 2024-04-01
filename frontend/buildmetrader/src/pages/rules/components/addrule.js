import { useState } from "react";

function AddRule({ addNewRule }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !description) {
      alert("fill all the details");
      return;
    }

    const newRule = {
      name,
      description,
    };

    addNewRule(newRule);
  }
  return (
    <div>
      <form className="flex flex-col my-5 mx-3 px-2 font-medium shadow-lg">
        <label>Name</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          className="border-2 font-normal"
        />

        <label>Description</label>
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
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

export default AddRule;
