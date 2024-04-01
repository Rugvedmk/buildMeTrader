import { useState } from "react";

function Update({ rule, setUpdate, ruleslist, setruleslis, updateIndex }) {
  const [obj, setObj] = useState({
    name: rule.name,
    description: rule.description,
  });

  function handleUpdate(e) {
    console.log(obj);

    const newlist = ruleslist.map((rule, index) => {
      console.log(rule.name, " === ", obj.name);

      return index === updateIndex
        ? { ["name"]: obj.name, ["description"]: obj.description }
        : rule;
    });
    setruleslis(newlist);
    setUpdate((v) => !v);
  }

  function handleChange(e) {
    setObj((prevObj) => ({ ...prevObj, ["description"]: e.target.value }));
  }

  return (
    <div className="grow flex flex-col justify-start my-5">
      <input
        className="mx-5 my-2 font-normal border-neutral-300"
        value={obj.name}
        onChange={(e) => {
          setObj((prevObj) => {
            return { ...prevObj, ["name"]: e.target.value };
          });
        }}
      />
      {/* <p className="mx-5">{obj.name}</p> */}
      <input
        type="text"
        name={obj.name}
        value={obj.description}
        onChange={handleChange}
        className="mx-5 my-2 grow font-normal border-neutral-300"
      />
      <div>
        <button
          onClick={handleUpdate}
          className="m-4 hover:text-lg hover:shadow-lg font-bold p-3 rounded-lg justify-start max-w-48"
        >
          Update
        </button>
        <button
          onClick={() => setUpdate((update) => !update)}
          className="m-4 hover:text-lg hover:shadow-lg font-bold p-3 rounded-lg justify-start max-w-48"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Update;
