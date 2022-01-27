import "./scss/css/App.css";
import React, { useEffect, useState } from "react";
import NavBar from "./Components/NavBar";
import Constellations from "./Components/Constellations";
import Description from "./Components/Description";
import Talents from "./Components/Talents";
import HeroImage from "./Components/HeroImage";
import { fetchHero, fetchAllHeroes } from "./Utils/api";
import loadingScreen from "./images/loadingScreen.gif";

export const genshindb = require("genshin-db");

function App() {
  const [character, setCharacter] = useState("albedo");
  const [heroDetail, setheroDetail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //Prevents using the old value when useEffect is called twice on simultaneous and the first call is resolved after the second call
    //Used when useEffect depends on a parameter
    let unloaded = true;
    setIsLoading(true);

    const fetchData = async () => {
      const activeHero = await fetchHero(character);

      if (unloaded) {
        setheroDetail(activeHero);
        setIsLoading(false);
      }
    };

    fetchData()
      .then(() => {
        handleActiveChara(character);
      })
      .catch(console.error);

    return () => (unloaded = false);
  }, [character]);

  const changeChara = (name) => {
    setCharacter(name);
  };

  const handleActiveChara = (name) => {
    const navBtns = document.getElementsByClassName("button-ctr"),
      activeBtn = document.getElementById(`${name}-btn`);

    for (const button of navBtns) {
      button.style.filter = "grayscale(100%)";
    }

    activeBtn.style.filter = "";
  };

  return (
    <div className="wrapper">
      {!isLoading ? (
        <div className="hero-page">
          <HeroImage hero={heroDetail} heroName={character} />
          <div className="chara-ctr">
            <div className="charaDetails">
              <Constellations hero={heroDetail} heroName={character} />
            </div>
            <div className="charaDetails">
              <Description hero={heroDetail} />
              <Talents hero={heroDetail} heroName={character} />
            </div>
          </div>
        </div>
      ) : (
        <div className="loading-screen">
          <img src={loadingScreen} />
        </div>
      )}

      <NavBar onclick={changeChara} />
    </div>
  );
}

export default App;
