const { faker } = require("@faker-js/faker");

const { toTitlecase } = require("./strings");

faker.seed(2691);

function generateArtistName() {
  const generators = [
    faker.person.fullName,
    () =>
      toTitlecase(
        `${faker.word.adjective()} ${faker.word.adjective()} ${faker.word.noun()}`
      ),
    () => toTitlecase(`${faker.word.adjective()} ${faker.word.noun()}`),
    () =>
      `${faker.person.firstName()} ${faker.string.alpha({
        length: 1,
        casing: "upper",
      })}.`,
    () => faker.string.alpha({ length: { min: 3, max: 4 }, casing: "upper" }),
    () =>
      `${faker.string
        .alpha({ length: { min: 3, max: 4 }, casing: "upper" })
        .split("")
        .join(".")}.`,
  ];

  return faker.helpers.arrayElement(generators)();
}

const songNamesStore = [];

function generateUniqueSongName() {
  const songName = faker.music.songName();

  if (songNamesStore.includes(songName)) {
    return generateUniqueSongName();
  }

  songNamesStore.push(songName);
  return songName;
}

function generateDataSet() {
  const artists = Array.from({ length: 50 }, generateArtistName);
  const genres = Array.from(
    new Set(Array.from({ length: 50 }, faker.music.genre))
  );
  const albums = Array.from({ length: 80 }, () => {
    return {
      id: faker.string.nanoid(),
      name: generateUniqueSongName(),
      artist: faker.helpers.arrayElement(artists),
      year: faker.date.past({ years: 60 }).getFullYear(),
      genre: faker.helpers.arrayElements(genres, {
        min: 1,
        max: 3,
      }),
      coverImage: faker.image.urlLoremFlickr({
        width: 160,
        height: 160,
        category: ["album", "music"].join(","),
      }),
    };
  });

  const songs = Array.from({ length: 500 }, () => {
    const album = faker.helpers.arrayElement(albums);
    return {
      title: generateUniqueSongName(),
      album: album.name,
      artist: album.artist,
      year: album.year,
      genre: faker.helpers.arrayElements(album.genre),
      coverImage: album.coverImage,
      duration: `${faker.number.int({ min: 3, max: 8 })}:${faker.number
        .int(59)
        .toString()
        .padStart(2, "0")}`,
    };
  });

  return {
    genres,
    artists,
    albums,
    songs,
  };
}

module.exports = { data: generateDataSet() };
