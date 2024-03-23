import { useContext } from "react";
import { PostContextHome } from "../home";
import axios from "axios";

function Profile() {
  const { profileimg } = useContext(PostContextHome);

  const getNews = () => {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?q=crypto&labguage=en&apiKey=d9d725eaf5154249b28cd86fa699ec66"
      )
      .then((response) => {
        console.log(response);
      });

    // axios
    //   .get(
    //     "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=d9d725eaf5154249b28cd86fa699ec66"
    //   )
    //   .then((response) => {
    //     console.log(response);
    //   });
  };

  return (
    <div className="col-span-9 flex flex-col p-4">
      <div className="grid grid-rows-auto justify-items-center mb-4">
        <img src={profileimg} alt="image not found" />
        <div className="justify-center">Name</div>
      </div>
      <div>Email:asdnkj@sd.com</div>
      <div>Phone no.:1234567890</div>
      <button onClick={getNews}>fetch</button>
    </div>
  );
}

export default Profile;
