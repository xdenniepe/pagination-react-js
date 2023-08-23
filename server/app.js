const http = require("http");

const songs = require("./models/song");
const genres = require("./models/genre");

const DEFAULT_HEADER = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

/**
 *
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse<http.IncomingMessage> & {req: http.IncomingMessage}} res
 */
const handleGetRequest = async (req, res) => {
  const { pathname, searchParams } = new URL(
    req.url,
    `http://${req.headers.host}`
  );

  if (pathname === "/genres") {
    const result = await genres.findAll();
    res.writeHeader(200, DEFAULT_HEADER);
    res.write(JSON.stringify(result));
    return res.end();
  } else if (pathname === "/songs") {
    const q = searchParams.get("q");
    const field = searchParams.get("field");
    const page = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : undefined;
    const limit = searchParams.get("limit")
      ? Number(searchParams.get("limit"))
      : undefined;

    let result;
    switch (field?.toLowerCase()) {
      case "title":
        result = await songs.searchByTitle(q, page, limit);
        break;
      case "album":
        result = await songs.searchByAlbum(q, page, limit);
        break;
      case "artist":
        result = await songs.searchByArtist(q, page, limit);
        break;
      case "genre":
        result = await songs.searchByGenre(q, page, limit);
        break;
      case "year":
        result = await songs.searchByYear(q, page, limit);
        break;
      default:
        result = await songs.findAll(page, limit);
    }

    res.writeHeader(200, DEFAULT_HEADER);
    res.write(JSON.stringify(result));
    return res.end();
  }

  res.writeHeader(404, DEFAULT_HEADER);
  res.write("Not found");
};

const server = http.createServer((req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      return handleGetRequest(req, res);
    default:
      throw new Error(`Unsupported request method: ${method}`);
  }
});

server.listen(3000, () => {
  const { port } = server.address();
  console.log(`Server is listening on: http://localhost:${port}`);
});
