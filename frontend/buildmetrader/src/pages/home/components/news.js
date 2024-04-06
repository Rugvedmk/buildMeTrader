import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function News() {
  const [newsList, setNewsList] = useState([]);
  const [gotNews, setGotNews] = useState(false);

  useEffect(() => {
    getNews();
  }, []);

  const getNews = async () => {
    await axios
      .get(
        "https://newsapi.org/v2/top-headlines?q=crypto&language=en&apiKey=d9d725eaf5154249b28cd86fa699ec66"
      )
      .then((response) => {
        setNewsList(response.data.articles);
        // console.log(response);
      });

    await axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=d9d725eaf5154249b28cd86fa699ec66"
      )
      .then((response) => {
        response.data.articles.map((article) => {
          setNewsList((prev) => [...prev, article]);
        });

        // console.log(response);
      });

    setGotNews(true);
  };

  function getnewsarray() {
    // console.log(newsList);
  }

  return (
    <div className="col-span-9 flex flex-col p-4 max-h-screen overflow-auto">
      <div className="text-2xl m-7 font-bold">NEWS</div>
      <div className="flex flex-wrap ">
        {gotNews ? (
          newsList.map((article) => <SingleArticle article={article} />)
        ) : (
          <div>Please Wait or relode after some time </div>
        )}
      </div>
      {/* <button onClick={getNews}>fetch</button>
      <button onClick={getnewsarray}>getnews</button> */}
    </div>
  );
}

function SingleArticle({ article }) {
  return (
    <Link
      className="grow flex flex-col hover:shadow-lg rounded-lg"
      to={article.url}
    >
      <div className="text-lg font-medium m-2">{article.title}</div>
      <img
        src={article.urlToImage}
        alt={"Unable to Load the image"}
        className="object-fill h-48 w-96"
      />
      <div className="font-light m-2">{article.content}</div>
      <div className="flex justify-between font-light">
        <div className="m-3">{article.publishedAt}</div>
        <div className="m-3">{article.source.name}</div>
      </div>
    </Link>
  );
}

export default News;
