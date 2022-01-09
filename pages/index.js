import Head from "next/head";
import { useState, useEffect } from "react";
import GameItem from "../components/GameItem";
import Loader from "react-loader-spinner";
import { BsArrowUpShort } from "react-icons/bs";

export default function Home() {
  const [gameIDs, setGameIds] = useState("");
  const [gamesDetails, setGamesDetails] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [search, setSearch] = useState("");
  const [isGoToTopButtonVisible, setIsGoToTopButtonVisible] = useState(false);
  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    const matches = gamesDetails.filter((el) => {
      const regex = new RegExp(`^${value}`, "gi");
      return el.LocalizedProperties[0].ProductTitle.match(regex);
    });
    setSuggestions(matches);
    if (value.length === 0) {
      setSuggestions(gamesDetails);
    }
  };
  const sortFromWorstToBest = () => {
    const sortedArr = [...suggestions];
    sortedArr.sort(
      (a, b) =>
        a.MarketProperties[0].UsageData[2].AverageRating -
        b.MarketProperties[0].UsageData[2].AverageRating
    );
    setSuggestions(sortedArr);
  };

  const scrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const sortFromBestToWorst = () => {
    const sortedArr = [...suggestions];
    sortedArr.sort(
      (a, b) =>
        b.MarketProperties[0].UsageData[2].AverageRating -
        a.MarketProperties[0].UsageData[2].AverageRating
    );
    setSuggestions(sortedArr);
  };
  useEffect(() => {
    if (gameIDs.length < 1) {
      return;
    }
    async function getGamesDetails() {
      try {
        const response = await fetch(`/api/games-details?ids=${gameIDs}`);
        const data = await response.json();
        const { Products } = data;
        setGamesDetails(Products);
        setSuggestions(Products);
      } catch (err) {
        console.log(err);
      }
    }
    getGamesDetails();
  }, [gameIDs]);

  useEffect(() => {
    window.onscroll = () => {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        setIsGoToTopButtonVisible(true);
      } else {
        setIsGoToTopButtonVisible(false);
      }
    };
  }, []);

  useEffect(() => {
    async function getGameIDs() {
      try {
        const response = await fetch("/api/games-ids");
        const data = await response.json();
        const removeFirstElement = data.slice(1);
        const ids = removeFirstElement.map((el) => el.id).join(",");
        setGameIds(ids);
      } catch (err) {
        console.log(err);
      }
    }
    getGameIDs();
  }, []);

  return (
    <div className="app-wrapper">
      <Head>
        <title>XGPG Rated</title>
        <meta name="description" content="Xbox Game Pass games rated" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <main className="main">
        <header className="header">
          <div className="logo">Xbox Game Pass games rated</div>
          <div>
            <div className="controls">
              <div className="buttons">
                <a className="link" onClick={sortFromBestToWorst}>
                  Top rated
                </a>
                <a className="link" onClick={sortFromWorstToBest}>
                  Worst rated
                </a>
              </div>
              <input
                type="search"
                name="search"
                id="search"
                className="search-input"
                value={search}
                onChange={handleSearch}
                placeholder="Type name of the game"
              />
            </div>
          </div>
        </header>
        <div className="games">
          <ul className="games__list">
            {suggestions.length < 1 && search.length < 1 ? (
              <div className="center-wrapper">
                <Loader type="Circles" color="#00BFFF" height={80} width={80} />
              </div>
            ) : (
              suggestions.map((el) => (
                <GameItem key={el.ProductId} details={el} />
              ))
            )}
            {suggestions.length < 1 && search.length > 0 ? (
              <div className="center-wrapper">No results found</div>
            ) : null}
          </ul>
        </div>
      </main>
      <a
        onClick={scrollToTop}
        className="go-up"
        style={{ display: isGoToTopButtonVisible ? "flex" : "none" }}
      >
        <BsArrowUpShort size="2.5em" />
      </a>
    </div>
  );
}
