import { useState, useEffect, useRef } from "react";
import { genshindb } from "../App";
import arrowDown from "../images/arrow-down.png";

const Constellations = ({ hero, heroName }) => {
  const [constellations, setConstellations] = useState(null);
  const [desc, setDesc] = useState({
    name: "",
    desc: "",
    level: "",
  });
  const [consteImages, setConsteImages] = useState({});
  const buttonRefs = useRef([]);
  const arrowRefs = useRef([]);

  useEffect(() => {
    handleConstellations();
  }, [hero]);

  useEffect(() => {
    if (constellations) {
      changeConste(0);
      buttonRefs.current = buttonRefs.current.slice(0, constellations.length);
      arrowRefs.current = arrowRefs.current.slice(0, constellations.length);
    }
  }, [constellations]);

  const handleActiveTalent = (index) => {
    for (const button of buttonRefs.current) {
      button.classList.remove("active-button");
    }
    buttonRefs.current[index].classList.add("active-button");

    for (const item of arrowRefs.current) {
      item.className = "hide-arrow";
    }
    arrowRefs.current[index].className = "show-arrow";
  };

  const handleConstellations = () => {
    setConstellations(hero.constellations);
    setConsteImages(genshindb.constellations(hero.name).images);
  };

  const changeConste = (i) => {
    setDesc({
      name: constellations[i].name,
      desc: constellations[i].description,
      level: constellations[i].unlock,
    });

    handleActiveTalent(i);
  };

  return (
    <div className="const-ctr">
      {constellations ? (
        <div>
          <div className="btn-container">
            {constellations.map((conste, i) => {
              return (
                <button
                  data-testid={`${heroName}-const-${i}`}
                  className="consBtn"
                  id={`cons-${i}`}
                  ref={(el) => (buttonRefs.current[i] = el)}
                  onClick={() => changeConste(i)}
                  key={i}
                >
                  <img src={Object.values(consteImages)[i]} />
                  <img
                    className="hide-arrow"
                    src={arrowDown}
                    ref={(el) => (arrowRefs.current[i] = el)}
                  />
                </button>
              );
            })}
          </div>
          <div className="const-details">
            <img
              className="constellation"
              src={`https://res.cloudinary.com/genshin/image/upload/sprites/${
                Object.values(consteImages)[6]
              }.png`}
            />
            <h2>{desc.level}</h2>
            <h3 data-testid={`cons-${heroName}-title`}>{desc.name}</h3>
            <p>{desc.desc}</p>
          </div>
        </div>
      ) : (
        <div>...loading</div>
      )}
    </div>
  );
};

export default Constellations;
