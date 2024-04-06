import { useEffect, useState } from "react";
import AddRule from "./components/addrule";
import Update from "./components/updaterule";
import axios from "axios";

// const ruleslisdefault = [
//   { name: "Trade Limit", description: "Only have one trade per day" },
//   { name: "When to trade", description: "Only trade the setup" },
// ];

function Rules() {
  // const [rulesLoaded, setrulesLoaded] = useState(false);
  const [ruleslis, setruleslis] = useState([]);
  const [Add, setAdd] = useState(false);

  const addNewRule = async (rule) => {
    const result = await axios
      .post("http://localhost:5000/rules/addRule", rule)
      .then((response) => {
        setruleslis((rules) => [...rules, rule]);
        console.log(response);
      });
    setAdd(false);
    // console.log(result);
  };

  const deleteRule = async (dltrule) => {
    try {
      // console.log(dltrule);
      const result = await axios.delete(
        `http://localhost:5000/rules/deleteRule/${dltrule.id}`
      );
      // console.log(result);
      const newlis = ruleslis.filter((rule) => rule._id !== dltrule.id);
      setruleslis(newlis);
    } catch (err) {
      alert("delete was unseccessful");
    }
  };

  useEffect(() => {
    const userID = localStorage.getItem("user");
    const loadRules = async () => {
      const result = await axios
        .get(`http://localhost:5000/rules/${userID}`)
        .then((response) => {
          console.log(response);
          setruleslis(response.data);
          // if (ruleslis) {
          //   setrulesLoaded(true);
          // }
        });
    };
    loadRules();
  }, []);

  return (
    <div>
      <div className="text-2xl m-7 font-bold">Rules</div>
      <div>
        {ruleslis ? (
          ruleslis.map((rule, index) => {
            return (
              <Rule
                name={rule.name}
                description={rule.description}
                id={rule._id}
                rulenum={index + 1}
                rulelist={ruleslis}
                setruleslis={setruleslis}
                deleteRule={deleteRule}
              />
            );
          })
        ) : (
          <div>Loading...</div>
        )}

        {Add ? <AddRule addNewRule={addNewRule} /> : null}

        <button
          className="m-4 hover:text-lg hover:shadow-lg font-bold p-3 rounded-lg"
          onClick={() => setAdd(!Add)}
        >
          {Add ? <>Cancel</> : <>Add Rule</>}
        </button>
      </div>
    </div>
  );
}

function Rule({
  name,
  description,
  id,
  rulenum,
  rulelist,
  setruleslis,
  deleteRule,
}) {
  const [update, setUpdate] = useState(true);

  return (
    <div className="grow flex flex-col hover:shadow-lg rounded-lg mx-5 my-2">
      {update ? (
        <>
          <div className="text-xl font-bold m-5">
            {rulenum}. {name}
          </div>
          <div className="mx-5 font-semibold">{description}</div>
        </>
      ) : (
        <Update
          rule={{ name: name, description: description, id: id }}
          setUpdate={setUpdate}
          ruleslist={rulelist}
          setruleslis={setruleslis}
          updateIndex={rulenum - 1}
        />
      )}
      {update ? (
        <div>
          <button
            className="m-4 hover:text-lg hover:shadow-lg font-bold p-3 rounded-lg justify-start max-w-48"
            onClick={() => setUpdate(!update)}
          >
            Update
          </button>
          <button
            className="m-4 hover:text-lg hover:shadow-lg font-bold p-3 rounded-lg justify-start max-w-48"
            onClick={() =>
              deleteRule({ name: name, description: description, id: id })
            }
          >
            Delete Rule
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Rules;
