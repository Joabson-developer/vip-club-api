require("dotenv").config({ path: ".env" });

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const routes = require("./routes");

const server = express();

server.use(cors());
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use("/api", routes);

const PORT = process.env.PORT || 3300;
server.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}`);
});
