import assert from "assert";

type Movie = {
  title: string;
  year: number;
  cast: string[];
  genres: string[];
};

/**
 * Movies dataset
 */
const movies: Movie[] = [
  {
    title: "The Book of Love",
    year: 2017,
    cast: [
      "Jason Sudeikis",
      "Jessica Biel",
      "Maisie Williams",
      "Mary Steenburgen",
      "Orlando Jones",
      "Paul Reiser",
    ],
    genres: ["Drama", "Comedy"],
  },
  {
    title: "Split",
    year: 2017,
    cast: ["James McAvoy", "Anya Taylor-Joy", "Betty Buckley", "Jessica Sula"],
    genres: ["Horror", "Thriller", "Drama"],
  },
  {
    title: "xXx: Return of Xander Cage",
    year: 2017,
    cast: ["Vin Diesel", "Samuel L. Jackson", "Donnie Yen", "Deepika Padukone"],
    genres: ["Action", "Adventure"],
  },
  {
    title: "Resident Evil: The Final Chapter",
    year: 2017,
    cast: ["Milla Jovovich", "Ruby Rose", "Ali Larter"],
    genres: ["Action", "Adventure", "Horror", "Science Fiction"],
  },
  {
    title: "A Dog's Purpose",
    year: 2017,
    cast: ["Britt Robertson", "Dennis Quaid", "Josh Gad"],
    genres: ["Family"],
  },
];

/**
 * Returns array of all actor names.
 * @param movies array of movie objects
 * @returns array of actor names
 */
const getAllActors = (movies: Movie[]): string[] =>
  movies.reduce((actors: string[], movie) => {
    actors.push(...movie.cast);
    return actors;
  }, []);

/**
 * Groups movies by year (max 3 per year).
 * @param movies array of movie objects
 * @returns object with year as key and movie titles
 */
const getMoviesByYear = (movies: Movie[]): Record<string, string[]> =>
  movies.reduce((acc: Record<string, string[]>, movie) => {
    if (!acc[movie.year]) {
      acc[movie.year] = [];
    }

    if (acc[movie.year].length < 3) {
      acc[movie.year].push(movie.title);
    }

    return acc;
  }, {});

const actors = getAllActors(movies);

assert(actors.includes("Vin Diesel"));
assert(actors.includes("Deepika Padukone"));

const moviesByYear = getMoviesByYear(movies);

assert.deepStrictEqual(moviesByYear["2017"], [
  "The Book of Love",
  "Split",
  "xXx: Return of Xander Cage",
]);
