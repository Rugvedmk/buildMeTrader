import { useEffect, useState } from "react";
import AddRule from "./components/addrule";
import Update from "./components/updaterule";

const ruleslisdefault = [
  { name: "Trade Limit", description: "Only have one trade per day" },
  { name: "When to trade", description: "Only trade the setup" },
];

function Rules() {
  const [rulesLoaded, setrulesLoaded] = useState(false);
  const [ruleslis, setruleslis] = useState(ruleslisdefault);
  const [Add, setAdd] = useState(false);

  function addNewRule(rule) {
    setruleslis((rules) => [...rules, rule]);

    setAdd(false);
  }

  function deleteRule(dltrule) {
    const newlis = ruleslis.filter((rule) => rule.name !== dltrule.name);

    setruleslis(newlis);
  }

  useEffect(() => {
    if (ruleslis) {
      setrulesLoaded(true);
    }
  }, [ruleslis]);

  return (
    <div>
      <div className="text-2xl m-7 font-bold">Rules</div>
      <div>
        {rulesLoaded ? (
          ruleslis.map((rule, index) => {
            return (
              <Rule
                name={rule.name}
                description={rule.description}
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
          rule={{ name: name, description: description }}
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
            onClick={() => deleteRule({ name: name, description: description })}
          >
            Delete Rule
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Rules;
