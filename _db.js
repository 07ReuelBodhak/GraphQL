let authors = [
  { id: "1", name: "icey", verified: true },
  { id: "2", name: "reuel", verified: false },
  { id: "3", name: "roy", verified: false },
  { id: "4", name: "alex", verified: true },
  { id: "5", name: "morgan", verified: false },
  { id: "6", name: "jordan", verified: true },
  { id: "7", name: "casey", verified: false },
];

let games = [
  { id: "1", title: "Zelda: Tears of the Kingdom", platform: ["switch"] },
  { id: "2", title: "Elden Ring", platform: ["ps5", "xbox", "pc"] },
  { id: "3", title: "God of War: Ragnarok", platform: ["ps5"] },
  { id: "4", title: "Cyberpunk 2077", platform: ["ps5", "xbox", "pc"] },
  { id: "5", title: "Hades", platform: ["switch", "pc"] },
  {
    id: "6",
    title: "The Witcher 3: Wild Hunt",
    platform: ["ps5", "xbox", "switch", "pc"],
  },
  { id: "7", title: "Super Mario Odyssey", platform: ["switch"] },
  { id: "8", title: "Halo Infinite", platform: ["xbox", "pc"] },
];

let reviews = [
  {
    id: "1",
    rating: 9,
    content: "nice game so far",
    author_id: "3",
    game_id: "1",
  },
  {
    id: "2",
    rating: 10,
    content: "An absolute masterpiece!",
    author_id: "1",
    game_id: "2",
  },
  {
    id: "3",
    rating: 7,
    content: "Good, but could be better.",
    author_id: "2",
    game_id: "3",
  },
  {
    id: "4",
    rating: 8,
    content: "Immersive world and story.",
    author_id: "4",
    game_id: "4",
  },
  {
    id: "5",
    rating: 6,
    content: "Fun but repetitive.",
    author_id: "5",
    game_id: "5",
  },
  {
    id: "6",
    rating: 9,
    content: "A true classic.",
    author_id: "6",
    game_id: "6",
  },
  {
    id: "7",
    rating: 8,
    content: "Great for fans of the series.",
    author_id: "7",
    game_id: "7",
  },
  {
    id: "8",
    rating: 7,
    content: "Solid gameplay, but some bugs.",
    author_id: "3",
    game_id: "8",
  },
  {
    id: "9",
    rating: 10,
    content: "Best game I have ever played!",
    author_id: "1",
    game_id: "1",
  },
  {
    id: "10",
    rating: 5,
    content: "Not my cup of tea.",
    author_id: "2",
    game_id: "2",
  },
  {
    id: "11",
    rating: 9,
    content: "Fantastic graphics and story.",
    author_id: "4",
    game_id: "3",
  },
  {
    id: "12",
    rating: 6,
    content: "Overhyped.",
    author_id: "5",
    game_id: "4",
  },
];

export default { games, authors, reviews };
