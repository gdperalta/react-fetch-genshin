import NavButtons from "./NavButtons";
import { useState, useEffect } from "react";
import { fetchAllHeroes } from "../Utils/api";
import navLeft from "../images/navLeft.png";
import navRight from "../images/navRight.png";

const NavBar = ({ onclick }) => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllHeroes();

      data.forEach((item, i) => {
        const splitWords = item.split("-");
        if (splitWords[0] === "traveler") {
          data.splice([i], 3);
        }
      });
      setCharacters(data);
    };

    fetchData().catch(console.error);
  }, []);

  const scroll = (coordinates, element) => {
    const item = document.getElementById(element);
    item.scrollBy(coordinates, 0);
  };

  return (
    <div className="navBar" id="nav-bar">
      <button id="navLeft" onClick={() => scroll(-250, "nav-bar")}>
        <img src={navLeft}></img>
      </button>
      {characters.map((item, i) => {
        return (
          <NavButtons key={item + i} name={item} id={i} onclick={onclick} />
        );
      })}
      <button id="navRight" onClick={() => scroll(250, "nav-bar")}>
        <img src={navRight}></img>
      </button>
    </div>
  );
};

export default NavBar;
