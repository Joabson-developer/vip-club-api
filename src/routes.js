const express = require("express");
const router = express.Router();

const {
  getClients,
  searchClient,
  createClient,
  getClient,
} = require("./controllers/ClientsController");

router.get("/clients", getClients);
router.get("/client/:client_id", getClient);
router.get("/search-client", searchClient); //query params
router.post("/client", createClient);

module.exports = router;
