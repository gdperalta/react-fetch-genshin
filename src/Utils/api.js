export const fetchHero = async (name) => {
  const response = await fetch(`https://api.genshin.dev/characters/${name}`);

  if (!response.ok) {
    throw new Error(`Request failed with status code ${response.status}`);
  }

  return await response.json();
};

export const fetchAllHeroes = async () => {
  const response = await fetch(`https://api.genshin.dev/characters`);

  if (!response.ok) {
    throw new Error(`Request failed with status code ${response.status}`);
  }

  return await response.json();
};
