function Mybutton({ children, myfunction }) {
  return (
    <div className="grow flex justify-between">
      <button onClick={myfunction} className="m-4 hover:text-lg">
        {children}
      </button>
    </div>
  );
}

export default Mybutton;
