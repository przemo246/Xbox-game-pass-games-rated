import Head from "next/head";
import { useState, useEffect } from "react";
import { GameItem } from "./components/GameItem";
import Loader from "react-loader-spinner";

export default function Home() {
  const [gameIDs, setGameIds] = useState("");
  const [gamesDetails, setGamesDetails] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [search, setSearch] = useState("");
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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <header className="header">
          <div className="logo">Xbox Game Pass games rated</div>
          <div>
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
        </header>
        <div className="games">
          <ul className="games__list">
            {suggestions.length > 0 ? (
              suggestions.map((el) => (
                <GameItem key={el.ProductId} details={el} />
              ))
            ) : (
              <div className="loader-wrapper">
                <Loader type="Circles" color="#00BFFF" height={80} width={80} />
              </div>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
}
