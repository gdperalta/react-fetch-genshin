const Description = ({ hero }) => {
  return (
    <div className="desc-ctr">
      <p>{hero.nation}</p>
      <h1 title={`name-${hero.name}`} role="test">
        {hero.name}
        <img
          width={"25px"}
          src={`https://api.genshin.dev/elements/${hero.vision.toLowerCase()}/icon`}
        />
      </h1>
      <p>Affiliation: {hero.affiliation}</p>
      <p>Constellation: {hero.constellation}</p>
      <p>Weapon: {hero.weapon}</p>
      <p>{hero.description}</p>
    </div>
  );
};

export default Description;
