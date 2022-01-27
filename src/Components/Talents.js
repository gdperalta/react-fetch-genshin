import { useEffect, useRef, useState } from "react";
import { genshindb } from "../App";
import arrowDown from "../images/arrow-down.png";

const Talents = ({ hero, heroName }) => {
  const [talents, setTalents] = useState(null);
  const [desc, setDesc] = useState({
    name: "",
    desc: "",
  });
  const [talentImg, setTalentImg] = useState({});
  const buttonRefs = useRef([]);
  const arrowRefs = useRef([]);

  useEffect(() => {
    handleTalents(hero);
  }, [hero]);

  useEffect(() => {
    if (talents) {
      changeTalent(0);
      buttonRefs.current = buttonRefs.current.slice(0, talents.length);
      arrowRefs.current = arrowRefs.current.slice(0, talents.length);
    }
  }, [talents]);

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

  const handleTalents = (data) => {
    const newArray = [data.skillTalents, data.passiveTalents];
    setTalents(newArray);
    setTalentImg(genshindb.talents(data.name).images);
  };

  const changeTalent = (i) => {
    setDesc({
      name: talents.flat()[i].name,
      desc: talents.flat()[i].description,
    });

    handleActiveTalent(i);
  };

  return (
    <div>
      {talents ? (
        <div className="talents-wrapper">
          <div className="btn-container">
            {talents.flat().map((item, i) => {
              return (
                <button
                  data-testid={`${heroName}-talent-${i}`}
                  className="talentBtn"
                  id={`talent-${i}`}
                  ref={(el) => (buttonRefs.current[i] = el)}
                  onClick={() => changeTalent(i)}
                  key={`talent${i}`}
                >
                  <img
                    src={`https://res.cloudinary.com/genshin/image/upload/sprites/${
                      Object.values(talentImg)[i]
                    }.png`}
                  />
                  <img
                    className="hide-arrow"
                    src={arrowDown}
                    ref={(el) => (arrowRefs.current[i] = el)}
                  />
                </button>
              );
            })}
          </div>
          <div className="talent-desc-ctr">
            <h3 data-testid="talent-name">{desc.name}</h3>
            <p>{desc.desc}</p>
          </div>
        </div>
      ) : (
        <div>...loading</div>
      )}
    </div>
  );
};

export default Talents;
