import errorCard from "../images/errorCard.png";

const NavButtons = ({ name, id, onclick }) => {
  return (
    <div data-testid={`${name}-card`} className="button-ctr" id={`${name}-btn`}>
      <button data-testid={`select-${name}`} onClick={() => onclick(name)}>
        <img
          src={`https://api.genshin.dev/characters/${name}/gacha-card`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = errorCard;
          }}
        />
      </button>
    </div>
  );
};

export default NavButtons;
