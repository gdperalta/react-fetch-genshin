import React from "react";
import {
  findByTestId,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import App from "./App";
import { fetchHero, fetchAllHeroes } from "./Utils/api";
import { handlers } from "./testServer";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { act } from "react-dom/test-utils";

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

test("fetches hero details", async () => {
  const hero = await fetchHero("albedo");
  expect(hero.name).toEqual("Albedo");
});

test("fetches all heroes", async () => {
  const heroes = await fetchAllHeroes();

  expect(heroes).toEqual(["albedo", "ayaka", "ganyu", "hu-tao"]);
});

test("handles failure", async () => {
  server.use(
    rest.get("https://api.genshin.dev/characters/adobo", (req, res, ctx) => {
      return res(ctx.status(404));
    })
  );

  await expect(fetchHero("adobo")).rejects.toThrow(
    "Request failed with status code 404"
  );
});

test("displays name", async () => {
  const { findByText } = render(<App />);
  const heroName = await findByText("Albedo");
  expect(heroName).toBeInTheDocument();
});

test("displays nation", async () => {
  const { findByText } = render(<App />);
  const heroNation = await findByText("Philippines");
  expect(heroNation).toBeInTheDocument();
});

test("displays talent", async () => {
  const { findByText } = render(<App />);
  const heroTalent = await findByText("Kame hame ha");
  expect(heroTalent).toBeInTheDocument();
});

test("changes talent display", async () => {
  const { findByTestId } = render(<App />);
  const secondTalentBtn = await findByTestId("albedo-talent-1");
  fireEvent.click(secondTalentBtn);
  const secondTalent = await findByTestId("talent-name");
  expect(secondTalent.textContent).toBe("Spider Senses");
});

test("changes active hero", async () => {
  const { findByTestId, findByText } = render(<App />);
  const selectAyakaBtn = await findByTestId("select-ayaka");
  fireEvent.click(selectAyakaBtn);
  const ayakaNameDisplay = await findByText("Ayaka");
  expect(ayakaNameDisplay).toBeInTheDocument();
});

test("changes talent display after changing hero", async () => {
  const { findByText, findByTestId } = render(<App />);
  const selectAyakaBtn = await findByTestId("select-ayaka");
  fireEvent.click(selectAyakaBtn);
  const secondTalentBtn = await findByTestId(`ayaka-talent-1`);
  fireEvent.click(secondTalentBtn);
  const secondTalent = await findByText("Haki");
  expect(secondTalent).toBeInTheDocument();
});

test("displays constellation", async () => {
  const { findByText } = render(<App />);
  const heroCons = await findByText("cons1 albedo");
  expect(heroCons).toBeInTheDocument();
});

test("changes constellation display", async () => {
  const { findByTestId } = render(<App />);
  const secondConsBtn = await findByTestId("albedo-const-1");
  fireEvent.click(secondConsBtn);
  const secondCons = await findByTestId("cons-albedo-title");
  expect(secondCons.textContent).toBe("cons2 albedo");
});

test("changes constellation display after changing hero", async () => {
  const { findByText, findByTestId } = render(<App />);
  const selectAyakaBtn = await findByTestId("select-ayaka");
  fireEvent.click(selectAyakaBtn);

  //Used to assert on the output after state change
  //For further studying
  await findByText("Ayaka");

  const secondConsBtn = await findByTestId("ayaka-const-1");
  fireEvent.click(secondConsBtn);
  const secondCons = await findByTestId("cons-ayaka-title");
  expect(secondCons.textContent).toBe("cons2 ayaka");
});
