import "whatwg-fetch";
import { rest } from "msw";

const handlers = [
  rest.get("https://api.genshin.dev/characters/albedo", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        name: "Albedo",
        vision: "Pyro",
        nation: "Philippines",
        skillTalents: [
          {
            name: "Kame hame ha",
            description: "Wave",
          },
        ],
        passiveTalents: [
          {
            name: "Spider Senses",
            description: "Sense Danger",
          },
        ],
        constellations: [
          {
            name: "cons1 albedo",
            unlock: "c1",
            description: "cons c1 of albedo",
          },
          {
            name: "cons2 albedo",
            unlock: "c2",
            description: "cons c2 of albedo",
          },
        ],
      })
    );
  }),
  rest.get("https://api.genshin.dev/characters/ayaka", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        name: "Ayaka",
        vision: "Ice",
        nation: "Paro paro G",
        skillTalents: [
          {
            name: "Haduken",
            description: "Small wave",
          },
        ],
        passiveTalents: [
          {
            name: "Haki",
            description: "Sense everything",
          },
        ],
        constellations: [
          {
            name: "cons1 ayaka",
            unlock: "c1",
            description: "cons c2 of ayaka",
          },
          {
            name: "cons2 ayaka",
            unlock: "c2",
            description: "cons c2 of ayaka",
          },
        ],
      })
    );
  }),
  rest.get("https://api.genshin.dev/characters", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(["albedo", "ayaka", "ganyu", "hu-tao"])
    );
  }),
  //prevents actual request from going out to the internet when you forget to add the
  //proper request handler
  //ex. wrong spelling of URL
  rest.get("*", (req, res, ctx) => {
    console.error(`Please add request handler for ${req.url.toString()}`);
    return res(
      ctx.status(500),
      ctx.json({ error: "Please add request handler" })
    );
  }),
];

export { handlers };
